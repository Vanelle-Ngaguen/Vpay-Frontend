import { Stack } from "expo-router";

const OnboardingLayout = () => {
	return (
		<Stack screenOptions={{ headerShown: false }}>
			<Stack.Screen name="index" />
			<Stack.Screen name="onlogin" />
		</Stack>
	);
};

export default OnboardingLayout;
