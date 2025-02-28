import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { Post } from "@/types/json-placeholder-api";
import { useRouter } from "expo-router";
import React from "react";
import { Dimensions } from "react-native";
import Animated, {
  FadeIn,
  FadeOut,
  SharedTransition,
  SharedTransitionType,
  withSpring,
} from "react-native-reanimated";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

interface PostCardProps {
  post: Post;
  fullWidth?: boolean;
  showAnimation?: boolean;
}

export const transition = SharedTransition.custom((values) => {
  "worklet";
  return {
    height: withSpring(values.targetHeight),
    width: withSpring(values.targetWidth),
  };
})
  .progressAnimation((values, progress) => {
    "worklet";
    const getValue = (
      progress: number,
      target: number,
      current: number
    ): number => {
      return progress * (target - current) + current;
    };
    return {
      width: getValue(progress, values.targetWidth, values.currentWidth),
      height: getValue(progress, values.targetHeight, values.currentHeight),
    };
  })
  .defaultTransitionType(SharedTransitionType.ANIMATION);

const PostCard: React.FC<PostCardProps> = ({
  post,
  fullWidth = false,
  showAnimation = true,
}) => {
  const router = useRouter();

  return (
    <Card
      className="overflow-hidden border bg-card rounded-xl"
      style={{
        width: fullWidth ? "100%" : SCREEN_WIDTH - 32,
      }}
    >
      {showAnimation ? (
        <Animated.View
          entering={FadeIn}
          exiting={FadeOut}
          sharedTransitionTag={`post-${post.id}`}
          sharedTransitionStyle={transition}
        >
          <CardHeader className="bg-indigo-600 pb-3">
            <CardTitle className="text-lg text-white font-bold">
              {post.title}
            </CardTitle>
          </CardHeader>
        </Animated.View>
      ) : (
        <CardHeader className="bg-indigo-600 pb-3">
          <CardTitle className="text-lg text-white font-bold">
            {post.title}
          </CardTitle>
        </CardHeader>
      )}
      <CardContent className="pt-4 px-4">
        <Text numberOfLines={4} className="text-base text-gray-800">
          {post.body}
        </Text>
      </CardContent>
      <CardFooter className="justify-end px-4 pb-4">
        <Button
          className="px-4 py-2 rounded-lg bg-indigo-600"
          onPress={() => router.push(`/posts/${post.id}`)}
        >
          <Text className="text-white font-semibold">Read More</Text>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
