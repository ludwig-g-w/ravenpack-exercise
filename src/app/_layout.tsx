import "../global.css";
import { Slot, Stack } from "expo-router";
import Providers from "@/providers";

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
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="users/[id]"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </Providers>
  );
}
