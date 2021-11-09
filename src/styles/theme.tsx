import { darkScrollbar } from "@mui/material";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#EC7000",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#FDFDFD",
      contrastText: "#101010",
    },
    error: {
      main: "#ff7575",
    },
  },
  typography: {
    fontFamily: "Sarala",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          ...darkScrollbar(),
          margin: 0,
          minHeight: "100vh",

          "#root": {
            minHeight: "100vh",
          },
        },
      },
    },
  },
});

export default theme;
