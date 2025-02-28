import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import PostListItem from "@/components/PostListItem";
import { Post } from "@/types/json-placeholder-api";

describe("PostListItem", () => {
  const mockPost: Post = {
    id: 1,
    userId: 1,
    title: "Test Post Title",
    body: "This is a test post body with some content for testing purposes.",
  };

  it("renders correctly", () => {
    const { getByText } = render(<PostListItem post={mockPost} />);

    // Check if title and body are rendered
    expect(getByText("Test Post Title")).toBeTruthy();
    expect(
      getByText(
        "This is a test post body with some content for testing purposes."
      )
    ).toBeTruthy();

    // Check if user ID and Read button are rendered
    expect(getByText("User #1")).toBeTruthy();
    expect(getByText("Read")).toBeTruthy();
  });

  it("navigates to post detail when card is pressed", () => {
    const { getByText } = render(<PostListItem post={mockPost} />);
    const router = require("expo-router").useRouter();

    // Press the card (we'll use the title as a proxy for the card)
    fireEvent.press(getByText("Test Post Title"));

    // Check if router.push was called with the correct path
    expect(router.push).toHaveBeenCalledWith("/posts/1");
  });

  it("navigates to user detail when user button is pressed", () => {
    const { getByText } = render(<PostListItem post={mockPost} />);
    const router = require("expo-router").useRouter();

    // Press the user button
    fireEvent.press(getByText("User #1"));

    // Check if router.push was called with the correct path
    expect(router.push).toHaveBeenCalledWith("/users/1");

    // Verify that event propagation was stopped (router.push should be called only once)
    expect(router.push).toHaveBeenCalledTimes(1);
  });

  it("navigates to post detail when Read button is pressed", () => {
    const { getByText } = render(<PostListItem post={mockPost} />);
    const router = require("expo-router").useRouter();

    // Press the Read button
    fireEvent.press(getByText("Read"));

    // Check if router.push was called with the correct path
    expect(router.push).toHaveBeenCalledWith("/posts/1");

    // Verify that event propagation was stopped (router.push should be called only once)
    expect(router.push).toHaveBeenCalledTimes(1);
  });
});
