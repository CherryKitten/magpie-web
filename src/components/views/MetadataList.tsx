import {useContext, useEffect, useState} from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import {MagpieContext, Metadata} from "../../interfaces";

interface MetadataListProps {
    type: "albums" | "artists" | "tracks";
    className: string;
}

const AlbumList = (props: { album: Metadata }) => {
    const {controls} = useContext(MagpieContext);
    const album = props.album;

    const handleClick = () => {
        fetch(`http://localhost:8080/api/albums/${album.id}`).then((result) =>
            result.json().then((data) => controls?.add_to_queue(data.children))
        );
    };

    return (
        <li>
            <img
                src={album.art}
                alt={`Cover for ${album.title}`}
                className={"AlbumArt"}
                loading={"lazy"}
                onClick={handleClick}
            />
            <p>{album.artist}</p>
            <br/>
            <p>{album.title}</p>
        </li>
    );
};

const ArtistList = (props: { artist: Metadata }) => {
    const artist = props.artist;
    return (
        <li>
            <img src="placeholder.png" className={"ArtistArt"} alt={artist.name}/>
            <p>{artist.name}</p>
        </li>
    );
};

function pretty_time(s: number | undefined) {
    if (s === undefined) return ""
    let minutes = Math.floor(s / 60);
    let seconds = s % 60;

    let min_str = minutes.toString();
    let sec_str = seconds.toString();
    if (minutes < 10) min_str = "0" + min_str;
    if (seconds < 10) sec_str = "0" + sec_str;
    return `${min_str}:${sec_str}`;
}

const TrackList = (props: { track: Metadata }) => {
    const {controls} = useContext(MagpieContext);
    const track = props.track;

    const handleClick = () => {
        controls?.add_to_queue(track);
    };

    return (
        <tr onClick={handleClick}>
            <td>{track.title}</td>
            <td>{track.artist}</td>
            <td>{track.album}</td>
            <td>{pretty_time(track.duration)}</td>
        </tr>
    );
};
const MetadataList = (props: MetadataListProps) => {
    const [hasMore, setHasMore] = useState(true);
    const [pagination, setPagination] = useState({count: 100, offset: 0});

    const [items, setItems] = useState([] as Metadata[]);

    useEffect(() => {
        fetch(
            `http://localhost:8080/api/${props.type}?limit=${pagination.count}&offset=${pagination.offset}`
        ).then((response) =>
            response.json().then((data) => {
                if (data.status == "Ok") {
                    setItems([...items, ...data.data]);
                } else {
                    setHasMore(false);
                }
            })
        );
    }, [pagination]);

    const fetchMore = () => {
        setPagination({
            count: pagination.count,
            offset: pagination.offset + pagination.count,
        });
    };

    if (items.length == 0) return null;

    let element = <div></div>;
    switch (props.type) {
        case "tracks":
            element = (
                <table className={"Table"}>
                    <thead>
                    <tr>
                        <th>Title</th>
                        <th>Artist</th>
                        <th>Album</th>
                        <th>Duration</th>
                    </tr>
                    </thead>
                    <tbody>
                    {items.map((item) => (
                        <TrackList track={item} key={item.id}/>
                    ))}
                    </tbody>
                </table>
            );
            break;
        case "artists":
            element = (
                <ul className={props.className}>
                    {items.map((item) => (
                        <ArtistList artist={item} key={item.id}/>
                    ))}
                </ul>
            );
            break;
        case "albums":
            element = (
                <ul className={props.className}>
                    {items.map((item) => (
                        <AlbumList album={item} key={item.id}/>
                    ))}
                </ul>
            );
            break;
    }

    return (
        <InfiniteScroll
            next={fetchMore}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            dataLength={items.length}
        >
            {element}
        </InfiniteScroll>
    );
};

export default MetadataList;
