import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	TextInput,
	Image,
	TouchableOpacity,
	StyleSheet,
} from "react-native";
import { FontAwesome, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";

const SignUp = () => {
	const { name, username } = useLocalSearchParams();
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const togglePasswordVisibility = () => setShowPassword(!showPassword);
	const toggleConfirmPasswordVisibility = () =>
		setShowConfirmPassword(!showConfirmPassword);

	useEffect(() => {
		if (!name || !username) {
			router.navigate("/(onboarding)/onlogin");
		}
	}, [name, username]);

	return (
		<View style={styles.container}>
			{/* Logo Section */}
			<View style={styles.logoContainer}>
				<Image
					source={require("../../assets/images/vpaylogo.png")}
					style={styles.logo}
					resizeMode="contain"
				/>
				<Text>
					Hello,{" "}
					<Text style={{ textTransform: "capitalize", fontWeight: "bold" }}>
						{name}
					</Text>
				</Text>
			</View>

			{/* Input Fields */}
			<View style={styles.inputContainer}>
				<View style={styles.inputWrapper}>
					<FontAwesome name="phone" style={styles.icon} />
					<TextInput placeholder="Phone Number" style={styles.input} />
				</View>

				<View style={styles.inputWrapper}>
					<FontAwesome name="envelope" style={styles.icon} />
					<TextInput
						placeholder="Email"
						keyboardType="email-address"
						style={styles.input}
					/>
				</View>

				<View style={styles.inputWrapper}>
					<FontAwesome name="lock" style={styles.icon} />
					<TextInput
						placeholder="Password"
						secureTextEntry={!showPassword}
						style={styles.input}
					/>
					<TouchableOpacity
						onPress={togglePasswordVisibility}
						style={styles.eyeIcon}
					>
						<FontAwesome5
							name={showPassword ? "eye-slash" : "eye"}
							size={20}
							color="#580097"
						/>
					</TouchableOpacity>
				</View>

				<View style={styles.inputWrapper}>
					<FontAwesome name="lock" style={styles.icon} />
					<TextInput
						placeholder="Confirm Password"
						secureTextEntry={!showConfirmPassword}
						style={styles.input}
					/>
					<TouchableOpacity
						onPress={toggleConfirmPasswordVisibility}
						style={styles.eyeIcon}
					>
						<FontAwesome5
							name={showConfirmPassword ? "eye-slash" : "eye"}
							size={20}
							color="#580097"
						/>
					</TouchableOpacity>
				</View>
			</View>

			{/* Sign Up Button */}
			<TouchableOpacity
				style={styles.button}
				onPress={() => router.navigate("/(auth)/email-verification")} // Replace with your screen name
			>
				<Text style={styles.buttonText}>Create an Account</Text>
			</TouchableOpacity>

			{/* Already have account */}
			<Text style={styles.loginText}>
				Already have an account?{" "}
				<Text
					style={styles.loginLink}
					onPress={() => router.navigate("/(auth)/login")} // Replace with your login screen
				>
					Log in
				</Text>
			</Text>

			{/* Or login with */}
			<View style={styles.orDivider}>
				<View style={styles.line} />
				<Text style={styles.orText}>Or log in with</Text>
				<View style={styles.line} />
			</View>

			<TouchableOpacity style={styles.socialButton}>
				<FontAwesome5
					name="google"
					size={20}
					color="#DB4437"
					style={{ marginRight: 10 }}
				/>
				<Text>Google</Text>
			</TouchableOpacity>

			<TouchableOpacity style={styles.socialButton}>
				<FontAwesome
					name="apple"
					size={20}
					color="#000"
					style={{ marginRight: 10 }}
				/>
				<Text>Apple</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		justifyContent: "center",
	},
	logoContainer: {
		alignItems: "center",
		marginBottom: 20,
	},
	logo: {
		width: 150,
		height: 80,
	},
	inputContainer: {
		marginBottom: 20,
	},
	inputWrapper: {
		flexDirection: "row",
		alignItems: "center",
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 5,
		marginBottom: 10,
		paddingHorizontal: 10,
	},
	icon: {
		color: "#580097",
		fontSize: 18,
		marginRight: 10,
	},
	input: {
		flex: 1,
		paddingVertical: 10,
	},
	eyeIcon: {
		marginLeft: 5,
	},
	button: {
		backgroundColor: "#580097",
		paddingVertical: 12,
		borderRadius: 5,
		alignItems: "center",
		marginBottom: 20,
	},
	buttonText: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "bold",
	},
	loginText: {
		textAlign: "center",
		marginBottom: 20,
	},
	loginLink: {
		color: "#580097",
		textDecorationLine: "underline",
	},
	orDivider: {
		flexDirection: "row",
		alignItems: "center",
		marginVertical: 10,
	},
	line: {
		flex: 1,
		height: 1,
		backgroundColor: "#ccc",
	},
	orText: {
		marginHorizontal: 10,
		color: "#999",
	},
	socialButton: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: 12,
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 5,
		marginBottom: 10,
	},
});

export default SignUp;
