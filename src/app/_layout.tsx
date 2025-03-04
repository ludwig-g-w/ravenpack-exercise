import Providers from "@/providers";
import { Stack } from "expo-router";
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import "../global.css";
import { Platform, View } from "react-native";

export default function Layout() {
  return (
    <Providers>
      <View className="flex-1 container max-w-screen-lg mx-auto ">
        <Stack>
          <Stack.Screen
            name="index"
            options={{
              ...commonOptions,
              title: "Blog Posts",
              headerLargeTitleShadowVisible: false,
              headerLargeTitle: true,
            }}
          />
          <Stack.Screen
            name="posts/[id]"
            options={{
              ...commonOptions,
              title: "Post",
            }}
          />
          <Stack.Screen
            name="users/[id]"
            options={{
              ...commonOptions,
              title: "User",
            }}
          />
        </Stack>
      </View>
    </Providers>
  );
}

const commonOptions: NativeStackNavigationOptions =
  Platform.OS === "ios"
    ? {
        headerTintColor: "black",
        title: "",
        headerBlurEffect: "regular",
        headerTransparent: true,
      }
    : {
        headerTintColor: "black",
        title: "",
      };
