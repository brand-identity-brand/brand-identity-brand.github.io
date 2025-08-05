export default function Demo({children,props}){
    return(
        <div {...props}>
            {props?.message}
            {children}
        </div>
    )
}
Demo.displayName = "Demo";