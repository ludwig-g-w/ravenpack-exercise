import { AuthorInfo } from "@/components/AuthorInfo";
import { NWLink } from "@/components/Nativewind";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { H1, H2, Large, P, Small } from "@/components/ui/typography";
import { User } from "@/types/json-placeholder-api";
import { trpc } from "@/utils/trpc";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const PostScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const postId = parseInt(id || "1", 10);
  const safeAreaInsets = useSafeAreaInsets();

  const [postData] = trpc.postById.useSuspenseQuery(postId);
  const [commentsData] = trpc.commentsByPostId.useSuspenseQuery(postId);
  const [userData] = trpc.userById.useSuspenseQuery(postData.userId);

  return (
    <ScrollView className="flex-1 bg-background" overScrollMode="never">
      <View
        className={`px-4 pb-4 bg-primary`}
        style={{
          paddingTop: safeAreaInsets.top + 80,
        }}
      >
        <H1 className="text-primary-foreground mb-12">{postData.title}</H1>
        <AuthorInfo author={userData} />
      </View>

      <View className="p-4">
        <Large>{postData.body}</Large>

        <View className="bg-indigo-200 pt-4 pb-2 px-4 mb-4 mt-12">
          <H2 className="text-xl text-indigo-900 font-semibold ">Comments</H2>
        </View>
        {commentsData.map((comment) => (
          <Card key={comment.id} className="mb-4">
            <CardHeader>
              <CardTitle className="text-base">{comment.name}</CardTitle>
              <Small className="text-muted-foreground">{comment.email}</Small>
            </CardHeader>
            <CardContent>
              <P className="text-sm">{comment.body}</P>
            </CardContent>
          </Card>
        ))}
      </View>
    </ScrollView>
  );
};

export default PostScreen;
