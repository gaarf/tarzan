import React from "react";
import { useGlobalStore, THEME } from "../../plumbing";
import { Switch } from "@blueprintjs/core";

const ThemeSwitch: React.FC = () => {
  const { DARK, LIGHT } = THEME;
  const [currentTheme, dispatch] = useGlobalStore(s => s.prefs.theme);

  return (
    <Switch
      innerLabelChecked="dark"
      innerLabel="light"
      checked={currentTheme === DARK}
      onChange={event =>
        dispatch("SET_PREFS", { theme: event.currentTarget.checked ? DARK : LIGHT })
      }
    />
  );
};

export default ThemeSwitch;
