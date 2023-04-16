import {Link} from "react-router-dom";
import {useEffect} from "react";

const links = [
    {link: "/artists", text: "Artists"},
    {link: "/albums", text: "Albums"},
    {link: "/tracks", text: "Tracks"}
]
export default () => {
    useEffect(() => {
        document.title = "Home";
    }, []);
    return (
        <>
            <ul className={"Home"}>
                {links.map((el) => {
                    return (
                        <li key={el.text}>
                            <Link to={el.link} className={"w-full inline-block"}>
                                {el.text}
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </>
    )
}
