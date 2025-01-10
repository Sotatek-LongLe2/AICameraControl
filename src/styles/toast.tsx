import { colors } from "./colors";

export const toastStyles = {
  ".Toastify__toast": {
    fontFamily: '"Inter", var(--joy-fontFamily-fallback)',
    padding: "12px 16px",
    minHeight: "unset",
    // boxShadow: `inset 0 0 0.5px 1px hsla(0, 0%,
    //           100%, 0.075),
    //           0 0 0 1px hsla(0, 0%, 0%, 0.05),
    //           0 0.3px 0.4px hsla(0, 0%, 0%, 0.02),
    //           0 0.9px 1.5px hsla(0, 0%, 0%, 0.045),
    //           0 3.5px 6px hsla(0, 0%, 0%, 0.09)`,
    boxShadow: "2px 3px 5px #1f1f1f, -2px 2px 10px #171717",

    "&.Toastify__toast-custom": {
      padding: "8px 16px",
    },
  },

  ".Toastify__toast-body": {
    margin: 0,
    padding: 0,
  },

  ".Toastify__toast-icon": {
    marginRight: 12,
    width: "unset",
    maxWidth: 40,
  },

  ".Toastify__toast--success .Toastify__toast-icon, .Toastify__toast--error .Toastify__toast-icon":
    {
      width: 20,
    },

  ".Toastify__spinner": {
    width: 14,
    height: 14,
  },

  ".Toastify__close-button": {
    color: colors["text-primary"],
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    padding: 7,

    "& > svg": {
      width: 20,
      height: 20,
    },
  },
};
