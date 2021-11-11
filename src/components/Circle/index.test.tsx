import { render } from "../../jest";
import {Circle} from "../";

describe("CircleComponent", () => {
  it("Should render component", () => {
    const text = "10";
    const { getByText } = render(<Circle content={text}></Circle>);

    expect(getByText(text)).toBeDefined();
  });
});
