import * as csstips from "csstips";
import { Colors } from "@blueprintjs/core";
import { THEME } from './constants';

type Mixins = { [key in keyof typeof csstips]: any };

export interface Theme {
  unit: number;
  bg: string;
  gray: string;
  border: string;
  mixin: Mixins;
}

const base:Theme = {
  unit: 10,
  bg: Colors.WHITE,
  gray: Colors.LIGHT_GRAY3,
  border: `1px solid ${Colors.GRAY5}`,
  mixin: csstips as Mixins
};

export default {
  [THEME.LIGHT]: base,
  [THEME.DARK]: {
    ...base,
    bg: Colors.DARK_GRAY5,
    gray: Colors.DARK_GRAY3,
    border: `1px solid ${Colors.GRAY1}`
  },
};