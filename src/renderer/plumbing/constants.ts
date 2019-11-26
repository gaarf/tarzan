import { Preferences, TarzanTaxonomy } from "../../main/types";

export type ActionType =
  | "GOTO_VIEW"
  | "SET_MODEL"
  | "SET_PREFS";

export enum VIEW {
  SPLASH,
  WELCOME,
  EDITOR
}

export enum THEME {
  LIGHT = "default",
  DARK = "dark"
}

export interface State {
  prefs: Partial<Preferences> & { theme: THEME };
  model?: TarzanTaxonomy;
  view: VIEW;
}
