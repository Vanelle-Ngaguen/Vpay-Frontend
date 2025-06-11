import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        
        <Stack.Screen name="index" 
        options={{
          headerTitle: "Vpay",
        }}/>
        <Stack.Screen name="unboarding"
        options={{
          headerTitle: "Unboarding",
        }}/>
        <Stack.Screen name="signup" 
        options={{
          headerTitle: "SignUp"
        }}/>
        
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
