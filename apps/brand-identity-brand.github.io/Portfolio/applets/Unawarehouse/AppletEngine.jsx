import React from 'react'
import { AppletEngine as RuntimeAppletEngine } from '@unaware/gui'
import { AppletEnvironment } from '@unaware/gui'
import Unawarehouse from './Unawarehouse.jsx'

export default function AppletEngine({
  applet = Unawarehouse,
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

AppletEngine.Applet = Unawarehouse
AppletEngine.Runtime = RuntimeAppletEngine
AppletEngine.collectApplicationRegistry = (
  ...args
) => RuntimeAppletEngine.collectApplicationRegistry(...args)
AppletEngine.create = (...args) => RuntimeAppletEngine.create(...args)
AppletEngine.use = () => RuntimeAppletEngine.use()
AppletEngine.useOwnership = () => RuntimeAppletEngine.useOwnership()
