import { Preferences } from "../../main/types";

export type ActionType =
  | "GOTO_VIEW"
  | "SET_PREFS";

export enum VIEW {
  SPLASH,
  WELCOME,
  WINDOWING
}

export enum THEME {
  LIGHT = "default",
  DARK = "dark"
}

export interface State {
  prefs: Partial<Preferences> & { theme: THEME };
  view: VIEW;
}
