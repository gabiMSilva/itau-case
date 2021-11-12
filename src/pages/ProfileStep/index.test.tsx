import ProfileStep from ".";
import { render, fireEvent, waitFor } from "../../jest";
import { MemoryRouter } from "react-router";

const mockedUsedNavigate = jest.fn();
jest.mock("react-router", () => ({
  ...(jest.requireActual("react-router") as any),
  useNavigate: () => mockedUsedNavigate,
}));

const mockAssisances = jest.fn((values) => {
  return Promise.resolve({ mensagem: "funcinaou" });
});

jest.mock("../../services/AssistanceService", () => ({
  ...(jest.requireActual("../../services/AssistanceService") as any),
  postAssistanceData: () => mockAssisances,
}));

describe("ProfileStep", () => {
  it("Should render profile  Step page", () => {
    const { getByTestId } = render(
      <MemoryRouter
        initialEntries={[{ state: { form: { coverages: ["1", "2"] } } }]}
      >
        <ProfileStep />
      </MemoryRouter>
    );

    expect(getByTestId("profile-step")).toBeDefined();
  });

  it("Should redirect if not have props", () => {
    render(
      <MemoryRouter initialEntries={[{ state: {} }]}>
        <ProfileStep />
      </MemoryRouter>
    );
    expect(mockedUsedNavigate).toBeCalledWith("/");
  });

  it("Should call onSubmit function on click submit buttton", () => {
    const { getByTestId } = render(
      <MemoryRouter
        initialEntries={[{ state: { form: { property: { "1": "1" } } } }]}
      >
        <ProfileStep />
      </MemoryRouter>
    );
    fireEvent.click(getByTestId("submit-button"));
  });
});
