import "@/styles/globals.css";
// import WindowManagerContextProvider from "@unaware.house/desktop";
export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
  // <WindowManagerContextProvider>
  <Component {...pageProps} />;
  // </WindowManagerContextProvider>;
}
