import CoverageStep from ".";
import {
  render,
  waitForElementToBeRemoved,
  fireEvent,
  waitFor,
} from "../../jest";
import { CoverageType } from "../../types/CoverageType";
import { MemoryRouter } from "react-router";

const coverages: CoverageType[] = [
  {
    id_cobertura: "idPrimeiro",
    nome: "nome da cobertura",
    descricao: "descrção da cobertuda",
    resumo: "resumo da cobertura",
    cobertura_obrigatoria: true,
    identificador: "2",
  },
  {
    id_cobertura: "idSegundo",
    nome: "nome da cobertura",
    descricao: "descrção da cobertuda",
    resumo: "resumo da cobertura",
    cobertura_obrigatoria: false,
    identificador: "2",
  },
];

const mockedUsedNavigate = jest.fn();
jest.mock("react-router", () => ({
  ...(jest.requireActual("react-router") as any),
  useNavigate: () => mockedUsedNavigate,
}));

jest.mock("../../services/QuestionsService", () => ({
  fetchCoverageOptions: () => Promise.resolve(coverages),
}));

const stateProps = [{ state: { form: { property: { "1": "2" } } } }];

describe("CoverageStep", () => {
  it("Should render Coverage Step page", async () => {
    const { getByTestId } = render(
      <MemoryRouter initialEntries={stateProps}>
        <CoverageStep />
      </MemoryRouter>
    );
    expect(getByTestId("loading")).toBeDefined();

    await waitForElementToBeRemoved(() => getByTestId("loading"));

    expect(getByTestId("coverage-step")).toBeDefined();
  });

  it("Should redirect if not have props", async () => {
    const { getByTestId } = render(
      <MemoryRouter initialEntries={[{ state: {} }]}>
        <CoverageStep />
      </MemoryRouter>
    );
    await waitForElementToBeRemoved(() => getByTestId("loading"));

    expect(mockedUsedNavigate).toBeCalledWith("/");
  });

  it("Should redirect to profile page on submit response", async () => {
    const { getByTestId } = render(
      <MemoryRouter initialEntries={stateProps}>
        <CoverageStep />
      </MemoryRouter>
    );

    await waitForElementToBeRemoved(() => getByTestId("loading"));
    fireEvent.click(getByTestId("submit-button"));

    expect(mockedUsedNavigate).toBeCalled();
    expect(mockedUsedNavigate.mock.calls[0][0]).toBe("/profile");
  });

  it("Checked elements should is in final result", async () => {
    const { getByTestId } = render(
      <MemoryRouter initialEntries={stateProps}>
        <CoverageStep />
      </MemoryRouter>
    );

    await waitForElementToBeRemoved(() => getByTestId("loading"));

    fireEvent.click(
      document.querySelector(`input[name=${coverages[1].id_cobertura}]`) ||
        document
    );
    fireEvent.click(getByTestId("submit-button"));

    await waitFor(() => expect(mockedUsedNavigate).toBeCalled());
    expect(mockedUsedNavigate.mock.calls[0][1].state.form.coverages).toContain(
      coverages[1].id_cobertura
    );
  });

  it("Unchecked elements not contains in final result", async () => {
    const { getByTestId } = render(
      <MemoryRouter initialEntries={stateProps}>
        <CoverageStep />
      </MemoryRouter>
    );

    await waitForElementToBeRemoved(() => getByTestId("loading"));

    fireEvent.click(
      document.querySelector(`input[name=${coverages[1].id_cobertura}]`) ||
        document
    );
    fireEvent.click(
      document.querySelector(`input[name=${coverages[1].id_cobertura}]`) ||
        document
    );

    fireEvent.click(getByTestId("submit-button"));

    expect(
      mockedUsedNavigate.mock.calls[0][1].state.form.coverages
    ).not.toContain(coverages[1].id_cobertura);
  });
});
