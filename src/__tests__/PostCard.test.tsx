import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import PostCard from "@/components/PostCard";
import { Post } from "@/types/json-placeholder-api";

describe("PostCard", () => {
  const mockPost: Post = {
    id: 1,
    userId: 1,
    title: "Test Post Title",
    body: "This is a test post body with some content for testing purposes.",
  };

  it("renders correctly with default props", () => {
    const { getByText, queryByText } = render(<PostCard post={mockPost} />);

    // Check if title and body are rendered
    expect(getByText("Test Post Title")).toBeTruthy();
    expect(
      getByText(
        "This is a test post body with some content for testing purposes."
      )
    ).toBeTruthy();

    // Check if the Read More button is rendered
    expect(getByText("Read More")).toBeTruthy();
  });

  it("renders correctly with fullWidth prop", () => {
    const { getByText } = render(<PostCard post={mockPost} fullWidth={true} />);

    // Check if title and body are rendered
    expect(getByText("Test Post Title")).toBeTruthy();
    expect(
      getByText(
        "This is a test post body with some content for testing purposes."
      )
    ).toBeTruthy();
  });

  it("renders correctly with showAnimation set to false", () => {
    const { getByText } = render(
      <PostCard post={mockPost} showAnimation={false} />
    );

    // Check if title and body are rendered without animation
    expect(getByText("Test Post Title")).toBeTruthy();
    expect(
      getByText(
        "This is a test post body with some content for testing purposes."
      )
    ).toBeTruthy();
  });

  it("navigates to post detail when Read More button is pressed", () => {
    const { getByText } = render(<PostCard post={mockPost} />);
    const router = require("expo-router").useRouter();

    // Press the Read More button
    fireEvent.press(getByText("Read More"));

    // Check if router.push was called with the correct path
    expect(router.push).toHaveBeenCalledWith("/posts/1");
  });
});
