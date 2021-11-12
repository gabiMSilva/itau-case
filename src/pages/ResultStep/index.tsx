import {
  Button,
  Card,
  CardContent,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

import { Navbar } from "../../components";
import { CoverageResultType } from "../../types/CoverageType";
import CoverageItem from "./components/CoverageItem";

type PaymentOptionsType = {
  id_opcao_pagamento: string;
  recorrencia: boolean;
  metodo: string;
  parcelas: number;
  valor_parcela: number;
  valor_total: number;
  variante: "padrao";
  iof: number;
  iof_percentual: number;
  juros: 0;
  juros_percentual: 0;
};

type StateParamType = {
  state: {
    result: {
      produtos: {
        coberturas: CoverageResultType[];
      }[];
      opcoes_pagamento: PaymentOptionsType[];
    };
  };
};

const ResultStep = () => {
  const { state }: StateParamType = useLocation();
  const theme = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    if (!state?.result) navigate("/");
  }, [navigate, state?.result]);

  return (
    <>
      <Navbar step="4" title="Resultado da cotação" />
      <Box m={theme.spacing(3)}>
        <Typography
          fontSize={25}
          textAlign="center"
          fontWeight="bold"
          color={theme.palette.primary.main}
        >
          Parabéns! Chegamos à etapa final
        </Typography>

        <Typography
          fontSize={20}
          margin={theme.spacing(2, 0)}
          fontWeight="bold"
        >
          Opções de pagamento
        </Typography>
        <Grid container direction="row" spacing={theme.spacing(3)}>
          <Grid xs={12} md={4} item>
            <Card>
              <CardContent>
                <Typography textAlign="center" fontWeight="bold">
                  Cartão de Crédito
                </Typography>

                <Table
                  aria-label="Tabela de opção de pagamento em cartão"
                  size="small"
                >
                  <Typography></Typography>
                  <TableHead>
                    <TableRow>
                      <TableCell>Qtd de Parcelas</TableCell>
                      <TableCell>Valor da Parcela</TableCell>
                      <TableCell>Valor Total</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {state?.result.opcoes_pagamento
                      .filter(
                        (item: { metodo: string }) =>
                          item.metodo === "credit_card"
                      )
                      .map((row) => (
                        <TableRow key={row.id_opcao_pagamento}>
                          <TableCell align="center">{row.parcelas}</TableCell>
                          <TableCell align="center">
                            {row.valor_parcela}
                          </TableCell>
                          <TableCell align="center">
                            {row.valor_total}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </Grid>
          <Grid xs={12} md={4} item>
            <Card>
              <CardContent>
                <Typography textAlign="center" fontWeight="bold">
                  Cartão de Crédito Porto
                </Typography>
                <Table
                  aria-label="Tabela de opção de pagamento em cartão"
                  size="small"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell>Qtd de Parcelas</TableCell>
                      <TableCell>Valor da Parcela</TableCell>
                      <TableCell>Valor Total</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {state?.result.opcoes_pagamento
                      .filter(
                        (item: { metodo: string }) =>
                          item.metodo === "credit_card_porto"
                      )
                      .map((row) => (
                        <TableRow key={row.id_opcao_pagamento}>
                          <TableCell align="center">{row.parcelas}</TableCell>
                          <TableCell align="center">
                            {row.valor_parcela}
                          </TableCell>
                          <TableCell align="center">
                            {row.valor_total}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </Grid>
          <Grid xs={12} md={4} item>
            <Card>
              <CardContent>
                <Typography textAlign="center" fontWeight="bold">
                  Débito
                </Typography>
                <Table
                  aria-label="Tabela de opção de pagamento em cartão"
                  size="small"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell>Qtd de Parcelas</TableCell>
                      <TableCell>Valor da Parcela</TableCell>
                      <TableCell>Valor Total</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {state?.result.opcoes_pagamento
                      .filter(
                        (item: { metodo: string }) =>
                          item.metodo === "direct_debit"
                      )
                      .map((row) => (
                        <TableRow key={row.id_opcao_pagamento}>
                          <TableCell align="center">{row.parcelas}</TableCell>
                          <TableCell align="center">
                            {row.valor_parcela}
                          </TableCell>
                          <TableCell align="center">
                            {row.valor_total}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Typography
          fontSize={20}
          margin={theme.spacing(2, 0)}
          fontWeight="bold"
        >
          Outras coberturas
        </Typography>
        <Grid container direction="row" spacing={theme.spacing(3)}>
          {state?.result.produtos[0].coberturas.map((coverage, index) => (
            <Grid item xs={12} sm={6} lg={3} key={coverage.identificador}>
              <CoverageItem index={index} coverage={coverage}></CoverageItem>
            </Grid>
          ))}
          <Box marginRight={theme.spacing(1)} marginLeft={theme.spacing(6)}>
            <Button variant="outlined" onClick={() => navigate("/")}>
              Voltar para página inicial
            </Button>
          </Box>
          <Button
            variant="contained"
            onClick={() => {
              navigate("/property");
            }}
          >
            Fazer a cotação de outro imóvel
          </Button>
        </Grid>
      </Box>
    </>
  );
};

export default ResultStep;
