import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import {
	Image,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import storage from "@react-native-async-storage/async-storage";

export const options = {
	title: "Login",
};

const Login = () => {
	const [email, setEmail] = useState<string>();
	const [password, setPassword] = useState<string>();

	const [showPassword, setShowPassword] = useState(false);

	const togglePasswordVisibility = () => setShowPassword(!showPassword);

	const handleLogin = () => {
		fetch("http://192.168.100.117:8000/api/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			body: JSON.stringify({ email, password }),
		})
			.then((response) => response.json())
			.then((data: { token: string }) => {
				console.log("saving acess token", data);
				storage.setItem("access_token", data.token).then(() => {
					console.log("redirecting");
					router.navigate("/(app)");
				});
			})
			.catch(console.log);
	};

	return (
		<View style={styles.container}>
			{/* Section 0: Welcome Back Heading */}
			<View style={styles.section}>
				<Text style={styles.heading}>Welcome Back!</Text>
				<Image
					source={require("../../assets/images/vpaylogo.png")}
					style={styles.logo}
					resizeMode="cover"
				/>
				<Text style={styles.subtext}>Sign in to continue</Text>
			</View>

			{/* Section 2: Input Fields */}
			<View style={styles.section}>
				<View style={styles.inputContainer}>
					<FontAwesome
						name="envelope"
						size={20}
						color="rgba(88, 0, 151, 1)"
						style={styles.icon}
					/>
					<TextInput
						style={styles.input}
						placeholder="Email"
						keyboardType="email-address"
						autoCapitalize="none"
						onChangeText={setEmail}
					/>
				</View>
				<View style={styles.inputContainer}>
					<FontAwesome
						name="lock"
						size={20}
						color="rgba(88, 0, 151, 1)"
						style={styles.icon}
					/>
					<TextInput
						style={styles.input}
						placeholder="Password"
						secureTextEntry={!showPassword}
						onChangeText={setPassword}
					/>
					<TouchableOpacity
						onPress={togglePasswordVisibility}
						style={styles.eyeIcon}
					>
						<MaterialIcons
							name={showPassword ? "visibility-off" : "visibility"}
							size={20}
							color="rgba(88, 0, 151, 1)"
						/>
					</TouchableOpacity>
				</View>
				<Link href="/(auth)/forgot-pwd" style={styles.linkText}>
					<Text style={{ color: "rgba(88, 0, 151, 1)" }}>Forgot Password?</Text>
				</Link>

				<Link href="/(auth)/home" style={styles.linkText}>
					<Text style={{ color: "rgba(88, 0, 151, 1)" }}>HOME?</Text>
				</Link>
				<Link href="/(auth)/card" style={styles.linkText}>
					<Text style={{ color: "rgba(88, 0, 151, 1)" }}>CARD?</Text>
				</Link>
			</View>

			{/* Section 3: Login Button */}
			<View style={styles.section}>
				<TouchableOpacity style={styles.button} onPress={handleLogin}>
					<Text style={styles.buttonText}>Login</Text>
				</TouchableOpacity>
				<Text style={{ ...styles.subtext, marginBlockStart: 2 }}>
					Do not yet have an account?{" "}
					<Link href="/(auth)/signup" style={styles.linkText}>
						Sign Up
					</Link>
				</Text>
			</View>

			{/* Section 4: Sign Up Link */}
			<View style={styles.section}></View>

			{/* Section 5: Login with Google or Apple */}
			<View style={styles.section}>
				<View style={styles.divider}>
					<Text style={styles.subtext}>Or log in with</Text>
				</View>
				<TouchableOpacity style={styles.socialButton}>
					<FontAwesome
						name="google"
						size={20}
						color="#000"
						style={styles.socialIcon}
					/>
					<Text style={styles.socialButtonText}>Google</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.socialButton}>
					<FontAwesome
						name="apple"
						size={20}
						color="#000"
						style={styles.socialIcon}
					/>
					<Text style={styles.socialButtonText}>Apple</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingInline: 25,
		paddingBlock: 20,
		justifyContent: "center",
	},
	section: {
		marginBottom: 20,
	},
	heading: {
		fontSize: 24,
		fontWeight: "bold",
		color: "rgba(88, 0, 151, 1)",
		textAlign: "center",
	},
	logo: {
		width: 75,
		height: 75,
		alignSelf: "center",
	},
	subtext: {
		fontSize: 12,
		color: "rgb(59, 58, 59)",
		textAlign: "center",
	},
	inputContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 10,
		position: "relative",
	},
	input: {
		flex: 1,
		padding: 10,
		paddingLeft: 40,
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 5,
	},
	icon: {
		position: "absolute",
		left: 10,
		zIndex: 1,
	},
	eyeIcon: {
		position: "absolute",
		right: 10,
	},
	button: {
		backgroundColor: "rgba(88, 0, 151, 1)",
		padding: 5,
		borderRadius: 25,
		alignItems: "center",
	},
	buttonText: {
		color: "#fff",
		fontSize: 16,
	},
	linkText: {
		color: "rgba(88, 0, 151, 1)",
		fontSize: 12,
	},
	divider: {
		alignItems: "center",
		marginBottom: 10,
	},
	socialButton: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 10,
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 5,
		marginBottom: 10,
	},
	socialIcon: {
		marginRight: 10,
	},
	socialButtonText: {
		fontSize: 16,
	},
});

export default Login;
