import { Config } from "@/constants/Config";
import AuthContextProvider, { AuthContext } from "@/contexts/AuthContext";
import { User } from "@/types";
import axios, { AxiosResponse } from "axios";
import { router, Stack } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

const AuthLayout = () => {
	const { token, setToken, setUser } = useContext(AuthContext);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// console.log(token);
		if (token) {
			axios
				.get<User>(`${Config.url.api}/user`)
				.then((response) => {
					router.navigate("/(tabs)");
				})
				.catch(() => {
					// Reset token an user
					setToken();
					setUser();
				});
		}
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
