# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

! ROTATE the token in npmrc for github to install @brand-identity-brand/os
``` javascript 
import { OS } from "@brand-identity-brand/os";
// * in vite.config.js -> optimizeDeps: { include: ['@brand-identity-brand/os/os.css'] }
// * this allows vite to resolve this import path. 
import "@brand-identity-brand/os/os.css";
```


all Components can be rendered with ApplicationRenderer.
if thats the casem the component will gain the ability to share its states globally. hydrating states via props, then the internal of the apps can decide if the state should be synced