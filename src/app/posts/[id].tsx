import { AuthorInfo } from "@/components/AuthorInfo";
import { Comments } from "@/components/Comments";
import { H1, Large } from "@/components/ui/typography";
import { trpc } from "@/utils/trpc";
import { useLocalSearchParams } from "expo-router";
import React, { Suspense } from "react";
import { ScrollView, View } from "react-native";

const PostScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const postId = parseInt(id || "1", 10);

  const [{ post, user }] = trpc.postByIdWithUser.useSuspenseQuery(postId);

  return (
    <ScrollView className="flex-1 bg-background">
      <View className={`px-4 pb-4 bg-primary pt-safe-offset-24`}>
        <H1 className="text-primary-foreground mb-12">{post.title}</H1>
        <AuthorInfo author={user} />
      </View>

      <Large className="px-4 pt-4">{post.body}</Large>

      <Suspense fallback={<Large>Loading...</Large>}>
        <Comments />
      </Suspense>
    </ScrollView>
  );
};

export default PostScreen;
