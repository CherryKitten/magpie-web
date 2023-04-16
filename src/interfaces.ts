import {HTMLMediaControls, HTMLMediaState} from "react-use/lib/factory/createHTMLMediaHook";
import {createContext} from "react";

export interface Metadata {
    title?: string
    name?: string
    id?: number
    year?: number
    album?: string
    artist?: string[]
    duration?: number
    art?: string
}

type Playlist = Metadata[];

interface MagpieControls extends HTMLMediaControls {
    add_to_queue: any,
    play_next: any
}

interface Context {
    currentTrack: Metadata | null,
    playlist: Playlist,
    audio: any,
    controls: MagpieControls | null,
    state: HTMLMediaState | null,
    src: string,
}


const initialContext: Context = {
    currentTrack: null,
    playlist: [],
    audio: null,
    controls: null,
    state: null,
    src: "",
}

export const MagpieContext = createContext(initialContext);



