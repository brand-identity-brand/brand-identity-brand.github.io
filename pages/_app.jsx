import "@/styles/globals.css";
import '@/node_modules/react-desktop-environment/dist/style.css';

import { DesktopEnvironmentContextProvider as DesktopEnvironmentProvider } from "react-desktop-environment";
export default function App({ Component, pageProps }) {
  return(
    <DesktopEnvironmentProvider>
      <Component {...pageProps} />
    </DesktopEnvironmentProvider>
  );
}
