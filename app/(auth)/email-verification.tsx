import { Config } from "@/constants/Config";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import {
	Image,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import storage from "@react-native-async-storage/async-storage";
import axios from "axios";

const EmailVerification = () => {
	const [otp, setOTP] = useState(new Array(5).fill(""));
	const inputRefs = useRef<TextInput[]>([]);

	const handleChange = (value: any, index: number) => {
		if (!/^\d?$/.test(value)) return; // Accept only digits or empty

		const newCode = [...otp];
		newCode[index] = value;
		setOTP(newCode);

		// Move focus
		if (value && index < 4) {
			inputRefs.current[index + 1]?.focus();
		}
	};

	const handleVerify = () => {
		storage.getItem("access_token").then((token) => {
			axios
				.post(
					`${Config.url.api}/otp/verify`,
					{ otp: otp.join("") },
					{
						headers: {
							Authorization: "Bearer " + token,
						},
					},
				)
				.then(() => router.navigate("/(auth)/login"));
		});
	};

	const handleResend = () => {
		alert("Verification code resent!");
		// Trigger resend logic here
	};

	return (
		<View style={styles.container}>
			{/* Logo/Image */}
			<Image
				source={require("../../assets/images/emailverf.jpg")}
				style={styles.logo}
				resizeMode="contain"
			/>

			{/* Message */}
			<Text style={styles.message}>
				An email has been sent to your email address. Please enter the code
				below to verify your email.
			</Text>

			{/* Code Inputs */}
			<View style={styles.inputRow}>
				{otp.map((digit, index) => (
					<TextInput
						key={index}
						ref={(ref) => {
							if (ref) inputRefs.current[index] = ref;
						}}
						value={digit}
						onChangeText={(value) => handleChange(value, index)}
						maxLength={1}
						keyboardType="number-pad"
						style={styles.inputBox}
					/>
				))}
			</View>

			{/* Resend Link */}
			<Text style={styles.resendText}>
				Didn&apos;t receive the code?{" "}
				<Text style={styles.resendLink} onPress={handleResend}>
					Resend Code
				</Text>
			</Text>

			{/* Verify Button */}
			<TouchableOpacity style={styles.verifyButton} onPress={handleVerify}>
				<Text style={styles.verifyText}>Verify</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		alignItems: "center",
		justifyContent: "center",
	},
	logo: {
		width: 100,
		height: 100,
		marginBottom: 20,
	},
	message: {
		textAlign: "center",
		fontSize: 16,
		marginBottom: 20,
	},
	inputRow: {
		flexDirection: "row",
		justifyContent: "center",
		marginBottom: 20,
		gap: 10,
	},
	inputBox: {
		width: 50,
		height: 50,
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 8,
		textAlign: "center",
		fontSize: 20,
	},
	resendText: {
		marginBottom: 20,
		textAlign: "center",
	},
	resendLink: {
		color: "#580097",
		fontWeight: "bold",
	},
	verifyButton: {
		backgroundColor: "#580097",
		paddingVertical: 12,
		paddingHorizontal: 30,
		borderRadius: 5,
	},
	verifyText: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "bold",
	},
});

export default EmailVerification;
