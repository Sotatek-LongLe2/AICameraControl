import { colors } from "./colors";

export const datePickerStyles = {
  ".react-datepicker-wrapper": {
    width: "100%",
  },
  ".react-datepicker-popper": {
    zIndex: 2,

    "&[data-placement^=top] .react-datepicker__triangle": {
      color: colors["body-bg"],
      fill: colors["body-bg"],
      stroke: "#101010",
    },

    "&[data-placement^=bottom] .react-datepicker__triangle": {
      color: colors.paper,
      fill: colors.paper,
      stroke: colors.paper,
    },
  },

  ".react-datepicker": {
    boxShadow: "4px 4px 16px #141414, 0px 1px 1px #141414",
    borderRadius: "4px",
    border: "none",
    backgroundColor: colors["body-bg"],
    fontFamily: '"Inter", var(--joy-fontFamily-fallback)',

    "&": {
      // https://jira.sotatek.com/browse/ASA-682
      "&:has(.react-datepicker__time-container)": {
        minWidth: 345,
      },

      // Css Date picker
      ".react-datepicker__header": {
        backgroundColor: colors.paper,
        borderBottom: "none",
      },

      ".react-datepicker__current-month": {
        fontWeight: 400,
        fontSize: 15,
        lineHeight: "22px",
        color: colors["text-primary"],
      },

      ".react-datepicker__day-name": {
        fontWeight: 400,
        fontSize: 13,
        width: 30,
        lineHeight: "20px",
        color: colors["text-secondary"],
      },

      ".react-datepicker__month": {
        backgroundColor: colors["body-bg"],
      },

      ".react-datepicker__day": {
        fontWeight: 400,
        fontSize: 13,
        lineHeight: "30px",
        width: 30,
        height: 30,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "50% !important",
        border: "none",
        color: colors["text-primary"],

        "&:not(.react-datepicker__day--disabled):hover": {
          backgroundColor: colors["astra-main"],
          color: colors["text-primary"],
        },

        "&:focus-within": {
          outline: "none",
        },

        "&.react-datepicker__day--today": {
          // border: `1px solid ${colors["text-primary"]}`,
          backgroundColor: colors["astra-main"],
        },

        "&.react-datepicker__day--keyboard-selected": {
          backgroundColor: "unset",
        },

        "&.react-datepicker__day--selected": {
          backgroundColor: colors["primary-main"],
          color: colors["text-primary"],

          "&:hover": {
            backgroundColor: colors["primary-main"],
            color: colors["text-primary"],
          },
        },
      },

      ".react-datepicker__day--outside-month": {
        color: colors["text-disabled"],
      },

      // Css time picker
      ".react-datepicker-time__header": {
        color: colors["text-primary"],
        fontWeight: 400,
        fontSize: 15,
        lineHeight: "22px",
      },

      ".react-datepicker__time-list": {
        backgroundColor: colors["body-bg"],

        "&": {
          ".react-datepicker__time-list-item": {
            color: colors["text-primary"],

            "&:hover": {
              color: "#000",
            },
          },
        },
      },
    },
  },
};
