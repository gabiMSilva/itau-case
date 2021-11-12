import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme: Theme) => ({
  disabledText: {
    color: "grey",
  },
  invalidModal: {
    padding: theme.spacing(3)
  }
}));

export default useStyles;
