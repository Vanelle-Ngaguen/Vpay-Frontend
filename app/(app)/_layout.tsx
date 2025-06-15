import { Stack } from "expo-router";

const AppLayout = () => {
	return (
		<Stack screenOptions={{ headerShown: true }}>
			<Stack.Screen name="index" />
		</Stack>
	);
};

export default AppLayout;
