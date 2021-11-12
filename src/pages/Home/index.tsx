import { Button, Grid, Typography, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import useStyles from "./style";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const classes = useStyles();
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Grid
      container
      direction="row"
      minHeight="100vh"
      className={classes.container}
      data-testid="home"
    >
      <Grid
        md={5}
        xs={12}
        item
        className={classes.leftContainer}
        padding={theme.spacing(7)}
      >
        <Typography fontSize={32} mb={theme.spacing(7)}>
          Olá ;)
        </Typography>
        <Typography fontSize={32}>
          Seja bem-vindo à nossa página de seguros
        </Typography>
      </Grid>
      <Grid
        md={7}
        xs={12}
        item
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        className={classes.rightContainer}
        padding={{ xs: theme.spacing(10, 7), md: theme.spacing(7, 10, 7, 15) }}
      >
        <Typography fontSize={32} textAlign="center" mb={theme.spacing(3)}>
          Existe coisa melhor do que <strong>se sentir seguro em casa</strong>?
        </Typography>
        <Typography fontSize={32} textAlign="center">
          Juntos podemos encontrar o plano perfeito para o seu lar-doce-lar
        </Typography>
        <Box mt={theme.spacing(5)}>
          <Button
            variant="outlined"
            size="large"
            className={classes.button}
            onClick={() => navigate("/property")}
            data-testid="next-button"
          >
            <Typography p={theme.spacing(0, 5)}>Vamos!</Typography>
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Home;
