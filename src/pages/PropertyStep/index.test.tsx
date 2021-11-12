import PropertyStep from ".";
import { render, fireEvent, waitForElementToBeRemoved } from "../../jest";
import { MemoryRouter } from "react-router";
import { QuestionType } from "../../types/QuestionType";

const questionsMock: QuestionType[] = [
  {
    id_questao: "1c1f1c9d-fa98-49f0-8eac-d78ed1e40696",
    texto_questao: "o imóvel está?",
    respostas: [
      {
        id_resposta: 1,
        texto_resposta: "ocupado",
      },
      {
        id_resposta: 2,
        texto_resposta: "desocupado",
      },
    ],
  },
  {
    id_questao: "ca708e31-29cb-46ee-b423-a71bf2dcf9f6",
    texto_questao: "o imóvel foi construído com",
    respostas: [
      {
        id_resposta: 1,
        texto_resposta: "madeira",
      },
      {
        id_resposta: 2,
        texto_resposta:
          "alvenaria (tijolos, cimento, pedras ou blocos de concreto)",
      },
    ],
  },
];

const mockedUsedNavigate = jest.fn();
jest.mock("react-router", () => ({
  ...(jest.requireActual("react-router") as any),
  useNavigate: () => mockedUsedNavigate,
}));

jest.mock("../../services/QuestionsService", () => ({
  fetchOfferQuestions: () => Promise.resolve(questionsMock),
}));

// const { fetchOfferQuestions } = require("../../services/QuestionsService");

describe("PropertyStep", () => {
  it("Should render property step page", async () => {
    const { getByTestId } = render(
      <MemoryRouter
        initialEntries={[{ state: { form: { coverages: ["1", "2"] } } }]}
      >
        <PropertyStep />
      </MemoryRouter>
    );
    await waitForElementToBeRemoved(() => getByTestId("loading"));

    expect(getByTestId("property-step")).toBeDefined();
  });

  it("Should call onSubmit function on click submit buttton", async () => {
    const { getByTestId } = render(
      <MemoryRouter
        initialEntries={[{ state: { form: { property: { "1": "1" } } } }]}
      >
        <PropertyStep />
      </MemoryRouter>
    );
    await waitForElementToBeRemoved(() => getByTestId("loading"));

    fireEvent.click(getByTestId("submit-button"));
  });
});
