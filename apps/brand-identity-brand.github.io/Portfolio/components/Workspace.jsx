import React, { forwardRef } from 'react'
import RuntimeWorkspace from '../../../../projects/unaware.house/packages/gui/components/molecules/Workspace.jsx'

const workspaceStyle = {
  boxSizing: 'border-box',
  display: 'grid',
  width: '100%',
  height: '100%',
  minWidth: 0,
  minHeight: 0,
  overflow: 'hidden',
}

const presentationStyle = {
  boxSizing: 'border-box',
  width: '100%',
  minWidth: 0,
  minHeight: 0,
  gridRow: 1,
}

const barStyle = {
  boxSizing: 'border-box',
  display: 'flex',
  width: '100%',
  height: 38,
  minWidth: 0,
  gridRow: 2,
  borderTop: '1px solid black',
}

const squareStyle = {
  boxSizing: 'border-box',
  display: 'flex',
  width: 38,
  height: 38,
  flex: '0 0 38px',
  alignItems: 'center',
  justifyContent: 'center',
}

const fillStyle = {
  boxSizing: 'border-box',
  display: 'flex',
  width: 'calc(100% - 38px)',
  height: 38,
  minWidth: 0,
  flex: '1 1 auto',
  alignItems: 'center',
  justifyContent: 'center',
  borderLeft: '1px solid black',
}

const Workspace = forwardRef(function PortfolioWorkspace({
  barCount = 1,
  children,
  style,
  ...props
}, ref) {
  const resolvedBarCount = Math.max(1, Math.trunc(Number(barCount)) || 1)

  return (
    <div
      {...props}
      data-portfolio-workspace-bar-count={resolvedBarCount}
      data-portfolio-workspace=""
      ref={ref}
      style={{
        ...workspaceStyle,
        gridTemplateRows: `minmax(0, 1fr) repeat(${resolvedBarCount}, 38px)`,
        ...style,
      }}
    >
      {children}
    </div>
  )
})

const WorkspacePresentation = forwardRef(function WorkspacePresentation({
  mode = 'white',
  style,
  ...props
}, ref) {
  return (
    <RuntimeWorkspace.Presentation
      {...props}
      mode={mode}
      ref={ref}
      style={{ ...presentationStyle, ...style }}
    />
  )
})

const WorkspaceBarSquare = forwardRef(function WorkspaceBarSquare({
  style,
  ...props
}, ref) {
  return (
    <div
      {...props}
      data-portfolio-bar-square=""
      ref={ref}
      style={{ ...squareStyle, ...style }}
    />
  )
})

const WorkspaceBarFill = forwardRef(function WorkspaceBarFill({
  style,
  ...props
}, ref) {
  return (
    <div
      {...props}
      data-portfolio-bar-fill=""
      ref={ref}
      style={{ ...fillStyle, ...style }}
    />
  )
})

const WorkspaceBarButton = forwardRef(function WorkspaceBarButton({
  type = 'button',
  ...props
}, ref) {
  return (
    <button
      {...props}
      data-portfolio-bar-button=""
      ref={ref}
      type={type}
    />
  )
})

const WorkspaceBar = forwardRef(function WorkspaceBar({
  children,
  mode = 'white',
  position = 'bottom',
  style,
  ...props
}, ref) {
  return (
    <RuntimeWorkspace.Bar
      {...props}
      mode={mode}
      position={position}
      ref={ref}
      style={{ ...barStyle, ...style }}
    >
      {children ?? (
        <>
          <WorkspaceBarSquare />
          <WorkspaceBarFill />
        </>
      )}
    </RuntimeWorkspace.Bar>
  )
})

Workspace.Presentation = WorkspacePresentation
Workspace.Bar = WorkspaceBar
Workspace.Bar.Square = WorkspaceBarSquare
Workspace.Bar.Fill = WorkspaceBarFill
Workspace.Bar.Button = WorkspaceBarButton

export default Workspace
