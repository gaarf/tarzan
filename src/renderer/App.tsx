import React, { useEffect } from "react";
import { ipcRenderer } from "electron";
import { useGlobalStore, THEME } from "./plumbing";
import aesthetic, { ThemeProvider } from "./plumbing/style";
import Layout from "./components/Layout";

import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";

const App: React.FC = () => {
  const [currentTheme] = useGlobalStore(s => s.prefs.theme);
  useEffect(() => {
    ipcRenderer.send("app-init");
    window.addEventListener('unload', () => ipcRenderer.send("app-unload"))
  }, []);

  return (
    <ThemeProvider aesthetic={aesthetic} name={currentTheme}>
      <Layout dark={currentTheme === THEME.DARK} />
    </ThemeProvider>
  );
};

export default App;
