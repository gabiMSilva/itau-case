import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    margin: theme.spacing(3),
    padding: theme.spacing(3),
    [theme.breakpoints.up("md")]: {
      height: 250,
      overflowY: "auto",
    },
  },
  checkbox: {
      padding: 0,
      marginRight: theme.spacing(1)
  }
}));

export default useStyles;
