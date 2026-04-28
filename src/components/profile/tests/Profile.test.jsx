import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { MemoryRouter } from "react-router";
import Profile from "../Profile";
import AuthProvider from "../../../providers/AuthProvider";

describe("Profile component", () => {
  it("Renders correctly", async () => {
    const { container } = render(
      <AuthProvider>
        <MemoryRouter>
          <Profile />
        </MemoryRouter>
      </AuthProvider>,
    );

    expect(container).toMatchSnapshot();
  });
});
