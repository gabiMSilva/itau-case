import { render } from "../../jest";
import { Navbar } from "../";

describe("NavbarComponent", () => {
  it("Should render component", () => {
    const title = "Texto de exemplo";
    const step = "3";

    const { getByText, getByTestId } = render(
      <Navbar title={title} step={step}></Navbar>
    );

    expect(getByText(step)).toBeDefined();
    expect(getByText(title)).toBeDefined();
    expect(getByTestId("navbar")).toBeDefined();
  });

  it("Should render toltip when sended", () => {
    const title = "Texto de exemplo";
    const step = "3";
    const info = "info";

    const { getByLabelText } = render(
      <Navbar title={title} step={step} info={info}></Navbar>
    );

    expect(getByLabelText(info)).toBeDefined();
  });
});
