import { render, fireEvent } from "../../jest";
import Home from ".";

const mockedUsedNavigate = jest.fn();
jest.mock("react-router", () => ({
  ...(jest.requireActual("react-router") as any),
  useNavigate: () => mockedUsedNavigate,
}));

describe("HomeTests", () => {
  it("Should render component", () => {
    const { getByTestId } = render(<Home />);

    expect(getByTestId("home")).toBeInTheDocument();
  });

  it("Should go to property paga on click next buttton", () => {
    const { getByTestId } = render(<Home />);

    fireEvent.click(getByTestId("next-button"));

    expect(mockedUsedNavigate.mock.calls[0][0]).toBe("/property");
  });
});
