import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { MemoryRouter } from "react-router";
import ErrorPage from "../ErrorPage";

vi.mock("react-router", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useRouteError: () => {
      return {};
    },
  };
});

describe("ErrorPage component", () => {
  it("Renders correctly", async () => {
    const { container } = render(
      <MemoryRouter>
        <ErrorPage />
      </MemoryRouter>,
    );

    expect(container).toMatchSnapshot();
  });
});
