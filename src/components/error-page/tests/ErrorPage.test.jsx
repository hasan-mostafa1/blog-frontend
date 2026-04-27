import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MemoryRouter } from "react-router";
import ErrorPage from "../ErrorPage";

describe("ErrorPage component", () => {
  it("Renders correctly", async () => {
    const { container } = render(
      <MemoryRouter>
        <ErrorPage />
      </MemoryRouter>
    );

    expect(container).toMatchSnapshot();
  });
});
