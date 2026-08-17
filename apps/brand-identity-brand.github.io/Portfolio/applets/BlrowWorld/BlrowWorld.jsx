import React, { forwardRef } from 'react'
import { AppletEnvironment } from '@unaware/gui'
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

export default function BlrowWorld({ desktopEnvironment, ...props }) {
  return (
    <AppletEnvironment
      defaultDesktopEnvironment={BlrowWorld.desktopEnvironment}
      desktopEnvironment={desktopEnvironment}
    >
      <BlrowWorld.Surface colour={BlrowWorld.meta.colour} {...props} />
    </AppletEnvironment>
  )
}

const BlrowWorldSpine = forwardRef(function BlrowWorldSpine({
  children = BlrowWorld.meta.displayName,
  ...props
}, ref) {
  return (
    <span {...props} data-applet-spine="" ref={ref}>
      {children}
    </span>
  )
})

const BlrowWorldSwitchBar = forwardRef(function BlrowWorldSwitchBar({
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

const BlrowWorldSwitchInline = forwardRef(function BlrowWorldSwitchInline({
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

BlrowWorld.Surface = Surface
BlrowWorld.Workspace = Workspace
BlrowWorld.Bar = Workspace.Bar
BlrowWorld.Presentation = Workspace.Presentation
BlrowWorld.Spine = BlrowWorldSpine
BlrowWorld.Switch = BlrowWorldSwitchBar
BlrowWorld.Switch.Bar = BlrowWorldSwitchBar
BlrowWorld.Switch.Inline = BlrowWorldSwitchInline
BlrowWorld.meta = Object.freeze({
  applicationName: 'blrow-world',
  displayName: 'blrow.world',
  colour: Object.freeze({
    background: 'transparent',
    content: 'white',
  }),
  icon: Object.freeze({
    provider: 'material-symbols',
    name: 'apps',
  }),
  version: 1,
})
BlrowWorld.applets = Object.freeze({})
BlrowWorld.desktopEnvironment = defaultDesktopEnvironment
