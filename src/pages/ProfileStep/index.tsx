import { useEffect } from "react";
import { Grid, Typography, useTheme } from "@mui/material";
import { useLocation, useNavigate } from "react-router";
import { Box } from "@mui/system";

import { Navbar } from "../../components";
import { AssistanceRequestType } from "../../types/AssistanceType";
import ProfileForm from "./components/ProfileForm";
import useStyles from "./styles";

const ProfileStep = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const classes = useStyles();

  const { state } = useLocation();

  const onSubmit = () => {
    // const data: AssistanceRequestType = {};
  };
  
  useEffect(() => {
    if (!state?.form) navigate("/");
  }, [navigate, state?.form]);

  return (
    <>
      <Navbar
        step="3"
        title="Chegou a hora de reunir algumas informações sobre o titular do seguro, vamos lá?"
      ></Navbar>
      <Grid p={theme.spacing(4)} container>
        <ProfileForm />

        <Typography
          m={theme.spacing(2)}
          color={theme.palette.grey[700]}
          lineHeight={1.5}
          fontSize={13}
        >
          Os dados inseridos por você poderão ser compartilhados com empresas
          parceiras para cotação e contratação dos produtos escolhidos e poderão
          ser tratados de acordo com a nossa Política de Privacidade disponível
          em nossos sites e aplicativos
        </Typography>
        <Box
          margin={theme.spacing(0, 2)}
          padding={theme.spacing(2)}
          className={classes.containerTerms}
        >
          <Typography
            color={theme.palette.grey[700]}
            lineHeight={1.5}
            fontSize={13}
          >
            Porto Seguro Cia. de Seguros Gerais. CNPJ 61.198.164/0001-60.
            Consulte as Condições Gerais em
            www.portoseguro.com.br/seguro-residencial. Processos SUSEP:
            Residência 15414.002288/2005-85. Responsabilidade Civil Patrimonial
            15414.900937/2017-49. O registro do produto é automático e não
            representa aprovação ou recomendação por parte da Susep
            representando, exclusivamente, sua adequação às normas em vigor.
          </Typography>
        </Box>
        <Typography
          m={theme.spacing(2)}
          color={theme.palette.grey[700]}
          lineHeight={1.5}
          fontSize={13}
        >
          A Itaú Corretora de Seguros S.A comercializa com exclusividade os
          produtos: seguro residencial e seguro automóvel do Grupo Porto Seguro
          S.A, na figura de corretora de seguros.
        </Typography>
      </Grid>
    </>
  );
};

export default ProfileStep;
