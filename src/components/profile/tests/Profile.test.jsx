import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { MemoryRouter } from "react-router";
import Profile from "../Profile";
import AuthProvider from "../../../providers/AuthProvider";

vi.mock("../../../hooks/useMyPosts.jsx", () => {
  const posts = {
    data: [
      {
        id: 1,
        title: "First post",
        author: {
          firstName: "Leo",
          lastName: "Messi",
        },
        content: "test test",
        createdAt: "2026-03-25T04:38:14.410Z",
      },
      {
        id: 6,
        title: "Second post",
        author: {
          firstName: "Karim",
          lastName: "Benzema",
        },
        content: "test test",
        createdAt: "2026-03-25T04:38:14.410Z",
      },
      {
        id: 9,
        title: "Third Post",
        author: {
          firstName: "Vini",
          lastName: "Junior",
        },
        content: "test test",
        createdAt: "2026-03-25T04:38:14.410Z",
      },
    ],
    meta: {
      totalPages: 1,
      itemsPerPage: 3,
      totalItems: 3,
    },
  };
  return {
    default: vi.fn(() => ({
      posts,
      error: null,
      loading: false,
      query: {
        sortBy: "createdAt",
        sortOrder: "-",
        searchValue: "",
        currentPage: 1,
      },
      setQuery: vi.fn(() => {}),
    })),
  };
});

describe("Profile component", () => {
  it("Renders correctly", async () => {
    const { container } = render(
      <MemoryRouter>
        <AuthProvider>
          <Profile />
        </AuthProvider>
      </MemoryRouter>,
    );

    expect(container).toMatchSnapshot();
  });
});
