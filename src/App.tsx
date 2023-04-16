import React, {useState} from 'react';
import './App.css';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Home from "./components/views/Home";
import MetadataList from "./components/views/MetadataList";
import Player from "./components/Player";
import {useAudio} from "react-use";
import {Metadata} from "./interfaces";
import {MagpieContext} from "./interfaces";

function App() {
    const [currentTrack, setCurrentTrack] = useState(null as Metadata | null);
    const src = currentTrack != null ? `http://localhost:8080/api/play/${currentTrack.id}` : "";
    const [audio, state, controls, ref] = useAudio({
        src: src, autoPlay: true
    });
    const [playlist, setPlaylist] = useState([] as Metadata[]);

    const add_to_queue = async (track_to_add: Metadata | Metadata[]) => {
        let track = track_to_add;
        if (!Array.isArray(track)) {
            track = [track]
        }
        if (currentTrack === null) {
            setCurrentTrack(track.shift() as Metadata);
            setPlaylist(pl => [...pl, ...track as Metadata[]])
        } else {
            setPlaylist(pl => [...pl, ...track as Metadata[]])
        }
    }

    const play_next = () => {
        let track = playlist.shift();
        if (track) {
            setCurrentTrack(track)
        } else {
            setCurrentTrack(null)
        }
    }

    let myControls = {...controls, add_to_queue, play_next}

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Home/>,
        },
        {
            path: "/artists",
            element: <MetadataList type={"artists"} className={""}/>,
        },
        {
            path: "/albums",
            element: <MetadataList type={"albums"} className={"Grid"}/>,
        },
        {
            path: "/tracks",
            element: <MetadataList type={"tracks"} className={""}/>,
        }
    ]);
    return (
        <div className="App" id={"App"}>
            {audio}
            <MagpieContext.Provider
                value={
                    {
                        audio: ref,
                        state: state,
                        controls: myControls,
                        playlist: playlist,
                        currentTrack: currentTrack,
                        src: src
                    }
                }>
                <RouterProvider router={router}/>
                <Player/>
            </MagpieContext.Provider>

        </div>
    );
}

export default App;
