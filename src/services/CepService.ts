import axios, { AxiosResponse } from "axios";
import { AddressType } from "../types/PofileType";

export const getAddresDataByCep = async (cep: string) => {
  const response: AxiosResponse<AddressType> = await axios.get(
    `https://viacep.com.br/ws/${cep}/json/`
  );

  return response.data;
};
