import "@/styles/globals.css";
import "react-desktop-environment/style";

import DesktopEnvironmentContextWithWindowManagerRegistryProvider, { useWindowManagerRegistryContext } from "react-desktop-environment";
const Div = () => <div>DIV</div>
const components = {
  Div
}

export default function App({ Component, pageProps }) {

  return(
    <DesktopEnvironmentContextWithWindowManagerRegistryProvider components={components}>
      <Main Component={Component} {...pageProps}/>
    </DesktopEnvironmentContextWithWindowManagerRegistryProvider>
  );
}

function Main({ Component, pageProps }){

  const { initWindow } = useWindowManagerRegistryContext();
  initWindow('/index');

  return (
    <Component {...pageProps}/>
  )
}
