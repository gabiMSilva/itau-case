import { render, fireEvent } from "../../../../jest";
import {
  CoverageResultType,
  CoverageType,
} from "../../../../types/CoverageType";
import CoverageItem from "./";

const coverage: CoverageResultType = {
  id_cobertura: "4cf481d4-4da4-4d31-b054-dfb160e9c9b2",
  importancia_segurada: 10000,
  valor: 22.73,
  franquia: 300,
  franquia_percentual: 10,
  texto_franquia:
    "o valor da participação obrigatória do segurado (franquia) será de 10% das indenizações com mínimo de R$ 300,00",
  identificador: "impacve",
};

describe("CoverageItemComponent", () => {
  it("Should render component", () => {
    const { getByText } = render(
      <CoverageItem coverage={coverage} index={0} />
    );

    expect(getByText(coverage.texto_franquia)).toBeDefined();
  });
  it("Should call onChange function", () => {
    const onChange = jest.fn();

    render(<CoverageItem coverage={coverage} onChange={onChange} index={0} />);

    const checkbox = document.querySelector("input[type=checkbox]");
    expect(checkbox).toBeDefined();

    fireEvent.click(checkbox || document);
    expect(onChange).toBeCalledTimes(1);
  });

  it("Should change value always", () => {
    render(<CoverageItem index={0} coverage={coverage} />);

    const checkbox = document.querySelector("input[type=checkbox]");
    fireEvent.click(checkbox || document);

    expect(checkbox).toHaveProperty("checked", true);
  });
});
