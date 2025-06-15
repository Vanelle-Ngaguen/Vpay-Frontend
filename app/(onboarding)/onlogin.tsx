import React, { useState } from "react";
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	StyleSheet,
} from "react-native";
import { Link, router } from "expo-router";

const OnboardingLogin = () => {
	const [fullName, setFullName] = useState("");
	const [username, setUsername] = useState("");

	return (
		<View style={styles.container}>
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
						onChangeText={setFullName}
					/>
				</View>
				<View style={styles.inputContainer}>
					<Text style={styles.icon}>🆔</Text>
					<TextInput
						style={styles.input}
						placeholder="Username"
						placeholderTextColor="#888"
						onChangeText={setUsername}
					/>
				</View>
			</View>

			{/* Continue Button Section */}
			<View>
				<TouchableOpacity
					onPress={() =>
						router.push({
							pathname: "/(auth)/signup",
							params: { name: fullName, username },
						})
					}
					style={styles.continueButton}
					disabled={fullName.length < 1 || username.length < 1}
				>
					<Text style={styles.continueButtonText}>Continue</Text>
				</TouchableOpacity>

				<Link
					href="/(auth)/login"
					style={{
						textAlign: "center",
						marginBlockStart: 10,
						textDecorationLine: "underline",
						color: "#580097",
					}}
				>
					I already have an account
				</Link>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
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
		textAlign: "center",
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
	disabledButton: {
		color: "#aaa",
	},
	continueButtonText: {
		fontSize: 16,
		color: "#fff",
	},
});

export default OnboardingLogin;
