import { renderRouter, screen, waitFor } from "expo-router/testing-library";
import PostScreen from "../app/posts/[id]";

jest.mock("@/utils/trpc", () => ({
  trpc: {
    postByIdWithUser: {
      useSuspenseQuery: (postId) => [
        {
          post: {
            id: postId,
            title: `Test Post ${postId}`,
            body: `This is the body of test post ${postId}. It contains detailed information about the post.`,
            userId: 1,
          },
          user: {
            id: 1,
            name: "Test User",
            email: "testuser@example.com",
            username: "testuser",
          },
        },
      ],
    },
    commentsByPostId: {
      useSuspenseQuery: (postId) => [
        [
          {
            id: 1,
            postId,
            name: "Comment 1 Title",
            email: "commenter1@example.com",
            body: "This is the first comment on the post.",
          },
          {
            id: 2,
            postId,
            name: "Comment 2 Title",
            email: "commenter2@example.com",
            body: "This is the second comment on the post.",
          },
        ],
      ],
    },
  },
}));

jest.mock("expo-router", () => {
  const actualExpoRouter = jest.requireActual("expo-router");
  return {
    ...actualExpoRouter,
    useLocalSearchParams: () => ({
      id: "1",
    }),
  };
});

describe("PostScreen", () => {
  it("renders the post title correctly", async () => {
    renderRouter(
      {
        "posts/[id]": PostScreen,
      },
      {
        initialUrl: "/posts/1",
      }
    );

    await waitFor(
      () => {
        expect(screen.getByText("Test Post 1")).toBeTruthy();
      },
      { timeout: 3000 }
    );
  });

  it("renders the post body correctly", async () => {
    renderRouter(
      {
        "posts/[id]": PostScreen,
      },
      {
        initialUrl: "/posts/1",
      }
    );

    await waitFor(
      () => {
        expect(
          screen.getByText(
            "This is the body of test post 1. It contains detailed information about the post."
          )
        ).toBeTruthy();
      },
      { timeout: 3000 }
    );
  });

  it("displays author information correctly", async () => {
    renderRouter(
      {
        "posts/[id]": PostScreen,
      },
      {
        initialUrl: "/posts/1",
      }
    );

    await waitFor(
      () => {
        expect(screen.getByText("Test User")).toBeTruthy();
        expect(screen.getByText("@testuser")).toBeTruthy();
        expect(screen.getByText("T")).toBeTruthy();
      },
      { timeout: 3000 }
    );
  });

  it("displays comments correctly", async () => {
    renderRouter(
      {
        "posts/[id]": PostScreen,
      },
      {
        initialUrl: "/posts/1",
      }
    );

    await waitFor(
      () => {
        expect(screen.getByText("Comments")).toBeTruthy();
        expect(screen.getByText("Comment 1 Title")).toBeTruthy();
        expect(screen.getByText("Comment 2 Title")).toBeTruthy();
        expect(screen.getByText("commenter1@example.com")).toBeTruthy();
        expect(screen.getByText("commenter2@example.com")).toBeTruthy();
        expect(
          screen.getByText("This is the first comment on the post.")
        ).toBeTruthy();
        expect(
          screen.getByText("This is the second comment on the post.")
        ).toBeTruthy();
      },
      { timeout: 3000 }
    );
  });

  it("handles different post IDs correctly", async () => {
    jest.spyOn(require("expo-router"), "useLocalSearchParams").mockReturnValue({
      id: "2",
    });

    renderRouter(
      {
        "posts/[id]": PostScreen,
      },
      {
        initialUrl: "/posts/2",
      }
    );

    await waitFor(
      () => {
        expect(screen.getByText("Test Post 2")).toBeTruthy();
        expect(
          screen.getByText(
            "This is the body of test post 2. It contains detailed information about the post."
          )
        ).toBeTruthy();
      },
      { timeout: 3000 }
    );

    jest.spyOn(require("expo-router"), "useLocalSearchParams").mockRestore();
  });

  it("shows empty state when no comments are found", async () => {
    jest
      .spyOn(require("@/utils/trpc").trpc.commentsByPostId, "useSuspenseQuery")
      .mockReturnValue([[]]);

    renderRouter(
      {
        "posts/[id]": PostScreen,
      },
      {
        initialUrl: "/posts/1",
      }
    );

    await waitFor(
      () => {
        expect(screen.getByText("No comments found")).toBeTruthy();
      },
      { timeout: 3000 }
    );

    jest
      .spyOn(require("@/utils/trpc").trpc.commentsByPostId, "useSuspenseQuery")
      .mockRestore();
  });
});
