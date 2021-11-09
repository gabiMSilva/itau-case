import { FC } from "react";
import { Toolbar, Box, AppBar, Typography } from "@mui/material";

import { Circle } from "..";
import { useTheme } from "@mui/system";

type NavbarParamsType = {
  step: string;
  title: string;
};

const Navbar: FC<NavbarParamsType> = ({ step, title }: NavbarParamsType) => {
  const theme = useTheme();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Circle content={step} />
          <Typography
            marginLeft={theme.spacing(2)}
            fontWeight={400}
            color={theme.palette.primary.contrastText}
          >
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
