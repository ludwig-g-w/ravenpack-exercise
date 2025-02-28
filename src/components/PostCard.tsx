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

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const router = useRouter();

  return (
    <Card className="overflow-hidden border bg-card rounded-xl w-full">
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
