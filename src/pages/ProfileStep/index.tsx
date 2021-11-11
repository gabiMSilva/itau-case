import { useEffect, useState } from "react";
import {
  Alert,
  AlertColor,
  Grid,
  Snackbar,
  Typography,
  useTheme,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router";
import { Box } from "@mui/system";

import { Navbar } from "../../components";
import ProfileForm from "./components/ProfileForm";
import useStyles from "./styles";
import { RequestAssistanceType } from "../../types/AssistanceType";
import { ProfileType } from "../../types/PofileType";
import { postAssistanceData } from "../../services/AssistanceService";

const ProfileStep = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const classes = useStyles();
  const { state } = useLocation();

  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<{
    severity?: AlertColor;
    message?: string;
  }>({ severity: undefined, message: undefined });

  useEffect(() => {
    if (!state?.form) navigate("/");
  }, [navigate, state?.form]);

  const onSubmit = async (values: ProfileType) => {
    const data = state?.form;
    const finalData: RequestAssistanceType = {
      item_risco: {
        imovel: {
          endereco: {
            numero: values.number,
            pais: "BRA",
            cep: values.cep,
            logradouro: values.address,
            complemento: values.complement,
            bairro: values.district,
            localidade: values.city,
            uf: values.state,
          },
        },
      },
      oferta: {
        id_oferta: "1",
        produtos: [
          {
            assistencias: [],
            coberturas: data.coverages.map((item: string) => ({
              id_cobertura: item,
              importancia_segurada: 3000,
            })),
            id_produto: "1",
            importancia_base: 3000 * data.coverages.length,
          },
        ],
      },
      proponente: {
        contatos: [],
        cpf: values.cpf,
        data_nascimento: values.birthday,
        nome: values.name,
      },
      questoes: Object.keys(data.property).map((key, index) => ({
        id_questao: key,
        resposta: data.property[key],
      })),
    };

    setLoading(true);

    await postAssistanceData(finalData)
      .then((response) => {
        navigate("/result", {
          state: {
            result: response,
          },
        });
        console.log("RESPONSE", response);
      })
      .catch((error) => {
        setAlert({ severity: "error", message: error });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <Navbar
        step="3"
        title="Chegou a hora de reunir algumas informações sobre o titular do seguro, vamos lá?"
      ></Navbar>
      <Grid p={theme.spacing(4)} container>
        <ProfileForm onSubmit={onSubmit} />

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
      <Snackbar
        autoHideDuration={6000}
        open={!!alert.message}
        onClose={() => setAlert({ severity: undefined, message: undefined })}
      >
        <Alert
          severity={alert?.severity}
          onClose={() => setAlert({ severity: undefined, message: undefined })}
        >
          {alert?.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ProfileStep;
