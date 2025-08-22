import css from "./index.module.css"



export default function MaterialIcon({className, style, onClick=()=>{},...props }){
    const {
        id,
        fill=false
    } = props;
    return (
        <span className={`material-symbols-outlined ${className}`}
        onClick = {(e)=>onClick(e)}
            style={{
                fontVariationSettings: `'FILL' ${fill ? 1 : 0}, 'wght' 400, 'GRAD' 0, 'opsz' 24`,
                ...style
            }}
        >
            {id}
        </span>
    )
}

export function TableActionButton({onClick,...props}){
    const {
        id,
        fill=false,
        backgroundColor,
        color
    } = props;

    return (
        <button className={css.TableActionButton}
            style={{
                backgroundColor: backgroundColor,
                color: color
            }}
            onClick={onClick}
        >
            <MaterialIcon id={id} fill={fill}
                style={{
                    fontSize: "12px",
                    display: "flex",
                    flexDirection:"row",
                    alignItems: "center",
                    justifyContent: "center"
                }}
            />
        </button>
    )
}
