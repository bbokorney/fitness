import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      light: "#7c43bd",
      main: "#4a148c",
      dark: "#12005e",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ffff6b",
      main: "#fdd835",
      dark: "#c6a700",
      contrastText: "#000",
    },
  },
});

export default theme;
