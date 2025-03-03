import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Small } from "@/components/ui/typography";
import { Text } from "@/components/ui/text";
import { Post } from "@/types/json-placeholder-api";
import { Link, useRouter } from "expo-router";
import React from "react";
import { Pressable } from "react-native";

interface PostListItemProps {
  post: Post;
}

const PostListItem: React.FC<PostListItemProps> = ({ post }) => {
  const router = useRouter();

  return (
    <Pressable
      onPress={() => router.push(`/posts/${post.id}`)}
      className="active:scale-95 transition-all duration-100"
    >
      <Card className="overflow-hidden border border-gray-200 rounded-lg bg-white">
        <CardHeader className="pb-2 border-b border-gray-100 px-4 pt-3">
          <CardTitle className="text-base text-indigo-900 font-semibold">
            {post.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="py-2 px-4">
          <Text numberOfLines={2} className="text-sm text-gray-700">
            {post.body}
          </Text>
        </CardContent>
        <CardFooter className="flex-row justify-between items-center pt-2 border-t border-gray-100 px-4 pb-3">
          <Link
            href={`/users/${post.userId}`}
            className="px-2 py-1 rounded-full bg-indigo-50"
          >
            <Small className="text-indigo-600 font-medium">
              User #{post.userId}
            </Small>
          </Link>
          <Pressable
            className="bg-indigo-600 px-3 py-1 rounded-md"
            onPress={() => {
              router.push(`/posts/${post.id}`);
            }}
          >
            <Text className="text-white text-xs font-medium">Read</Text>
          </Pressable>
        </CardFooter>
      </Card>
    </Pressable>
  );
};

export default PostListItem;
