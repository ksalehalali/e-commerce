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
