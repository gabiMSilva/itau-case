import { ThemeProvider, CssBaseline } from "@mui/material";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";

import Routes from "./routes";
import theme from "./styles/theme";

import "@fontsource/sarala/400.css";
import "@fontsource/sarala/700.css";

const rootElement = document.getElementById("root");

render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes />
    </ThemeProvider>
  </BrowserRouter>,
  rootElement
);
