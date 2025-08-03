import css from "./index.module.css";
// import { MenuBar } from "../../MenuBar";
import Taskbar from "../../atoms/Taskbar";
import StartButton from "../../atoms/StartButton";
import StartMenu from "../../atoms/StartMenu";
import { useState, useRef, useEffect } from "react";

/**
 * 
 * @param {*} param0 
 * @returns 
 */
export default function Content({ children, ...props }) {
  const {
    MenuBar:{
      menuItems
    },
    StartButton:{
      renderStartButton
    },
    StartMenu: {
      renderStartMenu
    },
    
    hasTaskbar = true,
    renderTheRestOfTaskbar
  } = props;

  const hasMenuBar = menuItems!==undefined && menuItems.length !== 0 

  const menuBarHeight = hasMenuBar ? "22px" : 0;
  const taskbarHeight = hasTaskbar ? "calc( 2rem + 2px )" : 0;
 
  const [ showStartMenu , setShowStartMenu] = useState(false); //css.startButtonActive

  const startButtonRef = useRef(null);
  const startMenuRef = useRef(null);

  useEffect(() => {
    //! This implementation behaves slightly different than a typical modern OS.
    function handleClickOutside(e) {
      if ( startButtonRef.current?.contains(e.target) || startMenuRef.current?.contains(e.target)) { return; }
      setShowStartMenu(false); 
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={css.Content}>
      <div
        className={css.Body}
        style={{
          top: hasMenuBar ? menuBarHeight: 0,
          bottom: hasTaskbar? taskbarHeight : 0,
          left: 0,
          right: 0
        }}
      >
        {children}
      </div>
      
      {hasTaskbar && (
        <Taskbar>
          <StartButton ref={startButtonRef}
            // className={showStartMenu? css.showStartMenu_true : "" }
            onClick={()=>{
              setShowStartMenu(!showStartMenu);
            }}
            onBlur={()=>{
              // setTimeout(() => setShowStartMenu(false), 150); 
              // setShowStartMenu(false);
            }}
            isActive={showStartMenu}
          >
            { renderStartButton && renderStartButton() }
          </StartButton>
          { renderStartMenu!==undefined && showStartMenu && (<StartMenu ref={startMenuRef}> { renderStartMenu() }</StartMenu>)}

          <Taskbar.Seperator />
          
          {renderTheRestOfTaskbar()}
          
        </Taskbar>
      )}
      {/* {menuItems && <MenuBar menuItems={menuItems} />} */}
    </div>
  );
}