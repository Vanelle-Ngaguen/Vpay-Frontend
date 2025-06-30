import { AuthContext } from "@/contexts/AuthContext";
import { User } from "@/types";
import storage from "@react-native-async-storage/async-storage";
import { router, Stack } from "expo-router";
import { useEffect, useState } from "react";

const AuthLayout = () => {
	const [token, setToken] = useState<string | undefined>();
	const [user, setUser] = useState<User | undefined>();

	useEffect(() => {
		// storage.getItem("access_token").then((token) => {
		// 	if (!!token) {
		// 		router.navigate("/(tabs)");
		// 		return;
		// 	}
		// });
	}, []);

	return (
		<AuthContext value={{ token, setToken, user, setUser }}>
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
		</AuthContext>
	);
};

export default AuthLayout;
