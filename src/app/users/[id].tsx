import React from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { trpc } from "@/utils/trpc";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { H1, P, Small } from "@/components/ui/typography";
import { Text } from "@/components/ui/text";

const UserPosts = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const userId = parseInt(id || "1", 10);

  const userQuery = trpc.userById.useQuery(userId);
  const userPostsQuery = trpc.postsByUserId.useQuery(userId);

  if (userQuery.isLoading || userPostsQuery.isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#6366f1" />
      </View>
    );
  }

  if (!userQuery.data) {
    return (
      <View className="flex-1 items-center justify-center">
        <P>User not found</P>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background">
      {/* Header */}
      <View className="px-4 pt-12 pb-4 bg-primary">
        <TouchableOpacity onPress={() => router.back()} className="mb-4">
          <Text className="text-primary-foreground">← Back</Text>
        </TouchableOpacity>
        <H1 className="text-primary-foreground">
          {userQuery.data.name}'s Posts
        </H1>
        <Text className="text-primary-foreground/80 mt-1">
          @{userQuery.data.username} • {userQuery.data.email}
        </Text>
      </View>

      {/* User Posts */}
      <View className="flex-1 p-4">
        <FlatList
          data={userPostsQuery.data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => router.push(`/posts/${item.id}`)}
              className="mb-4"
            >
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="pb-2">
                  <Text numberOfLines={2} className="text-sm">
                    {item.body}
                  </Text>
                </CardContent>
                <CardFooter className="flex-row justify-between items-center">
                  <Small>Post #{item.id}</Small>
                  <TouchableOpacity
                    className="bg-primary px-3 py-1 rounded-md"
                    onPress={() => router.push(`/posts/${item.id}`)}
                  >
                    <Text className="text-primary-foreground text-xs">
                      Read
                    </Text>
                  </TouchableOpacity>
                </CardFooter>
              </Card>
            </TouchableOpacity>
          )}
          ListEmptyComponent={() => (
            <View className="items-center justify-center py-8">
              <P>No posts found for this user</P>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default UserPosts;
