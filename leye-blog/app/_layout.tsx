import { Stack } from "expo-router";
import { useFonts } from "expo-font";

export default function RootLayout() {
  const primaryFont = useFonts({
    "Public-Sans": require("../assets/fonts/PublicSans-Regular.ttf"),
    "Public-Sans-Bold": require("../assets/fonts/PublicSans-Bold.ttf"),
    "Public-Sans-Semi-Bold": require("../assets/fonts/PublicSans-SemiBold.ttf"),
    "Public-Sans-Light": require("../assets/fonts/PublicSans-Light.ttf"),
  });
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="details/[blogId]"
        options={{
          headerTitle: "",
          headerBackButtonDisplayMode: "minimal",
          headerTransparent: true,
        }}
      />
    </Stack>
  );
}
