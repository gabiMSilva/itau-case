import { ChangeEvent, FormEvent, Fragment, useEffect, useState } from "react";
import { Box } from "@mui/system";
import {
  FormControlLabel,
  Button,
  Radio,
  RadioGroup,
  Typography,
  useTheme,
} from "@mui/material";

import { Navbar } from "../../components";
import { fetchOfferQuestions } from "../../services/PropertyService";
import { QuestionType } from "../../types/QuestionType";
import useStyles from "./style";
import clsx from "clsx";

const PROPERTY_TYPE_QUESTION_ID = "8045c56a-a07c-416c-ac2e-4ee530076822";
const IS_PROPERTY_GROUP_QUESTION_ID = "c456ed99-1f9a-495d-b87b-d7245cb86ca0";

const PropertyStep = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [disabledPropertyGroup, setDisabledPropertyGroup] =
    useState<boolean>(true);
  const [formData, setFormData] = useState<Record<string, string>>();

  const classes = useStyles();

  useEffect(() => {
    const loadQuestions = async () => {
      setLoading(true);
      const result = await fetchOfferQuestions();
      setQuestions(result);
      setLoading(false);
    };

    loadQuestions();
  }, []);

  const theme = useTheme();

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

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {};

  return (
    <>
      <Navbar step="1" title="Nos conte um pouco sobre o seu imóvel" />
      <Box
        p={theme.spacing(5)}
        maxWidth={theme.breakpoints.down("md") ? "100%" : "50%"}
      >
        <form onSubmit={onSubmit}>
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
            <Button type="submit" variant="contained" size="large">
              <Typography padding={theme.spacing(0, 3)}>Continuar</Typography>
            </Button>
          </Box>
        </form>
      </Box>
    </>
  );
};

export default PropertyStep;
