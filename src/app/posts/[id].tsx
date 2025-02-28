import React, { Suspense } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { trpc } from "@/utils/trpc";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { H1, H2, P, Small, Muted, Large, H4 } from "@/components/ui/typography";
import { Text } from "@/components/ui/text";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated from "react-native-reanimated";

const PostContent = ({ postId }: { postId: number }) => {
  const safeAreaInsets = useSafeAreaInsets();
  const router = useRouter();

  const [postData] = trpc.postById.useSuspenseQuery(postId);
  const [commentsData] = trpc.commentsByPostId.useSuspenseQuery(postId);

  return (
    <View className="flex-1 bg-primary">
      <ScrollView className="flex-1 bg-background">
        {/* Header */}
        <Animated.View
          sharedTransitionTag={`post-${postData.id}`}
          className={`px-4 pb-4 bg-primary`}
          style={{
            paddingTop: safeAreaInsets.top + 12,
          }}
        >
          <H1 className="text-primary-foreground">{postData.title}</H1>
          <Muted className="text-primary-foreground/80 mt-1">
            Post #{postData.id} by User #{postData.userId}
          </Muted>
        </Animated.View>

        {/* Post Content */}
        <View className="p-4">
          <Large>{postData.body}</Large>

          {/* Comments Section */}
          <H2 className="my-8">Comments</H2>
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
    </View>
  );
};

const LoadingFallback = () => (
  <View className="flex-1 items-center justify-center">
    <ActivityIndicator size="large" color="#6366f1" />
  </View>
);

const PostDetail = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const postId = parseInt(id || "1", 10);

  return (
    <Suspense fallback={<LoadingFallback />}>
      <PostContent postId={postId} />
    </Suspense>
  );
};

export default PostDetail;
