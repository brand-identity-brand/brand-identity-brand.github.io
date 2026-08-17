# Portability

Portability is when a project's outward-facing abstraction is clean.

## How I Evalutate

Host my application in my portfolio(web, electron), standalone(web, electron).

## How to Achieve

Seperate data from presentation.

```text
Application
├─ domain logic and state
├─ reusable interface
└─ public host contract
      ↓
Web adapter | Electron adapter | Production adapter
```

The same application can then be composed differently in each environment:

- The portfolio web client host bounded, safe, read-only demos. application do not update database.
- The portfolio electron client host bounded, safe, read-only demos. application do not update database.
- The standalone production deployments(currently web) supply real routing, authentication, services, data, and infrastructure.

The complete seperation of presentation vs data allow my applications to be implemented everywhere javascript runs.