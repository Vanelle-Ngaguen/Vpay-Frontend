import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import * as React from "react";
import { useColorScheme } from "react-native";
import "react-native-reanimated";

const App = () => {
	const router = useRouter();
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
		<Stack screenOptions={{ headerShown: false }}>
			<Stack.Screen name="(app)" />
			<Stack.Screen name="(auth)" options={{ headerShown: false }} />
			<Stack.Screen name="+not-found" />
		</Stack>
	);
};
export default App;
