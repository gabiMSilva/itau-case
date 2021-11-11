import { render, fireEvent } from "../../../../jest";
import { CoverageType } from "../../../../types/CoverageType";
import CoverageItem from "./";

const coverage: CoverageType = {
  id_cobertura: "1",
  nome: "nome da cobertura",
  descricao: "descrção da cobertuda",
  resumo: "resumo da cobertura",
  cobertura_obrigatoria: true,
  identificador: "2",
};

const optionalCoverage: CoverageType = {
  id_cobertura: "1",
  nome: "nome da cobertura",
  descricao: "descrção da cobertuda",
  resumo: "resumo da cobertura",
  cobertura_obrigatoria: false,
  identificador: "2",
};

describe("CoverageItemComponent", () => {
  it("Should render component", () => {
    const { getByText, getByLabelText } = render(
      <CoverageItem coverage={coverage}></CoverageItem>
    );

    expect(getByText(coverage.nome)).toBeDefined();
    expect(getByText(coverage.descricao)).toBeDefined();
    expect(getByLabelText(coverage.resumo)).toBeDefined();
  });

  it("Should start selected if is required", () => {
    render(<CoverageItem coverage={coverage}></CoverageItem>);

    const checkbox = document.querySelector("input[type=checkbox]");
    expect(checkbox).toHaveProperty("checked", true);
  });

  it("Should not call onChange function if is mandatory coverage", () => {
    const onChange = jest.fn();

    render(
      <CoverageItem coverage={coverage} onChange={onChange}></CoverageItem>
    );

    const checkbox = document.querySelector("input[type=checkbox]");
    expect(checkbox).toBeDefined();

    fireEvent.click(checkbox || document);
    expect(onChange).toBeCalledTimes(0);
  });

  it("Should call onChange function", () => {
    const onChange = jest.fn();

    render(
      <CoverageItem
        coverage={optionalCoverage}
        onChange={onChange}
      ></CoverageItem>
    );

    const checkbox = document.querySelector("input[type=checkbox]");
    expect(checkbox).toBeDefined();

    fireEvent.click(checkbox || document);
    expect(onChange).toBeCalledTimes(1);
  });

  it("Should change value always", () => {
    render(<CoverageItem coverage={optionalCoverage}></CoverageItem>);

    const checkbox = document.querySelector("input[type=checkbox]");
    fireEvent.click(checkbox || document);

    expect(checkbox).toHaveProperty("checked", true);
  });
});
