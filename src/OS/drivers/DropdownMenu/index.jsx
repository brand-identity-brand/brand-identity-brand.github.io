import { useState, useRef, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import css from "./index.module.css";

/**
 * @typedef {Object} MenuItem
 * @property {string} label - The label text for the menu item
 * @property {function(): void} [action] - Optional callback function when the menu item is clicked
 * @property {MenuItem[]} [items] - Optional array of submenu items
 */

/**
 * @typedef {Object} DropdownMenuArrayProps
 * @property {MenuItem[]} menuItems - Array of menu items to display
 */

/**
 * DropdownMenuArray component that renders a menu bar with support for nested submenus
 * @param {DropdownMenuArrayProps} props
 */
export default function DropdownMenu({ menuItems = [] }) {
  const [activeMenu, setActiveMenu] = useState(null);
  const [activeSubmenus, setActiveSubmenus] = useState([]);
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    /**
     * @param {MouseEvent} event
     */
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setActiveMenu(null);
        setActiveSubmenus([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  /**
   * @param {string} menuLabel
   */
  const handleMenuClick = (menuLabel) => {
    setActiveMenu(activeMenu === menuLabel ? null : menuLabel);
    setActiveSubmenus([]);
  };

  /**
   * @param {string[]} itemPath
   */
  const handleMenuItemHover = (itemPath) => {
    setActiveSubmenus(itemPath);
  };

  /**
   * Recursive function to render menu items using immutable style
   * @param {MenuItem[]} items - Array of menu items to render
   * @param {number} [level=0] - Current nesting level
   * @param {string[]} [parentPath=[]] - Path of parent menu items
   * @returns {JSX.Element[]} Array of rendered menu items
   */
  const renderMenuItems = (items, level = 0, parentPath = []) => {
    return items.map((item, index) => {
      const itemPath = [...parentPath, item.label];
      const isActive = activeSubmenus.length >= level && activeSubmenus[level] === item.label;
      const hasSubItems = Boolean(item.items && item.items.length > 0);

      const handleItemClick = () => {
        if (item.action && !hasSubItems) {
          item.action();
          setActiveMenu(null);
          setActiveSubmenus([]);
        } else if (level === 0) {
          handleMenuClick(item.label);
        }
      };

      const handleItemHover = () => {
        if (level > 0 || activeMenu) {
          handleMenuItemHover(itemPath.slice(0, level + 1));
        }
      };

      const showSubmenu = (level === 0 && activeMenu === item.label) || (level > 0 && isActive);

      return (
        <div
          key={index}
          className={level === 0 ? css.menuButton : css.menuItem}
          onClick={handleItemClick}
          onMouseEnter={handleItemHover}
          role="menuitem"
          tabIndex={0}
          aria-haspopup={hasSubItems}
          aria-expanded={hasSubItems && showSubmenu}
        >
          {item.label}
          
          {hasSubItems && level > 0 && (
            <ChevronRight style={{ height: "0.75rem", width: "0.75rem", marginLeft: "0.5rem" }} />
          )}

          {/* Render submenu if this item has children and is active */}
          {hasSubItems && showSubmenu && (
            <div
              className={level === 0 ? css.dropdown : css.submenu}
              style={level > 0 ? { top: "0", left: "100%" } : {}}
              role="menu"
              aria-label={`${item.label} submenu`}
            >
              {renderMenuItems(item.items, level + 1, itemPath)}
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <div className={css.DropdownMenu} ref={menuRef} role="DropdownMenu" aria-label="Main Menu">
      {renderMenuItems(menuItems)}
    </div>
  );
} 