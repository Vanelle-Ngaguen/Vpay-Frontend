import AuthContextProvider, { AuthContext } from "@/contexts/AuthContext";
import storage from "@react-native-async-storage/async-storage";
import { useFonts } from "expo-font";
import { Redirect, Stack, router } from "expo-router";
import * as React from "react";
import { useEffect } from "react";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";

const App = () => {
	// const segments = useSegments();
	const [loaded] = useFonts({
		SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
	});

	if (!loaded) {
		// Async font loading only occurs in development.
		return null;
	}

	return (
		<SafeAreaProvider>
			<AuthContextProvider>
				<Stack
					screenOptions={{
						headerShown: false,
					}}
				>
					<Stack.Screen name="(onboarding)" />
					<Stack.Screen name="(tabs)" />
					<Stack.Screen name="(auth)" options={{ headerShown: false }} />
					<Stack.Screen name="+not-found" />
				</Stack>
			</AuthContextProvider>
		</SafeAreaProvider>
	);
};
export default App;
