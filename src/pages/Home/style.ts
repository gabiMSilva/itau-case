import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme: Theme) => ({
  leftContainer: {
    backgroundColor: theme.palette.primary.main,
    minHeight: "100%",
    color: theme.palette.primary.contrastText,
  },
  rightContainer: {
    minHeight: "100%",
    backgroundColor: theme.palette.secondary.main,
    [theme.breakpoints.down("md")]: {
      borderStartStartRadius: 200,
      borderStartEndRadius: 200,
    },
    [theme.breakpoints.up("md")]: {
      borderStartStartRadius: 200,
      borderEndStartRadius: 200,
    },
  },
  container: {
    backgroundColor: theme.palette.primary.main,
  },
  button: {
    width: "fit-content",
    fontSize: 20,
  },
}));

export default useStyles;
