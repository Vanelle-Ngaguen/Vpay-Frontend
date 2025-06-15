import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";

export const options = {
	title: "KYC Verification",
};

const KYCVerification = () => {
	const [idUploaded, setIdUploaded] = useState(false);
	const [faceCaptured, setFaceCaptured] = useState(false);

	const handleIDScan = (side: "Front" | "Back") => {
		Alert.alert(`Scanning ${side} of ID...`);
		setIdUploaded(true);
	};

	const handleIDUpload = async () => {
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			quality: 1,
		});

		if (!result.canceled) {
			Alert.alert("ID Uploaded", `File: ${result.assets[0].uri}`);
			setIdUploaded(true);
		}
	};

	const handleFaceCapture = async () => {
		const permission = await ImagePicker.requestCameraPermissionsAsync();
		if (!permission.granted) {
			Alert.alert("Permission Denied", "Camera permission is required.");
			return;
		}

		const result = await ImagePicker.launchCameraAsync({
			allowsEditing: true,
			quality: 1,
		});

		if (!result.canceled) {
			Alert.alert("Face Captured", `Photo: ${result.assets[0].uri}`);
			setFaceCaptured(true);
		}
	};

	const handleSubmit = () => {
		if (idUploaded && faceCaptured) {
			Alert.alert("✅ Success", "Verification submitted successfully!");
		} else {
			Alert.alert(
				"❌ Incomplete",
				"Please complete all steps before submitting.",
			);
		}
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>KYC Verification</Text>
			<Text style={styles.description}>
				Please complete the following steps to verify your identity. This
				process ensures the security of your account.
			</Text>

			{/* Step 1: ID Verification */}
			<View style={styles.section}>
				<Text style={styles.stepTitle}>Step 1: ID Verification</Text>

				<KYCButton
					label="Scan Front of ID"
					onPress={() => handleIDScan("Front")}
				/>
				<KYCButton
					label="Scan Back of ID"
					onPress={() => handleIDScan("Back")}
				/>
				<KYCButton label="Upload ID" onPress={handleIDUpload} />
			</View>

			{/* Step 2: Face Verification */}
			<View style={styles.section}>
				<Text style={styles.stepTitle}>Step 2: Face Verification</Text>
				<KYCButton
					label="Perform Real-Time Face Capture"
					onPress={handleFaceCapture}
				/>
			</View>

			{/* Submit */}
			<View style={styles.section}>
				<KYCButton label="Submit Verification" onPress={handleSubmit} />
			</View>
		</View>
	);
};

const KYCButton = ({
	label,
	onPress,
}: { label: string; onPress: () => void }) => (
	<TouchableOpacity onPress={onPress} style={styles.button}>
		<Text style={styles.buttonText}>{label}</Text>
	</TouchableOpacity>
);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: "#fff",
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 10,
	},
	description: {
		fontSize: 16,
		marginBottom: 20,
	},
	section: {
		marginVertical: 20,
	},
	stepTitle: {
		fontSize: 18,
		fontWeight: "600",
		marginBottom: 10,
	},
	button: {
		padding: 12,
		borderWidth: 1,
		borderStyle: "dotted",
		borderColor: "#000",
		borderRadius: 8,
		marginVertical: 5,
		backgroundColor: "#f8f8f8",
		alignItems: "center",
	},
	buttonText: {
		fontSize: 16,
		color: "#000",
	},
});

export default KYCVerification;
