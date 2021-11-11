export const getAddresDataByCep = async (cep: string) => {
  const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`, {
    mode: "cors",
    method: "GET",
  }).then((response) => response.json());

  return response;
};
