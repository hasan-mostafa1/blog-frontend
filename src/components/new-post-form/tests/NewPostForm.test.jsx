import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, it } from "vitest";
import NewPostForm from "../NewPostForm";
import AuthProvider from "../../../providers/AuthProvider";

describe("New post form snapshot", () => {
  it("Renders correctly", async () => {
    const { container } = render(
      <MemoryRouter>
        <AuthProvider>
          <NewPostForm />
        </AuthProvider>
      </MemoryRouter>,
    );
    expect(container).toMatchSnapshot();
  });
});
