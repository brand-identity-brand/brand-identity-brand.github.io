import AppWindowFrame from "./AppWindowFrame";

export default function GUI({windowId, message}){
    return (
        <AppWindowFrame
            {...{windowId}}
        >
            <div>
                prop.message: {message}
            </div>
        </AppWindowFrame>
    )
}

