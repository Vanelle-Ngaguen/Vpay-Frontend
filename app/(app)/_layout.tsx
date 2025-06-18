import { Stack } from "expo-router";

export default function AppLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown:  true,
        headerStyle: { backgroundColor: "#580097" },
        headerTintColor: "#fff",
      }}
    >
      {/* This loads the tab layout */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      {/* You can define additional stack screens here, like modals or details */}
      <Stack.Screen name="cards" />
    </Stack>
  );
}
