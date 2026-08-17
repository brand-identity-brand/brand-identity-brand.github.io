import React, {
  Children,
  forwardRef,
  isValidElement,
} from 'react'
import Layout from './Layout.jsx'

const surfaceStyle = {
  boxSizing: 'border-box',
  width: '100%',
  height: '100%',
  minWidth: 0,
  minHeight: 0,
  overflow: 'hidden',
}

const presentationStyle = {
  boxSizing: 'border-box',
  width: '100%',
  height: '100%',
  minWidth: 0,
  minHeight: 0,
  overflow: 'hidden',
}

const SurfacePresentation = forwardRef(function AppletSurfacePresentation({
  style,
  ...props
}, ref) {
  return (
    <div
      {...props}
      data-applet-surface-presentation=""
      ref={ref}
      style={{ ...presentationStyle, ...style }}
    />
  )
})

const SurfaceBar = forwardRef(function AppletSurfaceBar({
  orientation = 'horizontal',
  ...props
}, ref) {
  return <Layout.Bar {...props} orientation={orientation} ref={ref} />
})

const Surface = forwardRef(function AppletSurface({
  bar,
  barOrientation = 'horizontal',
  children,
  collapsed = false,
  colour,
  layoutProps,
  mode = 'light',
  presentationProps,
  style,
  ...props
}, ref) {
  const items = Children.toArray(children)
  const suppliedBar = items.find(
    (item) => isValidElement(item) && item.type === SurfaceBar,
  )
  const suppliedPresentation = items.find(
    (item) => isValidElement(item) && item.type === SurfacePresentation,
  )
  const looseChildren = items.filter((item) => (
    !isValidElement(item)
      || (item.type !== SurfaceBar && item.type !== SurfacePresentation)
  ))
  const resolvedBar = suppliedBar ?? (bar == null ? null : (
    <SurfaceBar orientation={barOrientation}>{bar}</SurfaceBar>
  ))
  const resolvedPresentation = suppliedPresentation ?? (
    <SurfacePresentation {...presentationProps}>
      {looseChildren}
    </SurfacePresentation>
  )

  return (
    <section
      {...props}
      data-applet-surface=""
      data-applet-surface-collapsed={collapsed || undefined}
      ref={ref}
      style={{ ...surfaceStyle, ...style }}
    >
      <Layout.Surface {...layoutProps} colour={colour} mode={mode}>
        {resolvedBar}
        <Layout.Fill hidden={collapsed}>
          {resolvedPresentation}
        </Layout.Fill>
      </Layout.Surface>
    </section>
  )
})

Surface.Layout = Layout
Surface.Bar = SurfaceBar
Surface.Presentation = SurfacePresentation

export default Surface
