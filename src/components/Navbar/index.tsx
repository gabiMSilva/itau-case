import { FC } from "react";
import { Toolbar, Box, AppBar, Typography } from "@mui/material";
import { useTheme } from "@mui/system";

import { Circle, InfoTooltip } from "..";

type NavbarParamsType = {
  step: string;
  title: string;
  info?: string;
};

const Navbar: FC<NavbarParamsType> = ({
  step,
  title,
  info,
}: NavbarParamsType) => {
  const theme = useTheme();

  return (
    <Box sx={{ flexGrow: 1 }} data-testid="navbar">
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <Circle content={step} />
          <Typography
            marginLeft={theme.spacing(2)}
            fontWeight={400}
            color={theme.palette.primary.contrastText}
            fontSize={25}
            margin={theme.spacing(3, 1, 3, 3)}
          >
            {title}
          </Typography>
          {info && <InfoTooltip info={info} />}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
