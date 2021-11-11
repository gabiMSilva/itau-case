import { ChangeEvent, Fragment, useEffect, useState } from "react";
import { Box } from "@mui/system";
import {
  FormControlLabel,
  Button,
  Radio,
  RadioGroup,
  Typography,
  useTheme,
  CircularProgress,
  Dialog,
  useMediaQuery,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

import { Navbar } from "../../components";
import { fetchOfferQuestions } from "../../services/QuestionsService";
import { QuestionType } from "../../types/QuestionType";
import useStyles from "./style";
import clsx from "clsx";
import { useNavigate } from "react-router";

const PROPERTY_TYPE_QUESTION_ID = "8045c56a-a07c-416c-ac2e-4ee530076822";
const IS_PROPERTY_GROUP_QUESTION_ID = "c456ed99-1f9a-495d-b87b-d7245cb86ca0";
const IS_UNOCCUPIED_PROPERTY_QUESTION_ID =
  "1c1f1c9d-fa98-49f0-8eac-d78ed1e40696";
const PROPERTY_BUILDING_MATERIAL_QUESTION_ID =
  "ca708e31-29cb-46ee-b423-a71bf2dcf9f6";

const FARM_TYPE_RESPONSE_ID = "3";
const UNOCCUPIED_PROPERTY_RESPONSE_ID = "2";
const BUILDING_WITH_WOOD_RESPONSE_ID = "1";

const PropertyStep = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [showInvalidModal, setShowInvalidModal] = useState<boolean>(false);
  const [disabledPropertyGroup, setDisabledPropertyGroup] =
    useState<boolean>(true);
  const [formData, setFormData] = useState<Record<string, string>>();

  const classes = useStyles();
  const navigate = useNavigate();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    const loadQuestions = async () => {
      setLoading(true);
      const result = await fetchOfferQuestions();
      setQuestions(result);
      setLoading(false);
    };

    loadQuestions();
  }, []);

  const questionsAreValid = (): boolean => {
    return !!(
      formData &&
      formData[PROPERTY_TYPE_QUESTION_ID] !== FARM_TYPE_RESPONSE_ID &&
      formData[IS_UNOCCUPIED_PROPERTY_QUESTION_ID] !==
        UNOCCUPIED_PROPERTY_RESPONSE_ID &&
      formData[PROPERTY_BUILDING_MATERIAL_QUESTION_ID] !==
        BUILDING_WITH_WOOD_RESPONSE_ID
    );
  };

  const onRadioChange = (
    event: ChangeEvent<HTMLInputElement>,
    question: QuestionType
  ) => {
    const isSelectedHouse = event.target.value === "1";
    const isPropertyTypeQuestion =
      question.id_questao === PROPERTY_TYPE_QUESTION_ID;
    const tempData = {
      ...formData,
    };

    if (isPropertyTypeQuestion) {
      setDisabledPropertyGroup(!isSelectedHouse);
      if (!isSelectedHouse) {
        delete tempData[IS_PROPERTY_GROUP_QUESTION_ID];
      }
    }

    tempData[question.id_questao] = event.target.value;
    setFormData(tempData);
  };

  return (
    <>
      <Navbar step="1" title="Nos conte um pouco sobre o seu imóvel" />
      {loading ? (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          width="100%"
          m={theme.spacing(4)}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Box
          p={theme.spacing(5)}
          maxWidth={theme.breakpoints.down("md") ? "100%" : "50%"}
        >
          {questions.map((question) => (
            <Fragment key={question.id_questao}>
              <Typography
                className={clsx(
                  question.id_questao === IS_PROPERTY_GROUP_QUESTION_ID &&
                    disabledPropertyGroup &&
                    classes.disabledText
                )}
                fontSize={25}
              >
                {question.texto_questao}
              </Typography>
              <RadioGroup
                aria-label={question.texto_questao}
                name={question.id_questao}
                row
                onChange={(event) => onRadioChange(event, question)}
              >
                {question.respostas.map((response) => (
                  <Box key={response.id_resposta} m={theme.spacing(3, 0)}>
                    <FormControlLabel
                      value={response.id_resposta}
                      control={
                        <Radio
                          required={
                            question.id_questao !==
                              IS_PROPERTY_GROUP_QUESTION_ID ||
                            !disabledPropertyGroup
                          }
                        />
                      }
                      label={response.texto_resposta}
                      disabled={
                        question.id_questao === IS_PROPERTY_GROUP_QUESTION_ID &&
                        disabledPropertyGroup
                      }
                    />
                  </Box>
                ))}
              </RadioGroup>
            </Fragment>
          ))}
          <Box
            display="flex"
            justifyContent="end"
            position="fixed"
            bottom={theme.spacing(2)}
            right={theme.spacing(2)}
          >
            <Button
              type="submit"
              variant="contained"
              size="large"
              onClick={() => {
                if (questionsAreValid()) {
                  navigate("/coverage", {
                    state: { form: { property: formData } },
                  });
                } else {
                  setShowInvalidModal(true);
                }
              }}
              disabled={
                (disabledPropertyGroup &&
                  Object.keys(formData || {}).length < questions.length - 1) ||
                (!disabledPropertyGroup &&
                  Object.keys(formData || {}).length < questions.length) ||
                loading ||
                questions.length === 0
              }
            >
              <Typography padding={theme.spacing(0, 3)}>Continuar</Typography>
            </Button>
          </Box>
        </Box>
      )}
      <Dialog
        open={showInvalidModal}
        fullScreen={fullScreen}
        className={classes.invalidModal}
        onClose={() => setShowInvalidModal(false)}
      >
        <DialogTitle color={theme.palette.primary.main}>
          <Typography textAlign="center" component="h1">
            Seguro Indisponível
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography>
            Poxa! este seguro residencial não é válido para imóveis de madeira,
            chácara ou local desocupado. mas você pode contratar o seguro para
            um imóvel de alvenaria, sendo casa ou apartamento que esteja
            ocupado.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={() => navigate("/")}>
            Voltar para página inicial
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              setShowInvalidModal(false);
            }}
          >
            Fazer a cotação de outro imóvel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PropertyStep;
