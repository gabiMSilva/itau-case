import { ThemeProvider } from "@mui/styles";
import { FC, ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { StyledEngineProvider } from "@mui/styled-engine";

import theme from "./styles/theme";

const AllTheProviders: FC = ({
  children,
}) => {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>{children}​​</ThemeProvider>
    </StyledEngineProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
): any => render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };
