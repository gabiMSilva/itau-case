import React, { ChangeEvent } from "react";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import { Button, Grid, TextField, Typography, useTheme } from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import InputMask from "react-input-mask";
import * as yup from "yup";
import { useFormik } from "formik";

import { getAddresDataByCep } from "../../../../services/CepService";
import { AddressType, ProfileType } from "../../../../types/PofileType";
import { Box } from "@mui/system";

const ProfileForm = () => {
  const theme = useTheme();

  const gridParams = {
    md: 6,
    xs: 12,
    item: true,
    padding: theme.breakpoints.up("md")
      ? theme.spacing(2)
      : theme.spacing(2, 0),
  };

  const formik = useFormik<ProfileType>({
    initialValues: {
      name: "",
      cpf: "",
      birthday: Date.now(),
      cep: "",
      address: "",
      district: "",
      city: "",
      state: "",
      number: "",
      complement: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
    validationSchema: yup.object().shape({
      name: yup
        .string()
        .required("Você esqueceu de informar seu nome")
        .test(
          "nameHasTwoWords",
          "Digite seu nome completo",
          (value: string | undefined): boolean => !!value?.includes(" ")
        ),
      cpf: yup
        .string()
        .required("Você esqueceu de informar seu CPF")
        .max(14)
        .min(14),
      birthday: yup
        .string()
        .required("Você esqueceu de informar sua data de nascimento"),
      cep: yup
        .string()
        .required("Você esqueceu de informar seu Cep")
        .max(9)
        .min(9),
      address: yup.string().required("Você esqueceu de informar seu endereço"),
      district: yup.string().required("Você esqueceu de informar seu bairro"),
      city: yup.string().required("Você esqueceu de informar sua cidade"),
      state: yup.string().required("Você esqueceu de informar seu estado"),
      number: yup
        .number()
        .required("Você esqueceu de informar o número do seu endereço"),
      complement: yup.string(),
    }),
  });

  const handleChangeCep = async (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    formik.handleChange(event);

    if (!value.includes("_")) {
      getAddresDataByCep(value)
        .then((data: AddressType) => {
          if (data.hasOwnProperty("erro")) {
            formik.setFieldTouched("cep", true, false);
            formik.setFieldError("cep", "Cep não encontrado");
          } else {
            formik.setFieldValue("state", data.uf);
            formik.setFieldValue("city", data.localidade);
            formik.setFieldValue("district", data.bairro);
            formik.setFieldValue("complement", data.complemento);
            formik.setFieldValue("address", data.logradouro);
          }
        })
        .catch((err) => console.error(err));
    }
  };

  return (
    <>
      <Grid {...gridParams}>
        <TextField
          required
          label="Nome completo"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={!!formik.touched.name && !!formik.errors.name}
          helperText={
            !!formik.touched.name && !!formik.errors.name
              ? formik.errors.name
              : undefined
          }
          fullWidth
        />
      </Grid>
      <Grid {...gridParams}>
        <InputMask
          mask="999.999.999-99"
          name="cpf"
          value={formik.values.cpf}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        >
          {(props: Record<string, any>) => (
            <TextField
              required
              fullWidth
              label="CPF"
              error={!!formik.touched.cpf && !!formik.errors.cpf}
              helperText={
                !!formik.touched.cpf && !!formik.errors.cpf
                  ? formik.errors.cpf
                  : undefined
              }
              {...props}
            />
          )}
        </InputMask>
      </Grid>
      <Grid {...gridParams}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Data de nascimento"
            value={formik.values.birthday}
            maxDate={Date.now()}
            onChange={(value) => formik.setFieldValue("birthday", value)}
            renderInput={(params) => (
              <TextField
                required
                {...params}
                name="birthday"
                onBlur={formik.handleBlur}
                value={formik.values.birthday}
                onChange={formik.handleChange}
                fullWidth
              />
            )}
          />
        </LocalizationProvider>
      </Grid>
      <Grid {...gridParams}>
        <InputMask
          mask="99999-999"
          name="cep"
          value={formik.values.cep}
          onChange={handleChangeCep}
        >
          {(props: Record<string, any>) => (
            <TextField
              required
              {...props}
              label="Cep"
              fullWidth
              error={!!formik.touched.cep && !!formik.errors.cep}
              helperText={
                !!formik.touched.cep && !!formik.errors.cep
                  ? formik.errors.cep
                  : undefined
              }
            />
          )}
        </InputMask>
      </Grid>
      <Grid {...gridParams}>
        <TextField
          required
          label="Endereço"
          name="address"
          value={formik.values.address}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={!!formik.touched.address && !!formik.errors.address}
          helperText={
            !!formik.touched.address && !!formik.errors.address
              ? formik.errors.address
              : undefined
          }
          fullWidth
        />
      </Grid>
      <Grid {...gridParams}>
        <TextField
          disabled
          required
          label="Estado"
          name="state"
          value={formik.values.state}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={!!formik.touched.state && !!formik.errors.state}
          helperText={
            !!formik.touched.state && !!formik.errors.state
              ? formik.errors.state
              : undefined
          }
          fullWidth
        />
      </Grid>
      <Grid {...gridParams}>
        <TextField
          disabled
          required
          label="Cidade"
          name="city"
          value={formik.values.city}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={!!formik.errors.city && !!formik.touched.city}
          helperText={
            !!formik.errors.city && !!formik.touched.city
              ? formik.errors.city
              : undefined
          }
          fullWidth
        />
      </Grid>
      <Grid {...gridParams}>
        <TextField
          disabled
          required
          label="Bairro"
          name="district"
          value={formik.values.district}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={!!formik.errors.district && !!formik.touched.district}
          helperText={
            !!formik.errors.district && !!formik.touched.district
              ? formik.errors.district
              : undefined
          }
          fullWidth
        />
      </Grid>
      <Grid {...gridParams}>
        <TextField
          required
          label="Número"
          name="number"
          value={formik.values.number}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={!!formik.errors.number && !!formik.touched.number}
          helperText={
            !!formik.errors.number && !!formik.touched.number
              ? formik.errors.number
              : undefined
          }
          fullWidth
        />
      </Grid>
      <Grid {...gridParams}>
        <TextField
          label="Complemento"
          name="complement"
          value={formik.values.complement}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={!!formik.errors.complement && !!formik.touched.complement}
          helperText={
            !!formik.errors.complement && !!formik.touched.complement
              ? formik.errors.complement
              : undefined
          }
          fullWidth
        />
      </Grid>
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
          disabled={
            !(Object.keys(formik.errors || {}).length === 0 && !!formik.dirty)
          }
        >
          <Typography padding={theme.spacing(0, 3)}>Finalizar</Typography>
        </Button>
      </Box>
    </>
  );
};

export default ProfileForm;
