import PostCard from "@/components/PostCard";
import PostListItem from "@/components/PostListItem";
import { H2, P } from "@/components/ui/typography";
import { trpc } from "@/utils/trpc";
import { FlashList } from "@shopify/flash-list";
import React, { useRef, useState } from "react";
import {
  Dimensions,
  Platform,
  Pressable,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const Home = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const [first5Posts] = trpc.first5Posts.useSuspenseQuery();
  const [allPosts] = trpc.allPosts.useSuspenseQuery();

  const handleScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / SCREEN_WIDTH);
    setActiveIndex(index);
  };

  const scrollToIndex = (index: number) => {
    scrollViewRef.current?.scrollTo({
      x: index * (SCREEN_WIDTH - 20),
      animated: true,
    });
    setActiveIndex(index);
  };

  return (
    <View
      className={`flex-1 bg-background ${
        Platform.OS === "ios" ? "pt-safe-offset-20" : "pt-safe-offset"
      }`}
    >
      <FlashList
        estimatedItemSize={200}
        ListHeaderComponent={
          <>
            <View className="bg-white pt-4 pb-6">
              <ScrollView
                ref={scrollViewRef}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                snapToInterval={SCREEN_WIDTH - 20}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                decelerationRate="fast"
                contentContainerStyle={{
                  gap: 20,
                  paddingHorizontal: 16,
                }}
              >
                {first5Posts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </ScrollView>

              {/* Pagination Dots */}
              <View className="flex-row justify-center items-center mt-4">
                {first5Posts.map((_, index) => (
                  <Pressable
                    key={index}
                    onPress={() => scrollToIndex(index)}
                    className={`h-2.5 w-2.5 rounded-full mx-1.5 ${
                      activeIndex === index ? "bg-indigo-600" : "bg-indigo-200"
                    }`}
                  />
                ))}
              </View>
            </View>

            <View className="bg-indigo-200 pt-4 pb-2 px-4 mb-4">
              <H2 className="text-xl text-indigo-900 font-semibold ">
                All Posts
              </H2>
            </View>
          </>
        }
        data={allPosts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View className="px-4">
            <PostListItem post={item} />
          </View>
        )}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View className="h-3" />}
        ListEmptyComponent={() => (
          <View className="flex-1 items-center justify-center">
            <P>No posts found</P>
          </View>
        )}
        contentContainerStyle={{
          paddingBottom: 24,
          paddingTop: 8,
          backgroundColor: "white",
        }}
      />
    </View>
  );
};

export default Home;
