# Portfolio Applet Architecture

Status: target architecture for the personal portfolio

## Purpose

This project is an Applet that hosts other Applets, which may host Applets of
their own. The result is one recursive Applet tree rather than a collection of
unrelated applications mounted beside each other.

`Portfolio` is the outer Host Applet. It owns the portfolio-level Workspace,
selects the active project Applet, and raises every hosted definition into one
root `AppletEngine`.

## Applet layers

The layer number describes ownership depth in the Applet tree. It does not
create a separate runtime or engine at each level.

```text
Layer 0  Portfolio
         ├── Layer 1  unaware.house
         │            └── Layer 2  unaware.house Applets
         ├── Layer 1  blrow.world
         │            └── Layer 2  blrow.world Applets
         ├── Layer 1  Inheritance Card Game
         │            └── Layer 2  Inheritance Card Game Applets
         └── Layer 1  Worldex
                      └── Layer 2  Worldex Applets
```

### Layer 0: Portfolio

`Portfolio` is the Applet rendered by the Vite entry point. It is the
portfolio-level Host and owns:

- the Layer 1 Applet registry;
- the active Layer 1 selection;
- the Portfolio Workspace presentation;
- the stack of Layer 1 Workspace bars;
- the root `AppletEngine` relationship;
- the shared desktop environment inherited by descendants.

The browser entry renders only:

```jsx
<Portfolio />
```

### Layer 1: project Applets

Layer 1 contains the independently meaningful projects presented by the
Portfolio:

| Applet | Project source |
| --- | --- |
| `Unawarehouse` | `projects/unaware.house` |
| `BlrowWorld` | `projects/blrow.world` |
| `InheritanceCardGame` | `projects/Legacy-boardgame` |
| `Worldex` | `projects/Worldex` |

Each Layer 1 item is an Applet definition, not a production application
bootstrap. A wrapper may adapt the project's reusable presentation to the
Portfolio contract while the project remains independently versioned and
deployable.

A Layer 1 Applet may also be a Host Applet. When hosted by Portfolio, it does
not create a competing root engine. It contributes its own definition and its
direct child definitions to the engine inherited from Portfolio.

### Layer 2: project-owned Applets

Layer 2 contains the Applets owned by each Layer 1 project. These definitions
remain inside the Layer 1 Applet's `applets` registry.

For example:

```jsx
Unawarehouse.applets = Object.freeze({
  unaware: Unaware,
  clipboard: Clipboard,
})
```

Portfolio does not flatten these children into its own source-level registry.
The owning Layer 1 Applet raises them through its definition, and
`AppletEngine` recursively collects the complete tree.

## Definition raising

Every Applet publishes a stable definition:

```text
Applet
├── meta
│   ├── applicationName
│   ├── displayName
│   ├── colour
│   └── icon
├── applets
├── desktopEnvironment
├── Workspace
├── Presentation
└── Bar
```

The root relationship is conceptually:

```jsx
<AppletEngine applet={Portfolio}>
  <Portfolio />
</AppletEngine>
```

Collection proceeds recursively:

```text
Portfolio.applets
  → each Layer 1 Applet
    → each Layer 1 Applet's `applets`
      → each Layer 2 Applet
```

Raising a definition means contributing it to this recursive registry. It
does not mean mounting another independent `AppletEngine`. A Layer 1 Applet may
own an engine when run by itself, but it inherits the existing engine when it
is hosted by Portfolio.

## Workspace contract

Every hosted Applet follows the compound Workspace convention:

```jsx
<Workspace>
  <Workspace.Presentation>
    <ActiveApplet />
  </Workspace.Presentation>
  <Workspace.Bar />
</Workspace>
```

The Applet exposes those parts so its Host can compose them without reaching
into private component files:

```js
Applet.Workspace
Applet.Presentation
Applet.Bar
```

Portfolio uses this contract to present one active Layer 1 Applet and to
compose the Workspace bars for all Layer 1 Applets.

The active Workspace occupies the available presentation height. Selecting
its left bar button expands the bar stack, reducing presentation height by 38
pixels for each additional visible bar. The active bar stays first. Selecting
another bar promotes that Applet to the active fullscreen treatment and hides
the remaining bars until the active button is selected again.

## Ownership rules

1. Portfolio owns Layer 1 selection and composition.
2. Each Layer 1 Applet owns its Layer 2 definitions.
3. Each Applet publishes metadata, Workspace contributions, children, and a
   default desktop environment.
4. Hosted descendants inherit the outer environment and engine.
5. Only the outermost running Host owns the root engine.
6. A project wrapper imports a bounded reusable presentation, not the
   project's browser bootstrap or server entry point.
7. Project source remains in its Git submodule; Portfolio owns only the
   integration wrapper and the pinned submodule commit.

## Repository mapping

```text
apps/brand-identity-brand.github.io/
└── Portfolio/
    ├── Portfolio.jsx
    ├── components/
    │   └── Workspace.jsx
    └── applets/
        ├── Unawarehouse/
        ├── BlrowWorld/
        ├── InheritanceCardGame/
        └── Worldex/

projects/
├── unaware.house/
├── blrow.world/
├── Legacy-boardgame/
├── Worldex/
└── react-desktop-environment/
```

The Applet wrappers under `Portfolio/applets` define the Host-facing contract.
The repositories under `projects` remain the independently maintained source
projects.
