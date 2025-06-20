import { router, Stack } from "expo-router";
import { useEffect } from "react";
import storage from "@react-native-async-storage/async-storage";

const AuthLayout = () => {
	useEffect(() => {
		const token = storage.getItem("access_token").then((token) => {
			if (!!token) {
				router.navigate("/(app)");
			}
		});
	}, []);

	return (
		<Stack
			screenOptions={{
				headerShown: true,
				headerStyle: { backgroundColor: "#580097" },
				headerTintColor: "#ffffff",
				headerTitleStyle: {},
			}}
		>
			<Stack.Screen name="login" options={{ title: "Login" }} />
			<Stack.Screen name="signup" options={{ title: "Sign Up" }} />
			<Stack.Screen
				name="kyc-verification"
				options={{ title: "KYC Verification" }}
			/>
			<Stack.Screen
				name="email-verification"
				options={{ title: "Account Verification" }}
			/>
		</Stack>
	);
};

export default AuthLayout;
