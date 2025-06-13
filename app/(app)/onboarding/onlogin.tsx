import React from "react";
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";

const OnboardingLogin = () => {
	const router = useRouter();

	const navigateToSignup = () => {
		// Replace 'Signup' with the actual name of your Signup screen in your navigator
		router.push("/(auth)/signup");
	};

	return (
		<View style={styles.container}>
			{/* Header Section */}
			<View style={styles.header}>
				<TouchableOpacity style={styles.backButton}>
					<Text style={styles.backButtonText}>←</Text>
				</TouchableOpacity>
				<Text style={styles.headerTitle}>Unboarding</Text>
			</View>

			{/* Paragraph Section */}
			<View style={styles.section}>
				<Text style={styles.paragraph}>
					Fill in your details to begin your journey with VPay.
				</Text>
			</View>

			{/* Input Fields Section */}
			<View style={styles.section}>
				<View style={styles.inputContainer}>
					<Text style={styles.icon}>👤</Text>
					<TextInput
						style={styles.input}
						placeholder="Full Name"
						placeholderTextColor="#888"
					/>
				</View>
				<View style={styles.inputContainer}>
					<Text style={styles.icon}>🆔</Text>
					<TextInput
						style={styles.input}
						placeholder="Username"
						placeholderTextColor="#888"
					/>
				</View>
			</View>

			{/* Continue Button Section */}
			<View>
				<TouchableOpacity
					onPress={navigateToSignup}
					style={styles.continueButton}
				>
					<Text style={styles.continueButtonText}>Continue</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: "#fff", // Typically, you'd set a background color for the screen
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 20,
	},
	backButton: {
		// No specific styles needed for button itself if only text is inside
	},
	backButtonText: {
		fontSize: 24,
	},
	headerTitle: {
		marginLeft: 10,
		fontSize: 20,
		fontWeight: "bold", // Added bold for better hierarchy
	},
	section: {
		marginBottom: 20,
	},
	paragraph: {
		fontSize: 16,
		color: "#555",
	},
	inputContainer: {
		marginBottom: 10,
		flexDirection: "row",
		alignItems: "center",
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 5,
		paddingLeft: 10, // Added padding left to accommodate the icon
	},
	icon: {
		fontSize: 18,
		color: "#888",
		marginRight: 10, // Space between icon and input
	},
	input: {
		flex: 1, // Make input take remaining space
		height: 40, // Set a fixed height for input
		fontSize: 16,
		paddingVertical: 10, // Vertical padding inside the input
	},
	continueButton: {
		width: "100%",
		padding: 10,
		backgroundColor: "rgba(88, 0, 151, 1)",
		borderRadius: 5,
		alignItems: "center", // Center text horizontally
		justifyContent: "center", // Center text vertically
	},
	continueButtonText: {
		fontSize: 16,
		color: "#fff",
	},
});

export default OnboardingLogin;
