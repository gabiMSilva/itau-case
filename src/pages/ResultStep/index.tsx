import { Title } from "@mui/icons-material";
import {
  Card,
  CardContent,
  CardHeader,
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
import React from "react";
import { useLocation } from "react-router";
import { Navbar } from "../../components";

const ResultStep = () => {
  const { state } = useLocation();
  const theme = useTheme();

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

        <Typography fontSize={20} margin={theme.spacing(2, 0)} fontWeight="bold">
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
                  <TableHead>
                    <TableRow>
                      <TableCell>Qtd de Parcelas</TableCell>
                      <TableCell>Valor da Parcela</TableCell>
                      <TableCell>Valor Total</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {state.result.opcoes_pagamento
                      .filter(
                        (item: { metodo: string }) =>
                          item.metodo === "credit_card"
                      )
                      .map(
                        (row: {
                          id_opcao_pagamento: React.Key | null | undefined;
                          parcelas: string;
                          valor_parcela: string;
                          valor_total: string;
                        }) => (
                          <TableRow key={row.id_opcao_pagamento}>
                            <TableCell align="center">{row.parcelas}</TableCell>
                            <TableCell align="center">
                              {row.valor_parcela}
                            </TableCell>
                            <TableCell align="center">
                              {row.valor_total}
                            </TableCell>
                          </TableRow>
                        )
                      )}
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
                    {state.result.opcoes_pagamento
                      .filter(
                        (item: { metodo: string }) =>
                          item.metodo === "credit_card_porto"
                      )
                      .map(
                        (row: {
                          id_opcao_pagamento: React.Key | null | undefined;
                          parcelas:string;
                          valor_parcela:string;
                          valor_total:string;
                        }) => (
                          <TableRow key={row.id_opcao_pagamento}>
                            <TableCell align="center">{row.parcelas}</TableCell>
                            <TableCell align="center">
                              {row.valor_parcela}
                            </TableCell>
                            <TableCell align="center">
                              {row.valor_total}
                            </TableCell>
                          </TableRow>
                        )
                      )}
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
                    {state.result.opcoes_pagamento
                      .filter(
                        (item: { metodo: string }) =>
                          item.metodo === "direct_debit"
                      )
                      .map(
                        (row: {
                          id_opcao_pagamento: React.Key | null | undefined;
                          parcelas:string;
                          valor_parcela:string;
                          valor_total:string;
                        }) => (
                          <TableRow key={row.id_opcao_pagamento}>
                            <TableCell align="center">{row.parcelas}</TableCell>
                            <TableCell align="center">
                              {row.valor_parcela}
                            </TableCell>
                            <TableCell align="center">
                              {row.valor_total}
                            </TableCell>
                          </TableRow>
                        )
                      )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        {/* {state.result.opcoes_pagamento} */}
      </Box>
    </>
  );
};

export default ResultStep;
