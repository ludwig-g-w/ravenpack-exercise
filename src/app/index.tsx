import React from "react";
import { Text, View } from "react-native";
import { trpc } from "@/utils/trpc";
import { FlashList } from "@shopify/flash-list";
import { Post } from "@/types/json-placeholder-api";
const Home = () => {
  const firstPost = trpc.first5Posts.useQuery();

  return (
    <View className="flex-1">
      <FlashList
        data={firstPost.data}
        estimatedItemSize={200}
        renderItem={({ item }) => <PostCard post={item} />}
      />
    </View>
  );
};

const PostCard = ({ post }: { post: Post }) => {
  return (
    <View className="p-4 border border-indigo-200 bg-indigo-50 rounded-lg">
      <Text className="text-lg font-bold">{post.title}</Text>
      <Text className="text-sm text-gray-500">{post.body}</Text>
      <Text className="text-sm text-gray-500">{post.userId}</Text>
    </View>
  );
};

export default Home;
