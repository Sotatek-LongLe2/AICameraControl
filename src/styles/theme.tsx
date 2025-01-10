import { Interpolation } from "@emotion/react";
import {
  extendTheme,
  optionClasses,
  tabClasses,
  Theme,
  tooltipClasses,
} from "@mui/joy";
import { RiArrowDownSLine, RiCheckLine } from "@remixicon/react";
import { SITE_USER } from "src/constants/env";
import hexToRGBA, { hexToRGBAValue } from "src/helpers/hexToRGB";
import { colors } from "./colors";
import { datePickerStyles } from "./datepicker";
import { LinkBehaviorReactRouter } from "./link";
import { phoneNumberStyles } from "./phoneNumber";
import { shadow } from "./shadow";
import { toastStyles } from "./toast";

export const globalStyles: Interpolation<Theme> = {
  ":root": {
    "--variant-outlinedDisabledBorder": colors["divider"],
    "--variant-outlinedDisabledColor": colors["text-disabled"],
    "-webkit-tap-highlight-color": "rgba(255, 255, 255, 0)",
  },
  html: {},
  body: {
    color: colors["text-primary"],
    fontWeight: "400",
    fontSize: "15px",
    lineHeight: "22px",
  },
  ...toastStyles,
  ...datePickerStyles,
  ...phoneNumberStyles,
};

export const CONTAINER_SIZE = {
  pc: 1260,
  laptop: 1140,
};

// https://mui.com/joy-ui/customization/default-theme-viewer/
const theme = extendTheme({
  fontFamily: {
    display: '"Inter", sans-serif, var(--joy-fontFamily-fallback)',
    body: '"Inter", sans-serif, var(--joy-fontFamily-fallback)',
  },
  spacing: (factor: number) => `${factor}px`,
  // zIndex: zIndex,
  // https://chat.google.com/room/AAAAF1DlnCw/fXD5mEu-d00/fXD5mEu-d00?cls=10
  breakpoints: {
    values: {
      mobile: 0, //  (390px)
      laptop: 900, // (1,140px)
      pc: 1300, // (1,260px)
    },
  },
  variants: {
    solid: {
      "error-main": {
        backgroundColor: colors["error-main"],
      },
    },
  },
  // color custom
  color: colors,
  // colorSchemes: https://mui.com/joy-ui/customization/theme-builder/
  colorSchemes: {
    light: {
      palette: {},
    },
    dark: {
      palette: {
        primary: {
          "500": colors["primary-main"],
          "600": colors["astra-main"],
          mainChannel: hexToRGBAValue(colors["primary-main"]),
          // menu admin
          // plainActiveBg: colors["primary-main"],
          // input border
          outlinedBorder: hexToRGBAValue(colors["input-border"]),
          // #region Button
          solidDisabledBg: colors["primary-main"],
          solidDisabledColor: colors["text-primary"],
          // #endregion
        },
        background: {
          body: "#111113",
        },
        neutral: {
          "500": colors.paper,
          // select border
          outlinedBorder: colors["input-border"],
        },
        text: {
          primary: colors["text-primary"],
          secondary: colors["text-secondary"],
        },
        danger: {
          "800": colors["astra-pink"],
          mainChannel: hexToRGBAValue(colors["error-main"]),
        },
      },
    },
  },
  shadow,
  radius: {
    md: "6px",
    lg: "8px",
    sm: "4px",
  },
  lineHeight: {
    md: "26px",
  },
  typography: {
    h1: {
      fontFamily: "Jost",
      fontWeight: "500",
      fontSize: "46px",
      lineHeight: "68px",
    },
    h3: {
      fontFamily: "Jost",
      fontWeight: "500",
      fontSize: "28px",
      lineHeight: "42px",
    },
    h4: {
      fontFamily: "Jost",
      fontWeight: "500",
      fontSize: "24px",
      lineHeight: "38px",
    },
    h5: {
      fontFamily: "Jost",
      fontWeight: "500",
      fontSize: "18px",
      lineHeight: "28px",
    },
    h6: {
      fontFamily: "Jost",
      fontWeight: "600",
      fontSize: "20px",
      lineHeight: "24px",
    },

    body1: {
      fontWeight: "400",
      fontSize: "15px",
      lineHeight: "22px",
    },
    ["body1-500"]: {
      fontWeight: "500",
      fontSize: "15px",
      lineHeight: "22px",
    },

    body2: {
      fontWeight: "400",
      fontSize: "13px",
      lineHeight: "20px",
    },
    ["body2-500"]: {
      fontWeight: "500",
      fontSize: "13px",
      lineHeight: "20px",
    },

    subtitle2: {
      fontWeight: "400",
      fontSize: "13px",
      lineHeight: "20px",
    },

    "alert-title": {
      fontWeight: "500",
      fontSize: "15px",
      lineHeight: "24px",
    },
    caption: {
      fontWeight: "400",
      fontSize: "13px",
      lineHeight: "18px",
    },
    "input-label": {
      fontWeight: "400",
      fontSize: "13px",
      lineHeight: "15px",
    },
    "btn-medium": {
      font: "Jost",
      fontWeight: "500",
      fontSize: "15px",
      lineHeight: "22px",
    },
    "btn-large": {
      font: "Jost",
      fontWeight: "500",
      fontSize: "17px",
      lineHeight: "26px",
    },
    "input-text-small": {
      fontWeight: 400,
      fontSize: "13px",
      lineHeight: "22px",
    },
    "input-text": {
      fontWeight: 400,
      fontSize: "15px",
      lineHeight: "24px",
    },
    "input-text-large": {
      fontWeight: 400,
      fontSize: "17px",
      lineHeight: "24px",
    },
  },
  components: {
    JoyScopedCssBaseline: {
      defaultProps: {},
      styleOverrides: {},
    },
    JoyContainer: {
      defaultProps: {
        maxWidth: "pc",
      },
      styleOverrides: {
        root: {
          paddingLeft: "0",
          paddingRight: "0",

          ...(SITE_USER
            ? {
                "@media (max-width: 900px)": {
                  maxWidth: "600px",
                },

                "@media (min-width: 900px)": {
                  maxWidth: CONTAINER_SIZE.laptop,
                },
                "@media (min-width: 1300px)": {
                  maxWidth: CONTAINER_SIZE.pc,
                },
              }
            : {
                "@media (min-width: 0px)": {
                  width: CONTAINER_SIZE.laptop,
                },
                "@media (min-width: 1200px)": {
                  width: "unset",
                },
              }),
        },
      },
    },
    JoyTypography: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          "--Typography-gap": "8px",

          ...(ownerState.variant === "text-ellipsis" && {
            color: colors["text-primary"],
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            padding: 0,
            margin: 0,
          }),
          ...(ownerState.color === "text-primary" && {
            color: colors["text-primary"],
          }),
          ...(ownerState.color === "text-secondary" && {
            color: colors["text-secondary"],
          }),
          ...(ownerState.color === "primary-main" && {
            color: colors["primary-main"],
          }),
        }),
      },
    },
    JoyLink: {
      defaultProps: {
        component: LinkBehaviorReactRouter,
        underline: "none",
      },
      styleOverrides: {},
    },
    JoyButton: {
      defaultProps: {
        size: "lg",
      },
      styleOverrides: {
        root: ({ ownerState }) => ({
          "--Button-gap": "7px",
          "--Button-minHeight": "none",

          // Default
          fontFamily: "Jost",
          fontWeight: "500",
          padding: "8px 22px",

          // ----------------Variant: solid----------------
          ...(ownerState.variant === "solid" && {
            boxShadow: shadow.xs,

            // Color
            ...(ownerState.color === "astra-pink" && {
              borderColor: colors["astra-pink"],
              backgroundColor: colors["astra-pink"],

              "&:disabled": {
                color: colors["text-primary"],
                borderColor: colors["astra-pink"],
                backgroundColor: colors["astra-pink"],
                opacity: 0.45,
              },
              ":hover:not(:disabled)": {
                backgroundColor: hexToRGBA(colors["astra-pink"], 0.8),
              },
            }),
            ...(ownerState.color === "error-main" && {
              borderColor: colors["error-main"],
              backgroundColor: colors["error-main"],

              ":hover:not(:disabled)": {
                backgroundColor: hexToRGBA(colors["error-main"], 0.8),
              },
            }),
          }),
          ...(ownerState.variant === "soft" && {
            color: colors["primary-main"],
            backgroundColor: colors["primary-opacity-light"],
          }),
          // ----------------Variant: outlined----------------
          ...(ownerState.variant === "outlined" && {
            color: colors["primary-main"],
            border: `1px solid ${colors["primary-main"]}`,
            padding: "7px 21px",

            ":hover:not(:disabled)": {
              backgroundColor: hexToRGBA(colors["primary-main"], 0.08),
            },

            // Color
            ...(ownerState.color === "error-main" && {
              color: colors["error-main"],
              borderColor: colors["error-main"],

              ":hover:not(:disabled)": {
                backgroundColor: hexToRGBA(colors["error-main"], 0.08),
              },
            }),
            ...(ownerState.color === "astra-pink" && {
              color: colors["astra-pink"],
              borderColor: colors["astra-pink"],

              ":hover:not(:disabled)": {
                backgroundColor: hexToRGBA(colors["astra-pink"], 0.08),
              },
            }),
          }),

          ...(ownerState.color === "secondary-main" && {
            color: colors["text-primary"],
            backgroundColor: colors["secondary-main"],

            ":hover:not(:disabled)": {
              backgroundColor: hexToRGBA(colors["secondary-main"], 0.9),
            },
          }),

          // Size
          ...(ownerState.size === "lg" && {
            borderRadius: "var(--joy-radius-lg)",
            lineHeight: "26px",
            fontSize: "17px",
          }),
          ...(ownerState.size === "md" && {
            borderRadius: "var(--joy-radius-md)",
            lineHeight: "22px",
            fontSize: "15px",
            padding: "7px 17px",
          }),
          ...(ownerState.size === "sm" && {
            borderRadius: "var(--joy-radius-sm)",
            lineHeight: "18px",
            fontSize: "13px",
          }),

          // State
          ":disabled": {
            opacity: 0.45,
          },
        }),

        startDecorator: ({ ownerState }) => ({
          width: ownerState.size === "md" ? "16px" : "20px",
        }),
        endDecorator: ({ ownerState }) => ({
          width: ownerState.size === "md" ? "16px" : "20px",
        }),
      },
    },
    JoyInput: {
      defaultProps: {
        variant: "outlined",
        size: "md",
      },
      styleOverrides: {
        root: ({ ownerState }) => ({
          "--Input-radius": "var(--joy-radius-md)",
          "--Input-decoratorColor": colors["text-primary"],
          fontFamily: '"Inter", sans-serif, var(--joy-fontFamily-fallback)',
          fontSize: "15px",
          fontWeight: "400",

          backgroundColor: "transparent",
          color: colors["text-primary"],
          border: `1px solid ${colors["input-border"]}`,

          "input::placeholder": {
            color: colors["text-disabled"],
          },

          ...(ownerState.size === "md" && {
            padding: "8px 15px",
            lineHeight: "24px",
          }),

          ...(ownerState.size === "lg" && {
            padding: "11px 15px",
            lineHeight: "24px",
          }),
        }),
        startDecorator: {
          maxWidth: "20px",
          whiteSpace: "break-spaces",
        },
        endDecorator: {
          maxWidth: "20px",
          whiteSpace: "break-spaces",
        },
      },
    },
    JoyTextarea: {
      styleOverrides: {
        root: {
          backgroundColor: "transparent",
        },
      },
    },
    JoyCheckbox: {
      defaultProps: {
        size: "md",
        checkedIcon: <RiCheckLine />,
      },
      styleOverrides: {
        root: ({ ownerState }) => ({
          "--Checkbox-gap": "9px",
          minHeight: "36px",
          alignItems: "center",

          // Size
          ...(ownerState.size === "md" && {
            fontWeight: "500",
            fontSize: "15px",
          }),

          // State
          ...(ownerState.checked && {
            color: colors["primary-main"],

            svg: {
              width: "12px",
              height: "12px",
              fill: colors["body-bg"],
            },
          }),
        }),
        action: () => ({
          left: 0,
          right: 0,
          bottom: 0,
          top: 0,
        }),
      },
    },
    JoyRadio: {
      defaultProps: {
        variant: "solid",
        size: "md",
      },
      styleOverrides: {
        root: ({ ownerState }) => ({
          "--Radio-borderWidth": "2px",
          alignItems: "center",

          ...(ownerState.variant === "solid" && {}),
        }),
        input: {
          fontFamily: '"Inter", sans-serif, var(--joy-fontFamily-fallback)',
          fontSize: "15px",
          fontWeight: "400",
        },
        radio: ({ ownerState }) => ({
          boxShadow: shadow.xs,
          borderStyle: "solid",
          borderColor: colors["text-secondary"],

          ...(ownerState.checked && {
            borderColor: colors["primary-main"],

            ":hover": {
              borderStyle: "none",
            },
          }),
        }),
        label: ({ ownerState }) => ({
          fontSize: "15px",
          fontWeight: "500",
          lineHeight: "22px",

          ...(ownerState.checked && {
            color: colors["primary-main"],
          }),
        }),
      },
    },
    JoySwitch: {
      defaultProps: {},
      styleOverrides: {
        root: () => ({
          "--Switch-trackBackground": colors["action-focus"],
        }),
      },
    },
    JoySelect: {
      defaultProps: {
        indicator: <RiArrowDownSLine />,
        size: "md",
      },
      styleOverrides: {
        root: ({ ownerState }) => ({
          fontFamily: '"Inter", sans-serif, var(--joy-fontFamily-fallback)',
          fontSize: "15px",
          fontWeight: "400",
          borderRadius: "var(--joy-radius-md)",

          backgroundColor: "transparent",
          color: colors["text-primary"],
          border: `1px solid ${colors["input-border"]}`,

          "input::placeholder": {
            color: colors["text-disabled"],
          },

          ...(ownerState.size === "md" && {
            padding: "8px 15px",
            lineHeight: "24px",
          }),

          ...(ownerState.size === "lg" && {
            padding: "11px 15px",
            lineHeight: "24px",
          }),
        }),
      },
    },
    JoyCard: {
      defaultProps: {
        variant: "solid",
      },
      styleOverrides: {
        root: ({ ownerState }) => ({
          "--Card-padding": 0,
          gap: 0,
          boxShadow: shadow.md,

          ...(ownerState.variant === "solid" && {}),
        }),
      },
    },
    JoyCardContent: {
      styleOverrides: {
        root: {
          padding: "20px",
        },
      },
    },
    JoySheet: {
      defaultProps: {},
      styleOverrides: {
        root: {
          backgroundColor: "unset",
          // backgroundColor: "#1F1F1F",
          // borderRadius: "6px",
        },
      },
    },
    JoyAvatar: {
      defaultProps: {
        size: "sm",
      },
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.size === "sm" && {
            width: 38,
            height: 38,
          }),
        }),
      },
    },
    JoyTable: {
      styleOverrides: {
        root: {
          "--Table-headerUnderlineThickness": "1px",
          "--TableCell-headBackground": "#2C2C2C",
          "--TableCell-paddingX": "12px",
          "--TableCell-borderColor": colors.divider,
          lineHeight: "24px",

          th: {
            "--TableCell-paddingY": "16px",
            color: "#fff",
            fontWeight: "500",
            textTransform: "uppercase",
          },

          td: {
            height: "50px",
          },
        },
      },
    },
    JoyTab: {
      styleOverrides: {
        root: (theme) => ({
          fontFamily: "Jost",
          color: colors["text-primary"],
          fontSize: "17px",
          lineHeight: "26px",
          fontWeight: 500,

          ...(theme.ownerState.variant === "btn-medium" && {
            fontSize: "15px",
            lineHeight: "22px",
          }),

          [`&.${tabClasses.selected}`]: {
            color: colors["primary-main"],
            backgroundColor: "transparent",
          },
        }),
      },
    },
    JoyChip: {
      defaultProps: {
        size: "sm",
      },
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.color === "danger" && {
            color: "#fff",
            textTransform: "uppercase",
          }),
          ...(ownerState.color === "primary" && {
            backgroundColor: colors["primary-main"],
            color: "#fff",
          }),
          ...(ownerState.size === "sm" && {
            fontSize: "13px",
            fontWeight: "500",
            lineHeight: "20px",
            padding: "2px 12px",
          }),
        }),
      },
    },
    JoyTooltip: {
      styleOverrides: {
        root: {
          background: colors["snackbar"],
          fontSize: "13px",
          padding: "4px 12px",
          boxShadow: shadow.xs,
          maxWidth: 258,

          [`& .${tooltipClasses.arrow}::before`]: {
            borderTopColor: colors["snackbar"],
            borderRightColor: colors["snackbar"],
          },
        },
      },
    },
    JoyFormLabel: {
      defaultProps: {},
      styleOverrides: {
        root: () => ({
          // Default
          fontWeight: "400",
          marginBottom: "1px",
          fontSize: "13px",
          lineHeight: "15px",
        }),
      },
    },
    JoyModal: {
      styleOverrides: {
        root: {},
        backdrop: {
          background: colors["body-bg"],
          opacity: "90%",
          backdropFilter: "blur(0px)",
        },
      },
    },

    JoyMenuItem: {
      styleOverrides: {
        root: {
          maxHeight: "40px",
          color: colors["text-primary"],
        },
      },
    },

    JoyOption: {
      styleOverrides: {
        root: {
          [`&&.${optionClasses.highlighted}:not([aria-selected="true"]):not(:hover)`]:
            {
              backgroundColor: "unset",
            },
        },
      },
    },
  },
});

type CustomTheme = {
  color: typeof colors;
};

declare module "@mui/joy/styles/extendTheme" {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface CssVarsThemeOptions extends CustomTheme {}
}

declare module "@mui/joy/styles/types/theme" {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface Theme extends CustomTheme {}
}

declare module "@mui/joy/styles" {
  interface BreakpointOverrides {
    xs: false;
    sm: false;
    md: false;
    lg: false;
    xl: false;
    mobile: true;
    laptop: true;
    pc: true;
  }
  interface TypographySystemOverrides {
    h5: true;
    h6: true;
    "title-lg": false;
    "title-md": false;
    "title-sm": false;
    "body-lg": false;
    "body-md": false;
    "body-sm": false;
    "body-xs": false;
    body1: true;
    "body1-500": true;
    body2: true;
    "body2-500": true;
    subtitle2: true;
    caption: true;
    "alert-title": true;
    "input-label": true;
    "btn-medium": true;
    "btn-large": true;
    "input-text-small": true;
    "input-text": true;
    "input-text-large": true;
  }
  interface ColorPalettePropOverrides {
    "text-primary": true;
    "text-secondary": true;
    "primary-main": true;
    "error-main": true;
  }

  // interface PaletteTextOverrides {
  // }

  // interface ButtonPropsSizeOverrides {
  //   mobile: true;
  //   xl: true;
  // }
}

declare module "@mui/joy/Typography" {
  interface TypographyPropsVariantOverrides {
    "text-ellipsis": true;
  }
}

declare module "@mui/joy/Button" {
  interface ButtonPropsColorOverrides {
    "secondary-main": true;
    "astra-pink": true;
    "error-main": true;
    danger: true;
  }
}

declare module "@mui/joy/Chip" {
  // interface ChipPropsColorOverrides {
  //   sell: true;
  // }
}

declare module "@mui/joy/Tab" {
  interface TabPropsVariantOverrides {
    "btn-medium": true;
  }
}

export default theme;
