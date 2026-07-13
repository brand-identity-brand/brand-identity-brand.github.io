# Post-Engineering Design Discussion

## Has This Kind of UI Composition Been Proposed Before?

Yes. Several systems have proposed important parts of this architecture, but there does not appear to be a mainstream React implementation that combines all of them in the same way.

This is not a claim that every mechanism in `@brand-identity-brand/os` is unprecedented. In fact, most of the mechanisms have respected precedents. That is reassuring: the project appears to be independently combining ideas that have proved valuable in routers, UI databases, scene frameworks, window systems, and operating-system compositors.

The closest architectural family tree is:

| Idea in this runtime | Closest precedent |
|---|---|
| Runtime relationships stored as normalized records | Fulcro and Om Next |
| A parent chooses where its immediate children appear | React Router's `Outlet` |
| Application identity is separate from presentation instances | SwiftUI and UIKit scenes |
| Generic surfaces are composed by a host | Wayland |
| A distributed parent-child view graph | Fuchsia Flatland |
| Window systems can recursively host window systems | Plan 9 rio and 8½ |

## Fuchsia Flatland: The Closest Structural Relative

Fuchsia's Flatland may be the closest overall structural match.

Flatland allows each client to author a scene graph independently. Separate graphs are connected through parent-child View and Viewport relationships, and the system compositor joins them into one global scene graph.

The parent controls how a child's View is integrated into its Viewport. The total graph is both hierarchical and distributed across processes. This closely resembles the intentional child-surface outlet in this runtime, although Flatland implements the idea at the operating-system compositor level rather than inside React.

The conceptual mapping is:

| Fuchsia Flatland | This React runtime |
|---|---|
| Client-authored graph | Application-owned view |
| View | Surface |
| Viewport | `SurfaceOutlet` |
| Scenic compositor | Presentation adapter |
| United scene graph | Rendered runtime |

The important difference is that this runtime also models application identity and can potentially change presentation semantics. A surface might become a desktop window, mobile route, sheet, panel, or embedded view instead of always being a graphical compositor surface.

References:

- [Fuchsia UI composition and Flatland protocol](https://fuchsia.dev/reference/fidl/fuchsia.ui.composition)
- [Fuchsia View System](https://fuchsia.dev/fuchsia-src/concepts/ui/scenic/views)
- [Flatland design overview](https://fuchsia.googlesource.com/fuchsia/+/HEAD/docs/concepts/ui/scenic/flatland/index.md)

## SwiftUI and UIKit Scenes: Applications Separate from Presentation Instances

Apple's Scene abstraction is close to the mission of this runtime.

A SwiftUI Scene represents a part of an application's interface. The system decides how to present it according to the platform and context. A scene might occupy a window, a tab, part of a display, or an entire display. Multiple scene instances can be created from one declaration.

UIKit similarly gives each scene session a persistent identifier and lifecycle separate from the overall application.

The conceptual structure is:

| Apple scene model | This React runtime |
|---|---|
| Application | Application instance |
| Scene declaration | Application or surface definition |
| Scene session | Surface instance |
| Platform presentation | Presentation adapter |

The difference is scope. SwiftUI scenes remain within one Apple application and Apple's presentation system. This runtime is intended to compose several registered applications and to make the presentation adapter itself replaceable.

References:

- [SwiftUI Scenes](https://developer.apple.com/documentation/swiftui/scenes)
- [SwiftUI Scene protocol](https://developer.apple.com/documentation/swiftui/scene)
- [SwiftUI WindowGroup](https://developer.apple.com/documentation/swiftui/windowgroup)
- [UIKit UISceneSession](https://developer.apple.com/documentation/uikit/uiscenesession)

## React Router Outlet: Intentional Immediate-Child Projection

The immediate-child renderer has a direct React precedent in React Router's `Outlet`.

A parent route owns its layout and chooses the exact location where the router inserts the matching child route. The router owns the active relationship, but the parent component owns the projection point.

The correspondence is:

| React Router | This React runtime |
|---|---|
| Parent route | Parent surface |
| Parent component | Hosted application component |
| `Outlet` | `SurfaceOutlet` |
| Child route | Child surface |

This runtime generalizes the outlet from URL navigation to application composition. The projected child can be interpreted as a desktop window, mobile route, sheet, embedded application, or nested shell depending on the active presentation adapter.

References:

- [React Router Outlet](https://reactrouter.com/api/components/Outlet)
- [React Router nested routes and outlets](https://reactrouter.com/tutorials/address-book#nested-routes-and-outlets)

## Fulcro and Om Next: The UI as a Projection of Relational Data

Fulcro is the closest precedent for the relational-database interpretation.

Fulcro stores entities in a normalized client database. It combines component queries with that database to produce the tree of data passed into the rendered UI. The component tree is therefore a projection of normalized information rather than the only place where application structure exists.

The similarity is architectural rather than identical:

- Fulcro commonly normalizes application domain data.
- This runtime normalizes application identities and presentation relationships.
- Applications in this runtime continue to own their internal domain state.

That narrower runtime database is important. It allows the runtime to answer questions about identity, surfaces, parents, workspaces, visibility, and ordering without interpreting the application's actual state.

References:

- [Fulcro Developer Guide](https://book.fulcrologic.com/)
- [Minimal Fulcro tutorial and normalized client database](https://fulcro-community.github.io/guides/tutorial-minimalist-fulcro/)

## Wayland: Clients, Surfaces, and Composition

Wayland separates application content from system presentation through surfaces.

Clients create and commit content to `wl_surface` objects. The compositor combines those surfaces into displayable output and controls their presentation. A surface has identity and content but requires a role before the compositor knows how it should be presented.

Wayland also supports arbitrarily nested subsurface trees. Parent relationships influence placement, ordering, visibility, and synchronized updates. This is close to the surface graph in this runtime.

The difference is abstraction level. Wayland operates on graphical buffers, input, outputs, and compositor protocols. It does not provide the higher-level application registry, React host protocol, or replaceable desktop/mobile/embedded presentation semantics proposed here.

References:

- [Wayland protocol specification](https://wayland.freedesktop.org/docs/html/apa.html)
- [Wayland protocol and model of operation](https://wayland.freedesktop.org/docs/book/Protocol.html)

## Plan 9 rio and 8½: Recursive and Symmetric Window Systems

Plan 9's 8½ and rio window systems are close philosophical ancestors.

The window system exposes the same interface that it consumes. This allows a window system to run inside one of its own windows and makes local, remote, and nested window systems structurally similar. Rob Pike described 8½ as fundamentally a multiplexer with a deliberately symmetric architecture.

That symmetry resembles the recursive host relationship in this runtime:

1. The runtime hosts an application.
2. The application intentionally provides an outlet.
3. The same runtime protocol hosts child applications through that outlet.

The application can therefore participate in hosting without becoming the global window manager. This is one of the strongest and most unusual ideas in the project.

References:

- [8½, the Plan 9 Window System](https://9p.io/sys/doc/8%C2%BD/8%C2%BD.html)
- [Plan 9 overview](https://9p.io/plan9/about.html)
- [Plan 9 rio manual](https://9p.io/magic/man2html/1/rio)

## What Appears Distinctive About This Project

The individual mechanisms are not unprecedented. What appears distinctive is their synthesis inside a reusable React component package:

1. A normalized application-and-surface graph.
2. Application-owned domain state.
3. Replaceable presentation adapters.
4. Parent-selected immediate-child outlets.
5. Separate application and surface identities.
6. Recursive application hosting.
7. A host protocol that influences applications without exposing runtime internals.
8. The ability to interpret one application model through desktop, mobile, embedded, or nested presentation systems.

Most related systems stop at one layer:

- routers compose screens;
- window managers compose surfaces;
- micro-frontends compose applications;
- normalized UI frameworks compose data;
- scene frameworks adapt one application across platform presentations;
- system compositors combine graphical view trees.

This project attempts to make those concerns part of one coherent application runtime while keeping application state outside the runtime itself.

## A Useful Description

The project sits conceptually between a router and a compositor.

> `@brand-identity-brand/os` is a relational application-surface runtime for recursively composing React applications across replaceable presentation environments.

Another concise description is:

> The runtime owns application identity and presentation relationships. Applications own their state. Presentation adapters decide how surfaces appear, and applications decide where immediate child surfaces are projected.

The architecture should not be presented as a claim that every underlying idea is new. Its value is the way those ideas are combined, the boundary it draws around application state, and its attempt to turn the combination into a reusable React application runtime.

