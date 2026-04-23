import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MemoryRouter } from "react-router";
import Home from "../Home";
import AuthProvider from "../../../providers/AuthProvider";

describe("Home component snapshot", () => {
  it("Renders correctly", async () => {
    const { container } = render(
      <MemoryRouter>
        <AuthProvider>
          <Home />
        </AuthProvider>
      </MemoryRouter>,
    );

    expect(container).toMatchSnapshot();
  });
});
