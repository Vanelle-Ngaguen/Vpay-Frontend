import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { CardContext } from "@/contexts/CardContext";
import { useState } from "react";
import { Card } from "@/types";
import storage from "@react-native-async-storage/async-storage";
import { Config } from "@/constants/Config";
import axios from "axios";

export default function TabLayout() {
	const [cards, setCards] = useState<Array<Card>>([]);
	const loadCards = async () => {
		const token = await storage.getItem("access_token");

		return axios
			.get(`${Config.url.api}/cards`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((response) => setCards(response.data))
			.catch((reason) => console.warn(reason));
	};

	return (
		<CardContext value={{ cards, setCards, loadCards }}>
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
							return (
								<Ionicons name="swap-horizontal" size={size} color={color} />
							);
						}
					},
				})}
			>
				<Tabs.Screen name="index" options={{ title: "Home" }} />
				<Tabs.Screen name="cards" options={{ title: "Cards" }} />
				<Tabs.Screen name="transaction" options={{ title: "Transactions" }} />
			</Tabs>
		</CardContext>
	);
}
