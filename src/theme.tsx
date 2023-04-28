//* eslint-disable import/no-mutable-exports */
import { createTheme, Theme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface PaletteColor {
    hover?: string;
    divider?: string;
  }
  interface SimplePaletteColorOptions {
    hover?: string;
    divider?: string;
  }
}
const theme: Theme = createTheme({
  palette: {
    primary: {
      main: "#0f4c75",
      light: "#d6e6f1",
      hover: "#F4F5F7",
      divider: "#DDDDDD",
    },
    secondary: {
      main: "#0f4c75",
      hover: "#1f557c",
    },
    grey: {
      100: "#F8F9FB",
      200: "#ECEEF7",
      300: "#D1D1D1",
      400: "#4E4E4E",
      500: "#777777",
      600: "#949494",
    },
    text: {
      primary: "#232323",
      secondary: "#949494",
      disabled: "#C2C9D1",
    },
    success: {
      main: "#65B168",
      light: "#EDF6EE",
    },
    error: {
      main: "#FC5050",
      light: "#FFEFEF",
    },
    warning: {
      main: "#FFA224",
      light: "#FDF8EB",
    },
    info: {
      main: "#2E6ADD",
      light: "#E7EFF9",
    },
    background: {
      default: "#F4F5F7",
      paper: "#FFFFFF",
    },
  },
  spacing: 8,
  typography: {
    htmlFontSize: 13,
    fontSize: 13,
    fontFamily: [
      "Rubik",
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
    ].join(","),
  },
  shape: {
    borderRadius: 6,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          fontSize: "13px",
        },
        body: {
          fontSize: "1rem",
        },
      },
    },
    // Name of the component
    MuiInputBase: {
      styleOverrides: {
        // Name of the slot
        input: {
          boxSizing: "border-box",
          height: 34,
        },
        root: {
          boxSizing: "border-box",
          fontSize: "1rem",
        },
        multiline: {
          height: "auto !important",
          lineHeight: "1.4",
        },
        inputMultiline: {
          height: "auto",
          lineHeight: "1.4",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        // Name of the slot
        root: {
          boxSizing: "border-box",
          height: "34px",
          "&.MuiInputBase-multiline": {
            height: "auto !important",
          },
        },
      },
    },
    MuiButtonBase: {
      styleOverrides: {
        // Name of the slot
        root: {
          boxSizing: "border-box",
          height: "34px",
          lineHeight: "34px",
          borderRadius: "6px",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          textTransform: "capitalize",
          boxSizing: "border-box",
          height: "34px",
          lineHeight: "34px",
          paddingLeft: "8px",
          paddingRight: "8px",
        },
        outlined: {
          borderWidth: 2,
          "&:hover": {
            borderWidth: 2,
          },
        },
        contained: {
          "&:hover": {
            backgroundColor: "#0f4c75",
            boxShadow: `0 5px 10px #777`,
            border: "none",
          },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          borderRadius: "0px",
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        // Name of the slot
        select: {
          boxSizing: "border-box",
          height: 34,
          lineHeight: "34px",
          paddingTop: 0,
          paddingBottom: 0,
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        switchBase: {
          height: "auto",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontSize: "13px",
          fontWeight: 400,
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          height: "5px",
        },
        root: {
          "& .MuiTab-root.Mui-selected": {
            color: "#000000",
            fontWeight: 500,
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          "&.MuiCheckbox-root.Mui-checked": {
            color: "#65B168",
          },
        },
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          "&.MuiRadio-root.Mui-checked": {
            color: "#65B168",
          },
        },
      },
    },
  },
});
export default theme;
