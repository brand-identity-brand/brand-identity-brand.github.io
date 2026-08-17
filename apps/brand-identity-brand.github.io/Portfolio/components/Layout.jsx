import React, { forwardRef } from 'react'

const modeStyle = {
  dark: {
    background: 'var(--theme-colour, black)',
    content: 'white',
  },
  light: {
    background: 'white',
    content: 'var(--theme-colour, black)',
  },
}

function resolveColourStyle(colour, mode) {
  const modeColour = mode == null ? null : modeStyle[
    mode === 'dark' ? 'dark' : 'light'
  ]
  const background = colour?.background ?? modeColour?.background
  const content = colour?.content ?? modeColour?.content

  return {
    color: content ?? 'inherit',
    backgroundColor: background ?? 'inherit',
  }
}

const surfaceStyle = {
  boxSizing: 'border-box',
  display: 'flex',
  width: '100%',
  height: '100%',
  minWidth: 0,
  minHeight: 0,
  flexDirection: 'column',
  overflow: 'hidden',
}

const barOrientationStyle = {
  horizontal: {
    width: '100%',
    height: 38,
    flex: '0 0 38px',
    flexDirection: 'row',
  },
  vertical: {
    width: 38,
    height: '100%',
    flex: '0 0 38px',
    flexDirection: 'column',
  },
}

const squareStyle = {
  boxSizing: 'border-box',
  display: 'grid',
  width: 38,
  height: 38,
  minWidth: 38,
  minHeight: 38,
  flex: '0 0 38px',
  placeItems: 'center',
  overflow: 'hidden',
}

const fillStyle = {
  boxSizing: 'border-box',
  display: 'flex',
  minWidth: 0,
  minHeight: 0,
  flex: '1 1 auto',
  overflow: 'hidden',
}

const Layout = forwardRef(function AppletLayout({
  colour,
  mode,
  style,
  ...props
}, ref) {
  return (
    <div
      {...props}
      data-applet-layout=""
      data-mode={mode}
      ref={ref}
      style={{
        ...resolveColourStyle(colour, mode),
        ...style,
      }}
    />
  )
})

const LayoutSurface = forwardRef(function AppletLayoutSurface({
  mode = 'light',
  style,
  ...props
}, ref) {
  const resolvedMode = mode === 'dark' ? 'dark' : 'light'

  return (
    <Layout
      {...props}
      data-applet-layout-surface=""
      mode={resolvedMode}
      ref={ref}
      style={{
        ...surfaceStyle,
        ...style,
      }}
    />
  )
})

const LayoutBar = forwardRef(function AppletLayoutBar({
  orientation = 'horizontal',
  style,
  ...props
}, ref) {
  const resolvedOrientation = orientation === 'vertical'
    ? 'vertical'
    : 'horizontal'

  return (
    <Layout
      {...props}
      data-applet-layout-bar=""
      data-orientation={resolvedOrientation}
      ref={ref}
      style={{
        ...surfaceStyle,
        ...barOrientationStyle[resolvedOrientation],
        ...style,
      }}
    />
  )
})

const LayoutSquare = forwardRef(function AppletLayoutSquare({
  style,
  ...props
}, ref) {
  return (
    <Layout
      {...props}
      data-applet-layout-square=""
      ref={ref}
      style={{ ...squareStyle, ...style }}
    />
  )
})

const LayoutFill = forwardRef(function AppletLayoutFill({
  style,
  ...props
}, ref) {
  return (
    <Layout
      {...props}
      data-applet-layout-fill=""
      ref={ref}
      style={{ ...fillStyle, ...style }}
    />
  )
})

Layout.Surface = LayoutSurface
Layout.Bar = LayoutBar
Layout.Square = LayoutSquare
Layout.Fill = LayoutFill

export default Layout
