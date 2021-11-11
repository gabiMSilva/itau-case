import { render, fireEvent } from "../../jest";
import { InfoTooltip } from "../";

describe("InfoTooltipComponent", () => {
  it("Should render component", () => {
    const text = "Texto de exemplo";
    const { getByLabelText } = render(<InfoTooltip info={text}></InfoTooltip>);

    expect(getByLabelText(text)).toBeDefined();
  });
  it("Should show text on click", () => {
    const text = "Texto de exemplo";
    const { getByText, queryAllByText, getByTestId } = render(
      <InfoTooltip info={text}></InfoTooltip>
    );

    expect(queryAllByText(text).length).toBe(0);
    fireEvent.click(getByTestId("action-btn"));
    expect(getByText(text)).toBeDefined();
  });
});
