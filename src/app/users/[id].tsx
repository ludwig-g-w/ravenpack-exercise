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
import { Pressable, View } from "react-native";

const UserPosts = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const userId = parseInt(id || "1", 10);

  const [userQuery] = trpc.postsByUserIdWithUser.useSuspenseQuery(userId);

  return (
    <View className="flex-1 bg-background">
      <View className={`px-4 pb-4 bg-primary pt-safe-offset-24`}>
        <H1 className="text-primary-foreground mb-12">{userQuery.user.name}</H1>
      </View>

      <View className="flex-1 p-4">
        <FlashList
          showsVerticalScrollIndicator={false}
          data={userQuery.posts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <NWLink
              href={`/posts/${item.id}`}
              className="mb-4 active:scale-95 transition-all duration-100"
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
                  <Pressable
                    className="bg-primary px-3 py-1 rounded-md"
                    onPress={() => router.push(`/posts/${item.id}`)}
                  >
                    <Text className="text-primary-foreground text-xs">
                      Read
                    </Text>
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
    </View>
  );
};

export default UserPosts;
