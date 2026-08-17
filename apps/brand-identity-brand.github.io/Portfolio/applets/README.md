# Child Applets

Place this Applet's direct child Applet definitions in this directory.

Register each direct child on the parent definition:

```js
Applet.applets = Object.freeze({
  child: ChildApplet,
})
```

Each child may follow the same Applet directory structure recursively.
