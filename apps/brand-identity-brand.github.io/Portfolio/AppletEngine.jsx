import React from 'react'
import { AppletEnvironment } from '@unaware/gui'
import { AppletEngine as RuntimeAppletEngine } from '@unaware/gui'
import Portfolio from './Portfolio.jsx'

export default function AppletEngine({
  applet = Portfolio,
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

AppletEngine.Applet = Portfolio
AppletEngine.Runtime = RuntimeAppletEngine
AppletEngine.collectApplicationRegistry = (
  ...args
) => RuntimeAppletEngine.collectApplicationRegistry(...args)
AppletEngine.create = (...args) => RuntimeAppletEngine.create(...args)
AppletEngine.use = () => RuntimeAppletEngine.use()
AppletEngine.useOwnership = () => RuntimeAppletEngine.useOwnership()
