import AppWindowFrame from "../drivers/AppWindowFrame";

export default function DemoAppWindowFrame(props){
    const {
        windowId,
        message
    } = props;
    return (
        <AppWindowFrame windowId={windowId}>
            <div>
                props.message: {message}
            </div>
        </AppWindowFrame>
    )
}