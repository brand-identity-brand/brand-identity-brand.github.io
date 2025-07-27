import css from "./index.module.css";
/**
 * Taskbar component that displays the start menu and minimized windows
 * @param {TaskbarProps} props
 */
export default function Taskbar({ children, title }) {

  return (
    <div className={css.Taskbar}>

      {children}

    </div>
  );
} 


function TaskbarSeperator(){
  return (
    <div style={{borders: "2px solid black", boxSizing: "border-box", height: "100%", width:"2px", background: "black"}}/>
  )
}

Taskbar.Seperator = TaskbarSeperator