import React from 'react'
import { AppletEngine as RuntimeAppletEngine } from '@unaware/gui'
import { AppletEnvironment } from '@unaware/gui'
import BlrowWorld from './BlrowWorld.jsx'

export default function AppletEngine({
  applet = BlrowWorld,
  desktopEnvironment,
  ...props
}) {
  return (
    <AppletEnvironment
      defaultDesktopEnvironment={applet.desktopEnvironment}
      desktopEnvironment={desktopEnvironment}
    >
      <RuntimeAppletEngine {...props} applet={applet} />
    </AppletEnvironment>
  )
}

AppletEngine.Applet = BlrowWorld
AppletEngine.Runtime = RuntimeAppletEngine
AppletEngine.collectApplicationRegistry = (
  ...args
) => RuntimeAppletEngine.collectApplicationRegistry(...args)
AppletEngine.create = (...args) => RuntimeAppletEngine.create(...args)
AppletEngine.use = () => RuntimeAppletEngine.use()
AppletEngine.useOwnership = () => RuntimeAppletEngine.useOwnership()
