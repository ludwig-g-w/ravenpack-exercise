import PostCard from "@/components/PostCard";
import PostListItem from "@/components/PostListItem";
import { H1, H2 } from "@/components/ui/typography";
import { trpc } from "@/utils/trpc";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
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
      x: index * SCREEN_WIDTH,
      animated: true,
    });
    setActiveIndex(index);
  };

  return (
    <FlatList
      style={{ flex: 1, backgroundColor: "white", paddingTop: 88 }}
      ListHeaderComponent={
        <>
          <View className="bg-white pt-4 pb-6">
            <H1 className="text-3xl text-center text-indigo-900 font-bold mb-6 px-4">
              Blog Posts
            </H1>
            <ScrollView
              ref={scrollViewRef}
              horizontal
              pagingEnabled
              style={{ height: 280 }}
              showsHorizontalScrollIndicator={false}
              onScroll={handleScroll}
              scrollEventThrottle={16}
              decelerationRate="fast"
            >
              {first5Posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </ScrollView>

            {/* Pagination Dots */}
            <View className="flex-row justify-center items-center mt-4">
              {first5Posts.map((_, index) => (
                <TouchableOpacity
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
      renderItem={({ item }) => <PostListItem post={item} />}
      showsVerticalScrollIndicator={false}
      ItemSeparatorComponent={() => <View className="h-3" />}
      contentContainerStyle={{
        paddingHorizontal: 16,
        paddingBottom: 24,
        paddingTop: 8,
        backgroundColor: "white",
      }}
    />
  );
};

export default Home;
