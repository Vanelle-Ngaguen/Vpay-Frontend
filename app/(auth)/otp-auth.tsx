import { router } from "expo-router";
import React, { useRef, useState } from "react";
import {
	Image,
	StyleSheet,
	Text,
	TextInput,
	View
} from "react-native";

const EmailVerification = () => {
	const [code, setCode] = useState(new Array(5).fill(""));
	const inputRefs = useRef<TextInput[]>([]);

	const handleChange = (value: any, index: number) => {
		if (!/^\d?$/.test(value)) return; // Accept only digits or empty

		const newCode = [...code];
		newCode[index] = value;
		setCode(newCode);

		// Move focus
		if (value && index < 4) {
			inputRefs.current[index + 1]?.focus();
		}
	};

	const handleVerify = () => {
		alert(`Verification code entered: ${code.join("")}`);
		router.navigate("/(auth)/login"); // Replace with your Login screen route
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
            {/* Heading */}
            <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
                OTP
            </Text>
			{/* Message */}
			<Text style={styles.message}>
				Please enter the OTP verification code sent to you.
			</Text>

			{/* Code Inputs */}
			<View style={styles.inputRow}>
				{code.map((digit, index) => (
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
				Didn't receive the code?{" "}
				<Text style={styles.resendLink} onPress={handleResend}>
					Resend Code
				</Text>
			</Text>

			{/* Verify Button */}
			{/* <TouchableOpacity style={styles.verifyButton} onPress={() => router.navigate("/(auth)/password-reset")}>
				<Text style={styles.verifyText}>Verify</Text>
			</TouchableOpacity> */}
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
		borderRadius: 25,
	},
	verifyText: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "bold",
	},
});

export default EmailVerification;
