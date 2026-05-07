import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { MemoryRouter } from "react-router";
import Post from "../Post";

vi.mock("../../../hooks/usePost.jsx", () => {
  const post = {
    data: {
      id: 1,
      title: "First post",
      author: {
        firstName: "Leo",
        lastName: "Messi",
      },
      content: "test test",
      createdAt: "2026-03-25T04:38:14.410Z",
    },
  };
  return {
    default: vi.fn(() => ({
      post,
      error: null,
      loading: false,
      setPost: vi.fn(() => {}),
    })),
  };
});

describe("Post component snapshot", () => {
  it("Renders correctly", async () => {
    const { container } = render(
      <MemoryRouter>
        <Post />
      </MemoryRouter>,
    );

    expect(container).toMatchSnapshot();
  });
});
