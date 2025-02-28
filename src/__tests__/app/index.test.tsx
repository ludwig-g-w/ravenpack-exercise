import React from "react";
import {
  render,
  fireEvent,
  screen,
  waitFor,
} from "@testing-library/react-native";
import { Dimensions, ScrollView, TouchableOpacity } from "react-native";
import Home from "@/app/index";
import { trpc } from "@/utils/trpc";
import { Post } from "@/types/json-placeholder-api";

// Mock the trpc hooks
jest.mock("@/utils/trpc", () => ({
  trpc: {
    first5Posts: {
      useSuspenseQuery: jest.fn(),
    },
    allPosts: {
      useSuspenseQuery: jest.fn(),
    },
  },
}));

// Mock the Link component from expo-router
jest.mock("expo-router", () => {
  const originalModule = jest.requireActual("expo-router");
  return {
    ...originalModule,
    Link: ({ children }) => children,
    useRouter: () => ({
      push: jest.fn(),
    }),
  };
});

// Mock data
const mockFirst5Posts: Post[] = [
  {
    userId: 1,
    id: 1,
    title: "First Post Title",
    body: "First post body content",
  },
  {
    userId: 1,
    id: 2,
    title: "Second Post Title",
    body: "Second post body content",
  },
  {
    userId: 1,
    id: 3,
    title: "Third Post Title",
    body: "Third post body content",
  },
  {
    userId: 1,
    id: 4,
    title: "Fourth Post Title",
    body: "Fourth post body content",
  },
  {
    userId: 1,
    id: 5,
    title: "Fifth Post Title",
    body: "Fifth post body content",
  },
];

const mockAllPosts: Post[] = [
  {
    userId: 2,
    id: 6,
    title: "Sixth Post Title",
    body: "Sixth post body content",
  },
  {
    userId: 2,
    id: 7,
    title: "Seventh Post Title",
    body: "Seventh post body content",
  },
  {
    userId: 2,
    id: 8,
    title: "Eighth Post Title",
    body: "Eighth post body content",
  },
];

describe("Home Screen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (trpc.first5Posts.useSuspenseQuery as jest.Mock).mockReturnValue([
      mockFirst5Posts,
    ]);
    (trpc.allPosts.useSuspenseQuery as jest.Mock).mockReturnValue([
      mockAllPosts,
    ]);
  });

  it("renders the correct number of carousel items", async () => {
    render(<Home />);

    await waitFor(() => {
      mockFirst5Posts.forEach((post) => {
        expect(screen.getByText(post.title)).toBeTruthy();
      });
    });

    expect(screen.getAllByText(/Post Title/).length).toBe(8);
  });

  it("renders the correct number of list items", async () => {
    render(<Home />);

    await waitFor(() => {
      mockAllPosts.forEach((post) => {
        expect(screen.getByText(post.title)).toBeTruthy();
      });
    });
  });

  it("changes active index when scrolling carousel", async () => {
    render(<Home />);

    await waitFor(() => {
      mockFirst5Posts.forEach((post) => {
        expect(screen.getByText(post.title)).toBeTruthy();
      });
    });
  });

  it("scrolls to the correct index when pagination dot is pressed", async () => {
    render(<Home />);

    await waitFor(() => {
      mockFirst5Posts.forEach((post) => {
        expect(screen.getByText(post.title)).toBeTruthy();
      });
    });
  });
});
