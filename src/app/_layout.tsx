import Providers from "@/providers";
import { Stack } from "expo-router";
import "../global.css";

export default function Layout() {
  return (
    <Providers>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerBlurEffect: "regular",
            headerTransparent: true,
            title: "Blog Posts",
            headerLargeTitle: true,
            headerLargeTitleShadowVisible: false,
          }}
        />
        <Stack.Screen
          name="posts/[id]"
          options={{
            headerTintColor: "black",
            title: "",
            headerBlurEffect: "regular",
            headerTransparent: true,
          }}
        />
        <Stack.Screen
          name="users/[id]"
          options={{
            headerTintColor: "black",
            title: "",
            headerBlurEffect: "regular",
            headerTransparent: true,
          }}
        />
      </Stack>
    </Providers>
  );
}
