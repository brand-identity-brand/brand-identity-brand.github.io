import css from "./index.module.css";
import React from "react";

const StartMenu = React.forwardRef(function StartMenu({ children }, ref) {
  return (
    <div className={css.StartMenu} ref={ref}>
      {children}
    </div>
  );
});

export default StartMenu;
