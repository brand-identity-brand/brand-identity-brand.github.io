import css from './index.module.css';
import { useContext, useEffect } from 'react';
import { WindowManagerContext } from 'react-desktop-environment';

export default function ContextMenuBox({id, style, className, ...props}){
    const {
        useParentState,
        initialPosition,
        menuOptions
    } = props;
    const { closeWindow } = useContext(WindowManagerContext); 
    const [ isContextMenuBoxOpened, setIsContextMenuBoxOpened ] =  useParentState();
    useEffect(() => {
        console.log(isContextMenuBoxOpened)
        function handleClick(){closeWindow(id)}
        window.addEventListener('click', handleClick); 
        // window.addEventListener('contextmenu', handleClick); 
        if ( isContextMenuBoxOpened ) { setIsContextMenuBoxOpened(false); }
        
        return () =>{ 
            window.removeEventListener('click', handleClick);
            // window.removeEventListener('contextmenu', handleClick);
        };
    });

    return( //isContextMenuBoxOpened
        // ? null
        <div
            className={`${css.master} ${className}`}
            style={{
                left: initialPosition.left,
                top: initialPosition.top,
                ...style
            }}
            onFocus={ () => {console.log('main', 'focus');} }
            onBlur={()=>{console.log('blurr')}}
        >
            {menuOptions.map(option=>{
                const {
                    title,
                    onClick
                } = option;
                return (
                    <button key={title} onClick={onClick}>
                        {title}
                    </button>
                )
            })}
        </div>
    )
}