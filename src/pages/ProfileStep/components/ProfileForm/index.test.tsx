import ProfileForm from ".";
import { render, fireEvent, act } from "../../../../jest";
import { AddressType } from "../../../../types/PofileType";
import TestUtils from "react-dom/test-utils";
import userEvent, { TargetElement } from "@testing-library/user-event";

const onSubmit = jest.fn();

const profileTextInputs = {
  address: "",
  city: "",
  district: "",
  name: "",
  number: "",
  state: "",
  complement: "",
};

const cepResponseMock: AddressType = {
  cep: "71015-154",
  logradouro: "QI 18 Bloco O",
  complemento: "",
  bairro: "Guará I",
  localidade: "Brasília",
  uf: "DF",
};

const changeInputMaskValue = (element: HTMLInputElement, value: string) => {
  element.value = value;
  element.selectionStart = element.selectionEnd = value.length;
  TestUtils.Simulate.change(element);
};

const mockCep = jest.fn(() => Promise.resolve(cepResponseMock));

jest.mock("../../../../services/CepService", () => ({
  getAddresDataByCep: () => mockCep(),
}));

describe("ProfileFormTest", () => {
  it("should render component", () => {
    const { getByTestId } = render(<ProfileForm onSubmit={onSubmit} />);
    expect(getByTestId("profile-form")).toBeDefined();
  });

  it("should change value on modify input", () => {
    render(<ProfileForm onSubmit={onSubmit} />);

    Object.keys(profileTextInputs).forEach((key) => {
      var input: HTMLInputElement | null = document?.querySelector(
        `input[name=${key}]`
      );
      const newValue = "new value";
      fireEvent.change(input || document, {
        target: { value: newValue },
      });

      expect(input?.value).toBe(newValue);

      fireEvent.focus(input || document);
      fireEvent.blur(input || document);
    });
  });

  it("should call api on change cep", () => {
    render(<ProfileForm onSubmit={onSubmit} />);
    var input: HTMLInputElement | null =
      document?.querySelector(`input[name=cep]`);

    // Both lines of codes are required
    act(() => {
      userEvent.type(input as TargetElement, "71015-154");
      changeInputMaskValue(input as HTMLInputElement, "71015-154");
    });

    expect(mockCep).toBeCalled();
  });

});
