import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme: Theme) => ({
  containerTerms: {
    backgroundColor: theme.palette.grey[300],
  },
}));

export default useStyles;
