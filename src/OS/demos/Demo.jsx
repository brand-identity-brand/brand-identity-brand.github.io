export default function Demo({children,props}){
    return(
        <div {...props}>
            {children}
        </div>
    )
}