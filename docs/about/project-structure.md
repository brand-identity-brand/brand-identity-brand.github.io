# Personal Site Project Structure

Status: initial architecture for the portfolio workspace

## Purpose

This repository will become the workspace that assembles the personal site. It
will not become the source repository for every project it presents.

The original reusable OS/runtime remains an independent project at
`projects/react-desktop-environment`. The top-level `os/` directory is a
personal-site composition layer: it configures that runtime with the
applications, adapters, stores, shell, and presentation choices used by this
site.

This distinction allows the runtime and the showcased projects to remain
independently versioned and deployable while the personal site composes pinned
versions of them into one experience.

## Target Layout

```text
brand-identity-brand.github.io/
├─ apps/
│  └─ personal-site/
│     ├─ src/
│     ├─ index.html
│     └─ package.json
├─ os/
│  ├─ PersonalOS.jsx
│  ├─ application-registry.js
│  ├─ runtime-config.js
│  ├─ adapters/
│  ├─ stores/
│  └─ package.json
├─ projects/
│  ├─ react-desktop-environment/
│  ├─ unawarehouse/
│  ├─ jetson-pokedex/
│  └─ other-projects/
├─ docs/
│  └─ about/
├─ package.json
└─ pnpm-workspace.yaml
```

The exact filenames may evolve. The ownership boundaries are the important
part of this structure.

## Directory Responsibilities

### `apps/personal-site`

The deployable website. It owns the HTML entry point, site metadata, public
assets, top-level error handling, analytics, and static-host deployment. Its
main responsibility is to mount the configured personal OS.

The site should not import runtime internals or assemble individual project
stores itself.

### `os`

The personal OS configuration for this website. This is not a second runtime
implementation and is not a fork of `react-desktop-environment`.

It owns:

- the set of applications installed on the personal site;
- adapters that translate project exports into hosted applications;
- personal launch metadata and default surfaces;
- site-specific stores and runtime configuration;
- the selected shell and presentation adapter;
- portfolio modes such as read-only data and demo behavior.

Code in this directory may depend on the generic runtime and project demo
exports. Neither the runtime nor the independent projects should depend on
this directory.

### `projects/react-desktop-environment`

The original, reusable React OS/runtime repository. It owns the generic host
protocol, application and surface identity, lifecycle commands, React runtime
adapter, and reusable presentation adapters.

It must remain usable without the personal site. It must not contain the
personal application registry, portfolio data, or assumptions about which
projects are installed.

### Other directories under `projects`

Each directory is an independently maintained project repository, normally
included as a Git submodule. A project keeps its own Git history, deployment,
dependencies, and production entry point.

A project that can be shown inside the personal site should expose a bounded
portfolio or embed entry point. It should not assume that it owns the browser
root, top-level router, service worker, authentication redirect, or global
page styling.

### `docs/about`

Documentation about the workspace, its purpose, and its architectural
boundaries. Implementation-specific runtime documentation belongs in the
runtime repository.

## Dependency Direction

Dependencies flow in one direction:

```text
apps/personal-site
        ↓
os (personal composition and configuration)
        ↓
projects/react-desktop-environment
        ↓
generic React/runtime dependencies
```

The personal `os/` layer may also import the portfolio exports of other
projects:

```text
projects/unawarehouse portfolio export ─┐
projects/jetson-pokedex portfolio export ─┤─→ os/adapters and registry
other project portfolio exports ───────┘
```

An independent project should expose a generic embeddable surface. A
site-specific adapter in `os/adapters` should connect that surface to the OS
host contract. This keeps portfolio wiring out of the original project.

## Application Integration Contract

An embedded project should provide a deliberately bounded entry point rather
than exporting its entire production bootstrap. For example:

```jsx
export function PortfolioDemo({ mode = "portfolio", readOnly = true }) {
  return (
    <ProjectProviders mode={mode}>
      <ProjectApp readOnly={readOnly} />
    </ProjectProviders>
  );
}
```

The personal adapter can then apply host-specific behavior:

```jsx
import { PortfolioDemo } from "@brand-identity-brand/unawarehouse/portfolio";

export default function UnawarehouseApplication({ applicationId, host }) {
  return (
    <PortfolioDemo
      applicationId={applicationId}
      host={host}
      mode="portfolio"
      readOnly
    />
  );
}
```

The final application registry belongs to the personal `os/` layer:

```jsx
import UnawarehouseApplication from "./adapters/UnawarehouseApplication";

export const applicationRegistry = {
  unawarehouse: UnawarehouseApplication,
};
```

The precise host properties will be defined by the public contract of
`react-desktop-environment`. Project adapters should not use raw internal
runtime stores.

## Workspace and Git Model

The repository is a multi-repository workspace rather than a conventional
single-history monorepo.

- The personal-site repository records portfolio composition and submodule
  commit pointers.
- Each project repository records its own source changes.
- Updating a project requires committing in that project first, then updating
  and committing its submodule pointer here.
- The workspace lockfile describes the tested integration of the personal
  site. Individual projects may retain their own lockfiles for independent
  development.

Submodules should initially be pinned to explicit commits. Automated remote
tracking can be introduced later if it does not weaken reproducibility.

## Backend and Demo Data

The personal site is currently hosted as a static GitHub Pages site. It cannot
run an Express proxy or other persistent server process.

Portfolio applications should therefore begin with one of these approaches:

- static fixtures;
- browser-level request mocking;
- read-only public APIs with appropriate CORS configuration;
- separately deployed serverless or backend endpoints.

Production credentials, private data, and production-only authentication
flows must not be embedded in the site build.

## Initial Migration

The first migration should prove one complete integration before every project
is added:

1. Establish the workspace root and package manager configuration.
2. Add `react-desktop-environment` under `projects/` at a pinned commit.
3. Create the personal `os/` composition layer.
4. Move the deployable entry point into `apps/personal-site`.
5. Integrate one project through a portfolio export and an `os/adapters`
   adapter.
6. Verify local development and the static production build.
7. Add the remaining projects after the host contract is proven.

This sequence keeps the current project recoverable while testing the new
structure through a small vertical slice.

## Historical Branch

The branch `retired-20260713` preserves the former `master` state before the
workspace migration. New structure work begins on the
`codex/personal-site-workspace` branch.
