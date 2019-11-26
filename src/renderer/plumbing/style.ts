import TypeStyleAesthetic, { NativeBlock, ParsedBlock } from "aesthetic-adapter-typestyle";
import { useStylesFactory, withStylesFactory, WithStylesWrappedProps } from "aesthetic-react";
import { TypeStyle } from "typestyle";
import * as csstips from "csstips";
import { FocusStyleManager } from "@blueprintjs/core";

import theme, { Theme } from "./themes";
import { THEME } from "./constants";
const { LIGHT, DARK } = THEME;

const aesthetic = new TypeStyleAesthetic<Theme>(
  new TypeStyle({ autoGenerateTag: true })
);

csstips.setupPage("#app");
csstips.normalize();

aesthetic.registerTheme(LIGHT, theme[LIGHT]);
aesthetic.registerTheme(DARK, theme[DARK]);

FocusStyleManager.onlyShowFocusOnTabs();

export default aesthetic;
export { ThemeProvider } from "aesthetic-react";
export const useStyles = useStylesFactory(aesthetic);
export const withStyles = withStylesFactory(aesthetic);
export type WithStylesProps = WithStylesWrappedProps<Theme, NativeBlock, ParsedBlock>;
