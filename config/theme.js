// import { useState, useEffect } from "react";
import { ThemeProvider } from "styled-components";
// import { getTheme } from "../helpers/theme";

export const NAVS_VARS = {
  NAVS__PADDING: "20px 15px",
  NAV_HEIGHT: 86,
};

export const COLORS = {
  PRIMARY: "#1dd3d5",
  GRAY: "#ccc",
  ALPHA_PRIMARY: "#1dd3d51f",

  BG_COLOR_GRAY: "#F5F6F8",

  TEXT_PRIMARY: "#515C6F",
  TITLE: "#292D32",
  GREEN: "#51DA71",
};

export const PADDINGS = {
  navbar_y: 10,
  categories_item_x_y: 10,
};

export const POSITIONS = {
  MAIN_TOP: `${parseInt(PADDINGS.navbar_y) * 2 + NAVS_VARS.NAV_HEIGHT}px`,
  MOBILE_MAIN_TOP: `165px`,
};

export const STACKS_INDEX = {
  NAVBAR: 100,
  MAIN_BODY: 10,
};

export const STANDARD_SCREENS = {
  phones: {
    width: 768,
    desc: "<768px",
  },
  tablets: {
    width: 991,
    desc: ">=768px & <992px",
  },
  smallLaptops: {
    width: 1199,
    desc: ">=992px & <1200px",
  },
  largeScreens: {
    // width: 3200,
    desc: ">=1200px",
  },
};

const lightTheme = {
  colors: {
    primary: COLORS.primary,
    gray: COLORS.GRAY,
    textPrimary: COLORS.TEXT_PRIMARY,
    title: COLORS.TITLE,
    grenn: COLORS.GREEN,
    bgGray: COLORS.BG_COLOR_GRAY,
  },
  alphaColors: {
    primary: COLORS.ALPHA_PRIMARY,
    secondary: "#416d64045",
    danger: "#f74538",
    success: "#008000045",
    default: "#000",
  },
  paddings: {
    navbar_y: PADDINGS.navbar_y,
    categories_item_x_y: PADDINGS.categories_item_x_y,
  },
  positions: {
    main_top: POSITIONS.MAIN_TOP,
    mobile_main_top: POSITIONS.MOBILE_MAIN_TOP,
  },
  stacks: {
    navbar: STACKS_INDEX.NAVBAR,
    main_body: STACKS_INDEX.MAIN_BODY,
  },
};

const Theme = ({ children }) => {
  //   const [theme, setTheme] = useState();
  //   useEffect(() => {
  //     const __theme = getTheme();
  //     if (__theme) setTheme(__theme);
  //     else setTheme(process.env.NEXT_PUBLIC_SITE_THEME_DEFAULT); //default theme
  //   }, []);

  return <ThemeProvider theme={lightTheme}>{children}</ThemeProvider>;
};

export default Theme;
