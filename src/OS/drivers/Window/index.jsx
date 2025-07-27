import css from "./index.module.css";
import { useState, useRef, useEffect, useCallback } from "react";
import { X } from "lucide-react";

/**
 * @typedef {'classic' | 'collapsible'} WindowStyle
 */

/**
 * @typedef {'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw' | null} ResizeDirection
 */

/**
 * @typedef {Object} WindowProps
 * @property {string} title - The window title
 * @property {{x: number, y: number}} [initialPosition] - Initial position of the window
 * @property {{width: number, height: number}} [initialSize] - Initial size of the window
 * @property {function(string): void} [onClose] - Callback when window is closed
 * @property {function(string): void} [onMinimise] - Callback when window is minimized
 * @property {React.ReactNode} [children] - Window content
 * @property {function(string): void} onFocus - Callback when window is focused
 * @property {WindowStyle} [windowStyle='classic'] - Window style
 * @property {boolean} [disableClose=false] - Whether to disable close button
 * @property {boolean} [disableMaximize=false] - Whether to disable maximize button
 * @property {boolean} [disableMinimize=false] - Whether to disable minimize button
 * @property {boolean} [disableResize=false] - Whether to disable window resizing
 * @property {boolean} [disableMove=false] - Whether to disable window movement
 * @property {boolean} [isActive=true] - Whether window is active
 * @property {boolean} [isMinimized=false] - Whether window is minimized
 */

/**
 * Window component that provides desktop-like window functionality
 * @param {WindowProps} props
 */
export default function Window({
  zIndex,
  title,
  initialPosition = { x: 50, y: 50 },
  initialSize = { width: 500, height: 400 },
  onClose = () =>{},
  onMinimise = () =>{},
  children,
  onFocus = () =>{},
  windowStyle = "classic", //collapse
  disableClose = false,
  disableMaximize = false,
  disableMinimize = false,
  disableResize = false,
  disableMove = false,
  isActive = true,
  isMinimized = false,
  parentId = null,
}) {
  const [position, setPosition] = useState(initialPosition);
  const [size, setSize] = useState(initialSize);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const [isMaximized, setIsMaximized] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [preMaximizeState, setPreMaximizeState] = useState({
    position: initialPosition,
    size: initialSize,
  });

  const windowRef = useRef(null);
  const titleBarRef = useRef(null);
  const contentRef = useRef(null);

  // NEW: Store parent container offset relative to viewport
  const parentOffsetRef = useRef({ x: 0, y: 0 });

  // NEW: Helper to update parent offset on drag/resize start
  const updateParentOffset = () => {
    if (windowRef.current?.parentElement) {
      const rect = windowRef.current.parentElement.getBoundingClientRect();
      parentOffsetRef.current = { x: rect.left, y: rect.top };
    }
  };

  // Handle dragging and resizing
  useEffect(() => {
    /**
     * @param {MouseEvent} e
     */
    const handleMouseMove = (e) => {
      if (isDragging && !isMaximized && !disableMove) {
        // Calculate new position relative to parent container's viewport offset
        const newX = e.clientX - parentOffsetRef.current.x - dragOffset.x;
        const newY = e.clientY - parentOffsetRef.current.y - dragOffset.y;

        if (parentId && contentRef.current && windowRef.current) {
          const parentContent = contentRef.current.parentElement;
          if (parentContent) {
            const parentRect = parentContent.getBoundingClientRect();
            const windowRect = windowRef.current.getBoundingClientRect();

            // Constrain x position
            const constrainedX = Math.max(parentRect.left - parentOffsetRef.current.x, newX);
            const finalX = Math.min(parentRect.right - parentOffsetRef.current.x - windowRect.width, constrainedX);

            // Constrain y position
            const constrainedY = Math.max(parentRect.top - parentOffsetRef.current.y, newY);
            const finalY = Math.min(parentRect.bottom - parentOffsetRef.current.y - windowRect.height, constrainedY);

            setPosition({
              x: finalX,
              y: finalY,
            });
          } else {
            setPosition({
              x: newX,
              y: newY,
            });
          }
        } else {
          setPosition({
            x: newX,
            y: newY,
          });
        }
      } else if (isResizing && !isMaximized && !disableResize) {
        e.preventDefault();

        let newWidth = size.width;
        let newHeight = size.height;
        let newX = position.x;
        let newY = position.y;

        if (isResizing.includes("e")) {
          newWidth = resizeStart.width + (e.clientX - resizeStart.x);
          newWidth = Math.max(newWidth, 200);
        }

        if (isResizing.includes("w")) {
          const diff = e.clientX - resizeStart.x;
          const potentialNewWidth = resizeStart.width - diff;

          if (potentialNewWidth >= 200) {
            newWidth = potentialNewWidth;
            newX = resizeStart.x + diff - parentOffsetRef.current.x; // adjust relative to parent viewport offset
          }
        }

        if (isResizing.includes("s")) {
          newHeight = resizeStart.height + (e.clientY - resizeStart.y);
          newHeight = Math.max(newHeight, 100);
        }

        if (isResizing.includes("n")) {
          const diff = e.clientY - resizeStart.y;
          const potentialNewHeight = resizeStart.height - diff;

          if (potentialNewHeight >= 100) {
            newHeight = potentialNewHeight;
            newY = resizeStart.y + diff - parentOffsetRef.current.y; // adjust relative to parent viewport offset
          }
        }

        // Constrain within parent content area if parentId set
        if (parentId && contentRef.current) {
          const parentContent = contentRef.current.parentElement;
          if (parentContent) {
            const parentRect = parentContent.getBoundingClientRect();

            if (newX + newWidth > parentRect.right - parentOffsetRef.current.x) {
              newWidth = parentRect.right - parentOffsetRef.current.x - newX;
            }
            if (newY + newHeight > parentRect.bottom - parentOffsetRef.current.y) {
              newHeight = parentRect.bottom - parentOffsetRef.current.y - newY;
            }
          }
        }

        setSize({ width: newWidth, height: newHeight });
        setPosition({ x: newX, y: newY });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(null);
      document.body.style.cursor = "default";
    };

    if (isDragging || isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [
    isDragging,
    isResizing,
    dragOffset,
    isMaximized,
    resizeStart,
    disableMove,
    disableResize,
    parentId,
    position,
    size,
  ]);

  // UPDATED: Recalculate parent offset on drag start
  const handleMouseDown = useCallback(
    (e) => {
      if (isMaximized || disableMove) return;

      updateParentOffset(); // <-- recalc parent offset here

      onFocus();
      setIsDragging(true);
      setDragOffset({
        x: e.clientX - parentOffsetRef.current.x - position.x,
        y: e.clientY - parentOffsetRef.current.y - position.y,
      });
    },
    [isMaximized, disableMove, onFocus, position.x, position.y],
  );

  // UPDATED: Recalculate parent offset on resize start
  const handleResizeStart = useCallback(
    (direction) => (e) => {
      if (isMaximized || disableResize) return;

      updateParentOffset(); // <-- recalc parent offset here

      e.stopPropagation();
      onFocus();
      setIsResizing(direction);
      setResizeStart({
        x: e.clientX,
        y: e.clientY,
        width: size.width,
        height: size.height,
      });

      // Set cursor based on resize direction
      switch (direction) {
        case "n":
        case "s":
          document.body.style.cursor = "ns-resize";
          break;
        case "e":
        case "w":
          document.body.style.cursor = "ew-resize";
          break;
        case "ne":
        case "sw":
          document.body.style.cursor = "nesw-resize";
          break;
        case "nw":
        case "se":
          document.body.style.cursor = "nwse-resize";
          break;
      }
    },
    [isMaximized, disableResize, onFocus, size.width, size.height],
  );

  const handleMaximize = useCallback(() => {
    if (disableMaximize) return;

    if (!isMaximized) {
      setPreMaximizeState({
        position,
        size,
      });
      setIsMaximized(true);
      if (isCollapsed) setIsCollapsed(false);
    } else {
      setPosition(preMaximizeState.position);
      setSize(preMaximizeState.size);
      setIsMaximized(false);
    }
  }, [disableMaximize, isMaximized, position, size, isCollapsed, preMaximizeState]);

  const handleMinimize = useCallback(() => {
    if (disableMinimize || !onMinimise) return;

    onMinimise();
  }, [disableMinimize, onMinimise]);

  const handleCollapse = useCallback(() => {
    if (disableMinimize) return; // Don't allow collapse if minimize is disabled

    if (isMaximized) {
      setPosition(preMaximizeState.position);
      setSize(preMaximizeState.size);
      setIsMaximized(false);
    }
    setIsCollapsed(!isCollapsed);
  }, [isCollapsed, isMaximized, preMaximizeState, disableMinimize]);

  const handleClose = useCallback(() => {
    if (disableClose || !onClose) return;
    onClose();
  }, [disableClose, onClose]);

  const handleWindowClick = useCallback(() => {
    onFocus();
  }, [onFocus]);

  // Resize handles with hover cursor styles
  const resizeHandles =
    !isMaximized && !isCollapsed && !disableResize ? (
      <>
        <div
          style={{ position: "absolute", top: 0, left: 0, right: 0, height: "0.25rem", cursor: "ns-resize" }}
          onMouseDown={handleResizeStart("n")}
        />
        <div
          style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "0.25rem", cursor: "ns-resize" }}
          onMouseDown={handleResizeStart("s")}
        />
        <div
          style={{ position: "absolute", top: 0, bottom: 0, left: 0, width: "0.25rem", cursor: "ew-resize" }}
          onMouseDown={handleResizeStart("w")}
        />
        <div
          style={{ position: "absolute", top: 0, bottom: 0, right: 0, width: "0.25rem", cursor: "ew-resize" }}
          onMouseDown={handleResizeStart("e")}
        />
        <div
          style={{ position: "absolute", top: 0, left: 0, width: "0.75rem", height: "0.75rem", cursor: "nwse-resize" }}
          onMouseDown={handleResizeStart("nw")}
        />
        <div
          style={{ position: "absolute", top: 0, right: 0, width: "0.75rem", height: "0.75rem", cursor: "nesw-resize" }}
          onMouseDown={handleResizeStart("ne")}
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "0.75rem",
            height: "0.75rem",
            cursor: "nesw-resize",
          }}
          onMouseDown={handleResizeStart("sw")}
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            width: "0.75rem",
            height: "0.75rem",
            cursor: "nwse-resize",
          }}
          onMouseDown={handleResizeStart("se")}
        />
      </>
    ) : null;

  if (isMinimized) return null;

  const windowStyles = {
    zIndex,
    position: isMaximized ? "relative" : "absolute",
    left: isMaximized ? 0 : position.x,
    top: isMaximized ? 0 : position.y,
    width: isMaximized ? "100%" : isCollapsed && windowStyle === "collapsible" ? "auto" : size.width,
    height: isMaximized
      ? isCollapsed && windowStyle === "collapsible"
        ? "auto"
        : "100%"
      : isCollapsed && windowStyle === "collapsible"
      ? "auto"
      : size.height,
  };

  return (
    <div ref={windowRef} className={css.window} style={windowStyles} onClick={handleWindowClick}>
      <div
        ref={titleBarRef}
        className={isActive ? css.titleBarActive : css.titleBarInactive}
        onMouseDown={disableMove ? undefined : handleMouseDown}
        style={{
          fontFamily: "JetBrainsMono",
          borderBottom: isCollapsed ? "0px" : "2px solid black",
        }}
      >
        {windowStyle === "collapsible" && (
          <button
            className={
              disableMinimize
                ? isActive
                  ? css.buttonDisabledActive
                  : css.buttonDisabledInactive
                : isActive
                ? css.buttonActive
                : css.buttonInactive
            }
            style={{  height: "1rem", width: "1rem", marginRight: "0.5rem" }}
            onClick={handleCollapse}
            aria-label={isCollapsed ? "Expand" : "Collapse"}
            disabled={disableMinimize}
          >
            {isCollapsed ? ">" : "="}
          </button>
        )}

        <div className={`${css.title} .unselectable`}>{title}</div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
          {windowStyle === "classic" && (
            <button
              className={
                disableMinimize
                  ? isActive
                    ? css.buttonDisabledActive
                    : css.buttonDisabledInactive
                  : isActive
                  ? css.buttonActive
                  : css.buttonInactive
              }
              onClick={handleMinimize}
              disabled={disableMinimize}
              aria-label="Minimize"
            >
              <div style={{ height: "0.4rem", width: "0.4rem", borderBottom: "2px solid black" }}></div>
            </button>
          )}

          <button
            className={
              disableMaximize
                ? isActive
                  ? css.buttonDisabledActive
                  : css.buttonDisabledInactive
                : isActive
                ? css.buttonActive
                : css.buttonInactive
            }
            onClick={handleMaximize}
            disabled={disableMaximize}
            aria-label={isMaximized ? "Restore" : "Maximize"}
          >
            {isMaximized ? (
              <div className={css.restoreIcon}></div>
            ) : (
              <div style={{ height: "0.4rem", width: "0.4rem", border: "2px solid currentColor" }}></div>
            )}
          </button>

          <button
            className={
              disableClose
                ? isActive
                  ? css.buttonDisabledActive
                  : css.buttonDisabledInactive
                : isActive
                ? css.buttonActive
                : css.buttonInactive
            }
            onClick={handleClose}
            disabled={disableClose}
            aria-label="Close"
          >
            <X style={{ height: "1rem", width: "1rem", strokeWidth: "3px" }} />
          </button>
        </div>
      </div>

      {(!isCollapsed || windowStyle !== "collapsible") && (
        <div ref={contentRef} className={css.content}>
          {children}
        </div>
      )}

      {resizeHandles}
    </div>
  );
}
