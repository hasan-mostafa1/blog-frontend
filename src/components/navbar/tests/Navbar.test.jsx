import { render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { MemoryRouter } from "react-router";
import Navbar from "../Navbar";
import ThemeProvider from "../../../providers/ThemeProvider";
import userEvent from "@testing-library/user-event";

window.matchMedia = vi.fn(() => {
  return {
    matches: false,
  };
});

describe("Navbar component snapshot", () => {
  it("Renders correctly", async () => {
    const { container } = render(
      <MemoryRouter>
        <ThemeProvider>
          <Navbar />
        </ThemeProvider>
      </MemoryRouter>,
    );

    expect(container).toMatchSnapshot();
  });
});

describe("Toggling theme", () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.dataset.theme = "";
  });

  it("defaults to light theme and writes to local storage and document data-theme", async () => {
    render(
      <ThemeProvider>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </ThemeProvider>,
    );

    await waitFor(() => {
      expect(localStorage.getItem("theme")).toBe("light");
      expect(document.documentElement.dataset.theme).toBe("light");
    });
  });

  it("reads initial theme from localStorage if present", async () => {
    // Arrange
    localStorage.setItem("theme", "dark");

    render(
      <ThemeProvider>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </ThemeProvider>,
    );

    await waitFor(() => {
      expect(document.documentElement.dataset.theme).toBe("dark");
    });
  });

  it("reads initial theme from preferred media settings if no local storage key is set", async () => {
    window.matchMedia = vi.fn(() => {
      return {
        matches: true,
      };
    });

    render(
      <ThemeProvider>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </ThemeProvider>,
    );

    await waitFor(() => {
      expect(document.documentElement.dataset.theme).toBe("dark");
    });
  });

  it("flipping theme, persists to localStorage, and updates <html>.className", async () => {
    const user = userEvent.setup();
    render(
      <ThemeProvider>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </ThemeProvider>,
    );
    const toggleThemeBtn = screen.getByRole("button", { name: "Toggle theme" });

    // light → dark
    user.click(toggleThemeBtn);

    await waitFor(() => {
      expect(localStorage.getItem("theme")).toBe("dark");
      expect(document.documentElement.dataset.theme).toBe("dark");
    });

    // dark → light
    user.click(toggleThemeBtn);

    await waitFor(() => {
      expect(localStorage.getItem("theme")).toBe("light");
      expect(document.documentElement.dataset.theme).toBe("light");
    });
  });
});
