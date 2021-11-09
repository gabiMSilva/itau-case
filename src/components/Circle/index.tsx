import { Typography, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import { FC } from "react";
import useStyles from "./style";

type CircleParamsType = {
  content: string;
};

const Circle: FC<CircleParamsType> = ({ content }: CircleParamsType) => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Box
      borderRadius={theme.spacing(50)}
      width={theme.spacing(4)}
      height={theme.spacing(4)}
      className={classes.circle}
    >
      <Typography fontSize={15} fontWeight={700}>
        {content}
      </Typography>
    </Box>
  );
};

export default Circle;
