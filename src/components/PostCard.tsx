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
import { Link } from "expo-router";
import React from "react";
import { Dimensions, View } from "react-native";

interface PostCardProps {
  post: Post;
}

const SCREEN_WIDTH = Dimensions.get("window").width;

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <Link href={`/posts/${post.id}`} asChild>
      <Card
        className="overflow-hidden border bg-card rounded-xl active:scale-95 transition-all duration-300"
        style={{ width: SCREEN_WIDTH - 40 }}
      >
        <CardHeader className="bg-indigo-600 pb-3">
          <CardTitle className="text-lg text-white font-bold">
            {post.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4 px-4">
          <Text numberOfLines={4} className="text-base text-gray-800">
            {post.body}
          </Text>
        </CardContent>
        <CardFooter className=" align-bottom justify-end">
          <View className="px-4 py-2 rounded-lg bg-indigo-600">
            <Text className="text-white font-semibold">Read More</Text>
          </View>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default PostCard;
