import { Stack } from "expo-router";

const AppLayout = () => {
	return (
		<Stack screenOptions={{ headerShown: false }}>
			<Stack.Screen name="onboarding" />
		</Stack>
	);
};

export default AppLayout;
