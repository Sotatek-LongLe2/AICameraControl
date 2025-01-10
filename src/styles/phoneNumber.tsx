import { colors } from "./colors";

export const phoneNumberStyles = {
  ".react-tel-input.react-tel-input": {
    // Flag dropdown
    ".flag-dropdown": {
      border: `1px solid transparent`,
      borderRight: `1px solid ${colors["input-border"]}`,
    },
    // Phone input
    ".customPhoneInput": {
      backgroundColor: "transparent",
      color: colors["text-primary"],
      border: `1px solid ${colors["input-border"]}`,
      borderRadius: "6px",
      padding: "8px",
      width: "100%",
      paddingLeft: "98px",
      height: "48px",
      fontSize: "15px",
      lineHeight: "24px",
      "&.h42": {
        height: "42px",
      },
      "&:focus": {
        border: `2px solid ${colors["primary-main"]}`,
      },
    },

    // Country list
    ".country-list": {
      marginTop: "2px",
      border: `1px solid ${colors["input-border"]}`,
      borderRadius: "6px",

      ".country": {
        backgroundColor: colors["paper"],
        "&:hover": {
          backgroundColor: colors["astra-main"],
        },
      },
      ".country-name": {
        fontSize: "15px",
        lineHeight: "22px",
        fontFamily: "Inter",
      },
      ".dial-code": {
        color: colors["text-primary"],
        fontSize: "15px",
        lineHeight: "22px",
        fontFamily: "Inter",
      },
      "&::-webkit-scrollbar": {
        width: "8px",
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: colors["input-border"],
        borderRadius: "6px",
      },
      "&::-webkit-scrollbar-thumb:hover": {
        backgroundColor: colors["astra-main"],
      },
      "&::-webkit-scrollbar-track": {
        backgroundColor: colors["body-bg"],
        borderRadius: "6px",
      },
    },
    ".customDropdown": {
      backgroundColor: colors["body-bg"],
      color: colors["text-primary"],
      ".search": {
        backgroundColor: colors["body-bg"],
      },
      ".highlight": {
        backgroundColor: colors["astra-main"],
        // opacity: 0.45,
      },
    },
    ".customButton": {
      backgroundColor: "transparent",
      color: colors["text-primary"],

      ".selected-flag": {
        userSelect: "none",
        backgroundColor: "transparent",
        width: 81,
        display: "flex",
        justifyContent: "center",
        paddingLeft: 0,
        ".flag": {
          scale: "1.8",
          left: "24px",
        },
      },
      ".arrow": {
        border: `solid ${colors["text-primary"]}`,
        borderWidth: "0 1px 1px 0",
        display: "inline-block",
        padding: 1.4,
        top: -9,
        transform: "rotate(45deg)",
        left: 22,
      },

      "&.top12": {
        ".arrow": {
          top: -12,
        },
      },
      // ".up": {
      //   transform: "rotate(225deg)",
      // },
      // "&::after": {
      //   content: '""',
      //   position: "absolute",
      //   right: "16px",
      //   top: "50%",
      //   transform: "translateY(-50%)",
      //   backgroundImage: `url(/icon/drop-arrow-phone.svg)`,
      //   backgroundRepeat: "no-repeat",
      //   width: "16px",
      //   height: "16px",
      // },
    },
  },
} as const;
