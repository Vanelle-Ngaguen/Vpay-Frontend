import { Stack } from "expo-router";

const OnboardingLayout = () => {
	return (
		<Stack screenOptions={{ headerShown: false }}>
			<Stack.Screen name="index"></Stack.Screen>
			<Stack.Screen
				name="onlogin"
				options={{ headerShown: true }}
			></Stack.Screen>
		</Stack>
	);
};

export default OnboardingLayout;
