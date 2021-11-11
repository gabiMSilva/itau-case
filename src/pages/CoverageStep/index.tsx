import {
  Grid,
  useTheme,
  CircularProgress,
  Typography,
  Button,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { FC, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { Navbar } from "../../components";
import { fetchCoverageOptions } from "../../services/QuestionsService";
import { CoverageType } from "../../types/CoverageType";
import CoverageItem from "./components/CoverageItem";

const CoverageStep: FC = () => {
  const { state } = useLocation();
  const theme = useTheme();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [coverages, setCoverages] = useState<CoverageType[]>([]);
  const [selectedsCoverage, setSelectedCoverage] = useState<string[]>([]);

  useEffect(() => {
    const loadQuestions = async () => {
      setLoading(true);
      const result = await fetchCoverageOptions();
      setCoverages(result);
      setSelectedCoverage(
        result
          .filter((coverage) => coverage.cobertura_obrigatoria)
          .map((coverage) => coverage.id_cobertura)
      );
      setLoading(false);
    };

    loadQuestions();
  }, []);

  const onCheckCoverageItem = (id: string, checked: boolean) => {
    if (checked) setSelectedCoverage([...selectedsCoverage, id]);
    else
      setSelectedCoverage(
        selectedsCoverage.filter((coverageId) => coverageId !== id)
      );
  };

  return (
    <>
      <Navbar
        step="2"
        title="Agora vamos selecionar as suas coberturas"
        info="É́ o que garante que você vai receber a indenização em caso de perdas ou danos, e o mais legal é que você pode personalizar tudo durante a contratação"
      />

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
        <Grid container flexDirection="row" flexWrap="wrap">
          {coverages.map((coverage) => (
            <Grid item xs={12} md={4}>
              <CoverageItem
                coverage={coverage}
                onChange={onCheckCoverageItem}
              />
            </Grid>
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
                navigate("/profile", {
                  state: {
                    form: { ...state.form, coverages: selectedsCoverage },
                  },
                });
              }}
              disabled={coverages.length === 0 || loading}
            >
              <Typography padding={theme.spacing(0, 3)}>Continuar</Typography>
            </Button>
          </Box>
        </Grid>
      )}
    </>
  );
};

export default CoverageStep;
