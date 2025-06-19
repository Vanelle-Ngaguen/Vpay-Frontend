import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as React from "react";
import { useColorScheme } from "react-native";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";

const App = () => {
	// const segments = useSegments();
	const colorScheme = useColorScheme();
	const [loaded] = useFonts({
		SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
	});

	if (!loaded) {
		// Async font loading only occurs in development.
		return null;
	}

	// Redirect to onboarding if the user is at the root or an invalid route
	// useEffect(() => {
	// 	if (segments.length === 0 || segments[0] === "") {
	// 		router.replace("/(app)/onboarding");
	// 	}
	// }, [segments]);

	return (
		<SafeAreaProvider>
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
		</SafeAreaProvider>
	);
};
export default App;
