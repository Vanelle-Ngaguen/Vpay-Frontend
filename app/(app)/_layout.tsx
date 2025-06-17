import { Stack } from "expo-router";

const AppLayout = () => {
	return (
		<Stack
			screenOptions={{
				headerShown: true,
				headerStyle: { backgroundColor: "#580097" },
				headerTintColor: "#fff",
			}}
		>
			<Stack.Screen name="index" options={{ headerShown: false }} />
			<Stack.Screen name="cards" />
		</Stack>
	);
};

export default AppLayout;
