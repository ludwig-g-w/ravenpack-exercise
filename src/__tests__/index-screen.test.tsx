import React from "react";
import { View, Text } from "react-native";
import {
  renderRouter,
  screen,
  waitFor,
  fireEvent,
} from "expo-router/testing-library";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import IndexScreen from "../app/index";

// Mock the trpc module
jest.mock("@/utils/trpc", () => ({
  trpc: {
    first5Posts: {
      useSuspenseQuery: () => [
        [
          { id: 1, title: "Test Post 1", body: "Test content 1" },
          { id: 2, title: "Test Post 2", body: "Test content 2" },
          { id: 3, title: "Test Post 3", body: "Test content 3" },
          { id: 4, title: "Test Post 4", body: "Test content 4" },
          { id: 5, title: "Test Post 5", body: "Test content 5" },
        ],
      ],
    },
    allPosts: {
      useSuspenseQuery: () => [
        [
          { id: 1, title: "Test Post 6", body: "Test content 6" },
          { id: 2, title: "Test Post 7", body: "Test content 7" },
          // Add more posts as needed
        ],
      ],
    },
  },
}));

// Create a wrapper for the QueryClient
// const createWrapper = () => {
//   const queryClient = new QueryClient({
//     defaultOptions: {
//       queries: {
//         retry: false,
//       },
//     },
//   });

//   return ({ children }) => (
//     <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
//   );
// };

describe("IndexScreen", () => {
  it("renders correctly", async () => {
    // Use renderRouter with an inline file system mock
    renderRouter(
      {
        index: IndexScreen,
      },
      {}
    );

    // Check if the component renders correctly
    // expect(screen.getByTestId("index-screen")).toBeTruthy();
    expect(screen.getByText("All Posts")).toBeTruthy();
  });

  it("renders the first 5 posts", async () => {
    renderRouter(
      {
        index: IndexScreen,
      },
      {}
    );

    await waitFor(
      () => {
        expect(screen.getByText("Test Post 1")).toBeTruthy();
        expect(screen.getByText("Test Post 2")).toBeTruthy();
        expect(screen.getByText("Test Post 3")).toBeTruthy();
        expect(screen.getByText("Test Post 4")).toBeTruthy();
        expect(screen.getByText("Test Post 5")).toBeTruthy();
      },
      { timeout: 3000 }
    );
  });

  it("renders all posts", async () => {
    renderRouter(
      {
        index: IndexScreen,
      },
      {}
    );

    await waitFor(
      () => {
        expect(screen.getByText("Test Post 6")).toBeTruthy();
        expect(screen.getByText("Test Post 7")).toBeTruthy();
      },
      { timeout: 3000 }
    );
  });

  it("on clicking of pagination dot, it scrolls to the post", async () => {
    renderRouter(
      {
        index: IndexScreen,
      },
      {}
    );

    // Wait for the initial render to complete
    await waitFor(
      () => {
        expect(screen.getByText("Test Post 1")).toBeTruthy();
      },
      { timeout: 3000 }
    );

    // Find the second pagination dot using testID
    const secondDot = screen.getByTestId("pagination-dot-1");

    // Click the second pagination dot
    fireEvent.press(secondDot);

    // After clicking, we should verify that the UI has updated to reflect the change
    await waitFor(() => {
      // Check that the second dot now has the active class
      expect(secondDot.props.className).toContain("bg-indigo-600");

      // The first dot should no longer be active
      const firstDot = screen.getByTestId("pagination-dot-0");
      expect(firstDot.props.className).toContain("bg-indigo-200");
    });
  });
});
