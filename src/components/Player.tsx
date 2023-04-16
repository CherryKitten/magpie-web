import React, {useContext} from "react";
import {Button} from "@mui/material";
import {MagpieContext} from "../interfaces";


const Player = () => {
    const context = useContext(MagpieContext);
    const state = context?.state;
    const controls = context?.controls;

    if (state != undefined && controls != undefined) {
        return (
            <div>

                <div className="fixed bottom-20 left-10 z-40 bg-rp-muted p-4">
                    <pre>{JSON.stringify(state, null, 2)}</pre>

                    <Button onClick={controls.play} color={"inherit"}>
                        Play
                    </Button>

                    <Button onClick={controls.pause} color={"inherit"}>
                        Pause
                    </Button>

                    <Button onClick={controls.play_next} color={"inherit"}>
                        Next
                    </Button>

                </div>

                <div className="fixed bottom-20 right-10 z-40 bg-rp-overlay p-4">
                    <pre className={"text-rp-gold"}>{context.currentTrack?.title}</pre>
                    <pre>{context.playlist.map((el) => <p>{el.title}</p>)}</pre>
                </div>
            </div>

        )
    } else return null
}

export default Player;
