import { Stack } from "expo-router";

const AuthLayout = () => {
	return (
		<Stack screenOptions={{ headerShown: false }}>
			<Stack.Screen name="login" />
			<Stack.Screen name="signup" />
			<Stack.Screen name="kyc-verification" />
			<Stack.Screen name="email-verification" />
		</Stack>
	);
};

export default AuthLayout;
