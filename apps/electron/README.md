# Brand Identity Brand — Desktop

An Electron edition of the Brand Identity Brand portfolio, built with React and Vite.

## Development

From the workspace root:

```sh
npm install
npm run dev --workspace=@brand-identity-brand/electron
```

## Production smoke test

```sh
npm run build --workspace=@brand-identity-brand/electron
npm run start --workspace=@brand-identity-brand/electron
```

The production build currently creates the renderer in `dist/`. App packaging and signing should be added once the product name, icon, bundle identifier, and distribution targets are final.

Project descriptions and availability copy live in `src/App.jsx`, ready to be replaced with final portfolio content before release.
