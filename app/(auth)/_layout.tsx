import { Config } from "@/constants/Config";
import { AuthContext } from "@/contexts/AuthContext";
import { LoadingContext } from "@/contexts/LoadingContext";
import { User } from "@/types";
import axios from "axios";
import { router, Stack } from "expo-router";
import { useContext, useEffect } from "react";

const AuthLayout = () => {
	const { token, setToken, setUser } = useContext(AuthContext);
	const { setLoading } = useContext(LoadingContext);

	useEffect(() => {
		// setLoading(true);
		if (!!token) {
			console.log("this is my token");
			axios
				.get<User>(`${Config.url.api}/user`, {
					headers: { Authorization: "Bearer " + token },
				})
				.then((response) => {
					setUser(response.data);
					router.navigate("/(tabs)");
				})
				.catch(() => {
					// Reset token an user
					setToken();
					setUser();
				});
			// .finally(() => setLoading(false));
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
