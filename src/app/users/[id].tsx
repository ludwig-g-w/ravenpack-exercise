import { NWLink } from "@/components/Nativewind";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { H1, P, Small } from "@/components/ui/typography";
import { trpc } from "@/utils/trpc";
import { FlashList } from "@shopify/flash-list";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { Platform, Pressable, View } from "react-native";

const UserPosts = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const userId = parseInt(id || "1", 10);

  const [userQuery] = trpc.postsByUserIdWithUser.useSuspenseQuery(userId);

  return (
    <View className="flex-1 bg-background">
      <FlashList
        ListHeaderComponent={
          <>
            <View
              className={`px-4 pb-4 bg-primary ${
                Platform.OS === "ios" ? "pt-safe-offset-20" : "pt-safe-offset-6"
              }`}
            >
              <H1 className="text-primary-foreground mb-12">
                {userQuery.user.name}
              </H1>
            </View>
            <View className="bg-primary-foreground p-4">
              <H1 className="text-primary">Posts</H1>
            </View>
          </>
        }
        showsVerticalScrollIndicator={false}
        estimatedItemSize={200}
        data={userQuery.posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <NWLink
            href={`/posts/${item.id}`}
            className="mb-4 active:scale-95 transition-all duration-100 px-4 w-full flex-1"
          >
            <Card className="flex-1 w-full">
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
                <Pressable
                  className="bg-primary px-3 py-1 rounded-md"
                  onPress={() => router.push(`/posts/${item.id}`)}
                >
                  <Text className="text-primary-foreground text-xs">Read</Text>
                </Pressable>
              </CardFooter>
            </Card>
          </NWLink>
        )}
        ListEmptyComponent={() => (
          <View className="items-center justify-center py-8">
            <P>No posts found for this user</P>
          </View>
        )}
      />
    </View>
  );
};

export default UserPosts;
