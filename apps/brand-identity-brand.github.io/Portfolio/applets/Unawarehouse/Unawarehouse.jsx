import React, { forwardRef } from 'react'
import GUI, { AppletEnvironment } from '@unaware/gui'
import * as compositor from 'react-desktop-environment/compositor'
import * as ui from 'react-desktop-environment/ui'
import * as windowManager from 'react-desktop-environment/window-manager'
import Workspace from '../../components/Workspace.jsx'
import Button from './components/Button.jsx'
import Surface from './components/Surface.jsx'

const defaultDesktopEnvironment = Object.freeze({
  compositor,
  ui,
  windowManager,
})

export default function Unawarehouse({ desktopEnvironment, ...props }) {
  return (
    <AppletEnvironment
      defaultDesktopEnvironment={Unawarehouse.desktopEnvironment}
      desktopEnvironment={desktopEnvironment}
    >
      <Unawarehouse.Surface colour={Unawarehouse.meta.colour} {...props}>
        <GUI />
      </Unawarehouse.Surface>
    </AppletEnvironment>
  )
}

const UnawarehouseSpine = forwardRef(function UnawarehouseSpine({
  children = Unawarehouse.meta.displayName,
  ...props
}, ref) {
  return (
    <span {...props} data-applet-spine="" ref={ref}>
      {children}
    </span>
  )
})

const UnawarehouseSwitchBar = forwardRef(function UnawarehouseSwitchBar({
  controls,
  onClick,
  onSelect,
  surfaceId,
  ...props
}, ref) {
  const select = (event) => {
    const parentSurface = controls?.selectChild?.(surfaceId)
    onSelect?.(surfaceId, parentSurface)
    onClick?.(event)
  }
  return (
    <Button
      {...props}
      data-applet-switch=""
      data-applet-switch-role="bar"
      onClick={select}
      ref={ref}
    />
  )
})

const UnawarehouseSwitchInline = forwardRef(function UnawarehouseSwitchInline({
  controls,
  onClick,
  onSelect,
  surfaceId,
  ...props
}, ref) {
  const select = (event) => {
    const parentSurface = controls?.selectChild?.(surfaceId)
    onSelect?.(surfaceId, parentSurface)
    onClick?.(event)
  }
  return (
    <Button
      {...props}
      data-applet-switch=""
      data-applet-switch-role="inline"
      onClick={select}
      ref={ref}
    />
  )
})

Unawarehouse.Surface = Surface
Unawarehouse.Workspace = Workspace
Unawarehouse.Bar = Workspace.Bar
Unawarehouse.Presentation = Workspace.Presentation
Unawarehouse.Spine = UnawarehouseSpine
Unawarehouse.Switch = UnawarehouseSwitchBar
Unawarehouse.Switch.Bar = UnawarehouseSwitchBar
Unawarehouse.Switch.Inline = UnawarehouseSwitchInline
Unawarehouse.meta = Object.freeze({
  applicationName: 'unawarehouse',
  displayName: 'Unawarehouse',
  colour: Object.freeze({
    background: 'black',
    content: 'white',
  }),
  icon: Object.freeze({
    provider: 'material-symbols',
    name: 'apps',
  }),
  version: 1,
})
Unawarehouse.applets = GUI.applets
Unawarehouse.desktopEnvironment = defaultDesktopEnvironment
