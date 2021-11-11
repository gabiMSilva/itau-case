export type ProfileType = {
  name: string;
  cpf: string;
  birthday: number;
  cep: string;
  number?: string;
  address: string;
  district: string;
  city: string;
  state: string;
  complement ?: string
};

export type AddressType = {
  cep: string,
  logradouro: string,
  complemento?: string,
  bairro: string,
  localidade: string,
  uf: string
}
