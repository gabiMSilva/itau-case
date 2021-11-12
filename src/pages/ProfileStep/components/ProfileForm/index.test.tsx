import ProfileForm from ".";
import { render, fireEvent, act, waitFor } from "../../../../jest";
import { AddressType } from "../../../../types/PofileType";
import TestUtils from "react-dom/test-utils";
import userEvent, { TargetElement } from "@testing-library/user-event";

const cepResponseMock: AddressType = {
  cep: "71015-154",
  logradouro: "QI 18 Bloco O",
  complemento: "",
  bairro: "Guará I",
  localidade: "Brasília",
  uf: "DF",
};

const cepResponseMockError: { erro: boolean } = {
  erro: true,
};

const changeInputMaskValue = (element: HTMLInputElement, value: string) => {
  element.value = value;
  element.selectionStart = element.selectionEnd = value.length;
  TestUtils.Simulate.change(element);
};

const onSubmit = jest.fn();

jest.mock("../../../../services/CepService", () => ({
  getAddresDataByCep: jest.fn(),
}));

const { getAddresDataByCep } = require("../../../../services/CepService");

describe("ProfileFormTest", () => {
  it("should render component", () => {
    const { getByTestId } = render(<ProfileForm onSubmit={onSubmit} />);
    expect(getByTestId("profile-form")).toBeDefined();
  });

  it("should change value on modify input", async () => {
    render(<ProfileForm onSubmit={onSubmit} />);

    const newValue = "new value";

    var input: HTMLInputElement | null =
      document?.querySelector(`input[name=address]`);

    await act(async () => {
      fireEvent.blur(input || document);
      fireEvent.change(input || document, {
        target: { value: newValue },
      });
    });
    expect(input?.value).toBe(newValue);

    input = document?.querySelector(`input[name=city]`);
    await act(async () => {
      fireEvent.blur(input || document);
      fireEvent.change(input || document, {
        target: { value: newValue },
      });
    });
    expect(input?.value).toBe(newValue);

    input = document?.querySelector(`input[name=district]`);
    await act(async () => {
      fireEvent.blur(input || document);
      fireEvent.change(input || document, {
        target: { value: newValue },
      });
    });
    expect(input?.value).toBe(newValue);

    input = document?.querySelector(`input[name=cpf]`);
    await act(async () => {
      fireEvent.blur(input || document);
      fireEvent.change(input || document, {
        target: { value: "123.456.456-12" },
      });
    });
    expect(input?.value).toBe("123.456.456-12");

    input = document?.querySelector(`input[name=name]`);
    await act(async () => {
      fireEvent.blur(input || document);
      fireEvent.change(input || document, {
        target: { value: newValue },
      });
    });
    expect(input?.value).toBe(newValue);

    input = document?.querySelector(`input[name=number]`);
    await act(async () => {
      fireEvent.blur(input || document);
      fireEvent.change(input || document, {
        target: { value: newValue },
      });
    });
    expect(input?.value).toBe(newValue);

    input = document?.querySelector(`input[name=state]`);
    await act(async () => {
      fireEvent.blur(input || document);
      fireEvent.change(input || document, {
        target: { value: newValue },
      });
    });
    expect(input?.value).toBe(newValue);

    input = document?.querySelector(`input[name=complement]`);
    await act(async () => {
      fireEvent.blur(input || document);
      fireEvent.change(input || document, {
        target: { value: newValue },
      });
    });
    expect(input?.value).toBe(newValue);

    // fireEvent.focus(input || document);
    // fireEvent.blur(input || document);
  });

  it("should call api on change cep", async () => {
    getAddresDataByCep.mockImplementation(() =>
      Promise.resolve(cepResponseMock)
    );
    render(<ProfileForm onSubmit={onSubmit} />);
    var input: HTMLInputElement | null =
      document?.querySelector(`input[name=cep]`);

    await act(async () => {
      userEvent.type(input as TargetElement, "71015-154");
      changeInputMaskValue(input as HTMLInputElement, "71015-154");
    });

    expect(
      (document?.querySelector(`input[name=district]`) as HTMLInputElement)
        ?.value
    ).toBe(cepResponseMock.bairro);
  });

  it("should show error on type invalid cep", async () => {
    getAddresDataByCep.mockImplementation(() =>
      Promise.resolve(cepResponseMockError)
    );

    render(<ProfileForm onSubmit={onSubmit} />);
    var input: HTMLInputElement | null =
      document?.querySelector(`input[name=cep]`);

    await act(async () => {
      userEvent.type(input as TargetElement, "12345-678");
      changeInputMaskValue(input as HTMLInputElement, "12345-678");
    });

    await waitFor(() => expect(getAddresDataByCep).toBeCalled());
  });
});
