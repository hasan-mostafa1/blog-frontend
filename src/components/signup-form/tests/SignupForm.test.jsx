import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, it, vi } from "vitest";
import SignupForm from "../SignupForm";
import AuthProvider from "../../../providers/AuthProvider";

vi.mock("react-hook-form", () => {
  return {
    useFormContext: () => {
      return {
        handleSubmit: () => {},
        setError: () => {},
        register: () => [],
        formState: { errors: [], isSubmitting: false },
      };
    },
    useWatch: () => {},
  };
});

describe("Signup form snapshot", () => {
  it("Renders correctly", async () => {
    const { container } = render(
      <MemoryRouter>
        <AuthProvider>
          <SignupForm />
        </AuthProvider>
      </MemoryRouter>,
    );
    expect(container).toMatchSnapshot();
  });
});
