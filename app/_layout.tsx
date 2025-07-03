import AuthContextProvider from "@/contexts/AuthContext";
import LoadingContextProvider from "@/contexts/LoadingContext";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as React from "react";
import { MenuProvider } from "react-native-popup-menu";
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
			<LoadingContextProvider>
				<AuthContextProvider>
					<MenuProvider>
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
					</MenuProvider>
				</AuthContextProvider>
			</LoadingContextProvider>
		</SafeAreaProvider>
	);
};
export default App;
