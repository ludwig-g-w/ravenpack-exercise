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
            title: "Home",
            headerLargeTitle: true,
            headerLargeTitleShadowVisible: false,
          }}
        />
        <Stack.Screen name="posts/[id]" options={{ title: "Post" }} />
        <Stack.Screen name="users/[id]" options={{ title: "User" }} />
      </Stack>
    </Providers>
  );
}
