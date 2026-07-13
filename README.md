# @brand-identity-brand/os

> A portable React application runtime that separates application ownership from presentation.

Applications own their internal state. Shells and window managers decide where and how
application views appear. A desktop environment and window manager are means of presenting
the runtime, not the mission itself.

The package provides an application registry, window topology and lifecycle, React renderers,
and composable shell primitives so applications can be projected through desktop, mobile, or
embedded interfaces.

The architectural direction and preproduction scaffold are documented in
[The Next Move](./the-next-move.md).

## Development

### React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

! ROTATE the token in npmrc for github to install @brand-identity-brand/os
```javascript
import { OS } from "@brand-identity-brand/os";
import "@brand-identity-brand/os/css";
```

Applications can be hosted through `ApplicationManagerRenderer`. The runtime tracks application
identity and window placement; each application remains responsible for its internal state and
may opt into its own sharing, persistence, or hydration mechanism.
