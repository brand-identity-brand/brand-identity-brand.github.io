import css from "./index.module.css";
import { Menu } from "lucide-react";
// import StartMenu from "../StartMenu";
import React from "react";


const StartButton = React.forwardRef( function StartButton( {children, className, ...props}, ref){
  const {
    isActive = false,
    onClick,
    onBlur,//optional
    onMouseEnter, //optional
    onMouseLeave //optional
  } = props;
  return (
      <button ref={ref}
        className={`${css.startButton} ${isActive? css.startButtonActive : "" } ${className}`}
        onClick={onClick}
        onBlur={onBlur}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        { children? children :  <Menu /> }
      </button>
  )
});

export default StartButton;