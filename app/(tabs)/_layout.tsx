import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: true,
        headerStyle: { backgroundColor: "#580097" },
        headerTintColor: "#fff",
        tabBarActiveTintColor: "purple",
        tabBarInactiveTintColor: "gray",
        tabBarIcon: ({ color, size }) => {
          if (route.name === "index") {
            return <Ionicons name="home" size={size} color={color} />;
          } else if (route.name === "cards") {
            return <MaterialIcons name="wallet" size={size} color={color} />;
          } else if (route.name === "transaction") {
            return <Ionicons name="swap-horizontal" size={size} color={color} />;
          }
        },
      })}
    >
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="cards" options={{ title: "Cards" }} />
      <Tabs.Screen name="transaction" options={{ title: "Transactions" }} />
    </Tabs>
  );
}
