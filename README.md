# Personal Site Workspace

This repository composes the personal site from independently maintained
projects.

- `apps/brand-identity-brand.github.io` is the deployable website.
- `apps/electron` is the native desktop edition of the portfolio.
- `packages/os` configures the personal site's applications, runtime, and
  presentation.
- `projects` contains independently versioned repositories as Git submodules.
- `docs/archived` preserves the architecture documents that led to this
  workspace structure.

The reusable OS/runtime will live in
`projects/react-desktop-environment`. The `packages/os` workspace is only the
personal-site configuration layer; it is not another runtime implementation.

The former repository state is preserved on the `retired-20260713` branch.

## Status

This branch currently contains the workspace scaffold. Project submodules and
application implementation will be added deliberately, beginning with
`react-desktop-environment`.
