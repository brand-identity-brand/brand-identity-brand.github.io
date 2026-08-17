import React, { useState } from 'react'
import Workspace from './components/Workspace.jsx'
import BlrowWorld from './applets/BlrowWorld/BlrowWorld.jsx'
import Unawarehouse from './applets/Unawarehouse/Unawarehouse.jsx'

const portfolioApplets = Object.freeze({
  blrowWorld: BlrowWorld,
  unawarehouse: Unawarehouse,
})

const workspaceApplets = Object.freeze(Object.values(portfolioApplets))

export default function Portfolio() {
  const [activeApplicationName, setActiveApplicationName] = useState(
    BlrowWorld.meta.applicationName,
  )
  const [workspaceBarsOpen, setWorkspaceBarsOpen] = useState(false)
  const activeApplet = workspaceApplets.find(
    (Applet) => Applet.meta.applicationName === activeApplicationName,
  ) ?? workspaceApplets[0]
  const visibleWorkspaceBars = workspaceBarsOpen
    ? [
        activeApplet,
        ...workspaceApplets.filter((Applet) => Applet !== activeApplet),
      ]
    : [activeApplet]

  const selectWorkspace = (Applet) => {
    if (Applet === activeApplet) {
      setWorkspaceBarsOpen((open) => !open)
      return
    }

    setActiveApplicationName(Applet.meta.applicationName)
    setWorkspaceBarsOpen(false)
  }

  const ActiveApplet = activeApplet

  return (
    <Workspace barCount={visibleWorkspaceBars.length}>
      <Workspace.Presentation>
        <ActiveApplet />
      </Workspace.Presentation>
      {visibleWorkspaceBars.map((Applet, index) => {
        const AppletWorkspace = Applet.Workspace ?? Workspace
        const active = Applet === activeApplet
        const label = Applet.meta.displayName

        return (
          <AppletWorkspace.Bar
            aria-label={`${label} workspace controls`}
            data-active={active || undefined}
            data-application-name={Applet.meta.applicationName}
            key={Applet.meta.applicationName}
            style={{ gridRow: index + 2 }}
          >
            <AppletWorkspace.Bar.Square>
              <AppletWorkspace.Bar.Button
                aria-expanded={active ? workspaceBarsOpen : false}
                aria-label={active
                  ? `${workspaceBarsOpen ? 'Collapse' : 'Show'} workspace bars`
                  : `Open ${label} workspace`}
                aria-pressed={active}
                onClick={() => selectWorkspace(Applet)}
              >
                {label.slice(0, 1).toUpperCase()}
              </AppletWorkspace.Bar.Button>
            </AppletWorkspace.Bar.Square>
            <AppletWorkspace.Bar.Fill />
          </AppletWorkspace.Bar>
        )
      })}
    </Workspace>
  )
}

Portfolio.Workspace = Workspace
Portfolio.Presentation = Workspace.Presentation
Portfolio.Bar = Workspace.Bar
Portfolio.meta = Object.freeze({
  applicationName: 'portfolio',
  displayName: 'Portfolio',
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
Portfolio.applets = portfolioApplets
Portfolio.desktopEnvironment = BlrowWorld.desktopEnvironment
