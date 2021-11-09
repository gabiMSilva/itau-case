import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme: Theme) => ({
  circle: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 700,
  },
}));

export default useStyles;
