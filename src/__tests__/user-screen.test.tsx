import React from "react";
import {
  renderRouter,
  screen,
  waitFor,
  fireEvent,
} from "expo-router/testing-library";
import UserPostsScreen from "../app/users/[id]";

jest.mock("@/utils/trpc", () => ({
  trpc: {
    postsByUserIdWithUser: {
      useSuspenseQuery: (userId) => [
        {
          user: {
            id: userId,
            name: `Test User ${userId}`,
            email: `user${userId}@example.com`,
            username: `testuser${userId}`,
          },
          posts: [
            { id: 1, title: "User Post 1", body: "Test content 1", userId },
            { id: 2, title: "User Post 2", body: "Test content 2", userId },
            { id: 3, title: "User Post 3", body: "Test content 3", userId },
          ],
        },
      ],
    },
  },
}));

const mockPush = jest.fn();
jest.mock("expo-router", () => {
  const actualExpoRouter = jest.requireActual("expo-router");
  return {
    ...actualExpoRouter,
    useRouter: () => ({
      push: mockPush,
    }),
    useLocalSearchParams: () => ({
      id: "1",
    }),
  };
});

describe("UserPostsScreen", () => {
  beforeEach(() => {
    mockPush.mockClear();
  });

  it("renders correctly with user information", async () => {
    renderRouter(
      {
        "users/[id]": UserPostsScreen,
      },
      {
        initialUrl: "/users/1",
      }
    );

    await waitFor(
      () => {
        expect(screen.getByText("Test User 1")).toBeTruthy();
      },
      { timeout: 3000 }
    );

    expect(screen.getByText("Posts")).toBeTruthy();
  });

  it("displays the user's posts", async () => {
    renderRouter(
      {
        "users/[id]": UserPostsScreen,
      },
      {
        initialUrl: "/users/1",
      }
    );

    await waitFor(
      () => {
        expect(screen.getByText("User Post 1")).toBeTruthy();
        expect(screen.getByText("User Post 2")).toBeTruthy();
        expect(screen.getByText("User Post 3")).toBeTruthy();
      },
      { timeout: 3000 }
    );
  });

  it("navigates to post detail when clicking on a post", async () => {
    renderRouter(
      {
        "users/[id]": UserPostsScreen,
      },
      {
        initialUrl: "/users/1",
      }
    );

    await waitFor(
      () => {
        expect(screen.getByText("User Post 1")).toBeTruthy();
      },
      { timeout: 3000 }
    );

    const readButtons = screen.getAllByText("Read");
    fireEvent.press(readButtons[0]);

    expect(mockPush).toHaveBeenCalledWith("/posts/1");
  });

  it("displays post numbers correctly", async () => {
    renderRouter(
      {
        "users/[id]": UserPostsScreen,
      },
      {
        initialUrl: "/users/1",
      }
    );

    await waitFor(
      () => {
        expect(screen.getByText("Post #1")).toBeTruthy();
        expect(screen.getByText("Post #2")).toBeTruthy();
        expect(screen.getByText("Post #3")).toBeTruthy();
      },
      { timeout: 3000 }
    );
  });

  it("handles different user IDs correctly", async () => {
    jest.spyOn(require("expo-router"), "useLocalSearchParams").mockReturnValue({
      id: "2",
    });

    renderRouter(
      {
        "users/[id]": UserPostsScreen,
      },
      {
        initialUrl: "/users/2",
      }
    );

    await waitFor(
      () => {
        expect(screen.getByText("Test User 2")).toBeTruthy();
      },
      { timeout: 3000 }
    );

    jest.spyOn(require("expo-router"), "useLocalSearchParams").mockRestore();
  });

  it("shows empty state when no posts are found", async () => {
    jest
      .spyOn(
        require("@/utils/trpc").trpc.postsByUserIdWithUser,
        "useSuspenseQuery"
      )
      .mockReturnValue([
        {
          user: {
            id: 3,
            name: "Test User 3",
            email: "user3@example.com",
            username: "testuser3",
          },
          posts: [],
        },
      ]);

    renderRouter(
      {
        "users/[id]": UserPostsScreen,
      },
      {
        initialUrl: "/users/3",
      }
    );

    await waitFor(
      () => {
        expect(screen.getByText("No posts found for this user")).toBeTruthy();
      },
      { timeout: 3000 }
    );

    jest
      .spyOn(
        require("@/utils/trpc").trpc.postsByUserIdWithUser,
        "useSuspenseQuery"
      )
      .mockRestore();
  });
});
