import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MemoryRouter } from "react-router";
import Home from "../Home";

describe("Home component snapshot", () => {
  it("Renders correctly", async () => {
    const { container } = render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );

    expect(container).toMatchSnapshot();
  });
});
