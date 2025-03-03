import React from "react";
import { View } from "react-native";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { H2, P, Small } from "./ui/typography";
import { Comment } from "@/types/json-placeholder-api";
import { trpc } from "@/utils/trpc";
import { useLocalSearchParams } from "expo-router";
import { FlashList } from "@shopify/flash-list";

export const Comments = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const postId = parseInt(id || "1", 10);
  const [comments] = trpc.commentsByPostId.useSuspenseQuery(postId);
  return (
    <View className="flex-1">
      <View className="bg-indigo-200 pt-4 pb-2 px-4 mb-4 mt-12">
        <H2 className="text-xl text-indigo-900 font-semibold">Comments</H2>
      </View>
      <View className="flex-1 px-4">
        <FlashList
          data={comments}
          keyExtractor={(item) => item.id.toString()}
          estimatedItemSize={150}
          renderItem={({ item: comment }) => (
            <Card className="mb-4">
              <CardHeader>
                <CardTitle className="text-base">{comment.name}</CardTitle>
                <Small className="text-muted-foreground">{comment.email}</Small>
              </CardHeader>
              <CardContent>
                <P className="text-sm">{comment.body}</P>
              </CardContent>
            </Card>
          )}
          ListEmptyComponent={() => (
            <View className="items-center justify-center py-4">
              <P>No comments found</P>
            </View>
          )}
        />
      </View>
    </View>
  );
};
