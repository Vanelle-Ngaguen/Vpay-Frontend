import { Config } from "@/constants/Config";
import { AuthContext } from "@/contexts/AuthContext";
import axios, { toFormData } from "axios";
import { CameraType } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import {
	Alert,
	Image,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import {
	Menu,
	MenuOption,
	MenuOptions,
	MenuTrigger,
} from "react-native-popup-menu";

// Define the type for your navigation stack parameters
// This should match the names of the screens defined in your Stack Navigator (e.g., in App.tsx)
type RootStackParamList = {
	Home: undefined; // Assuming 'Home' screen takes no parameters
	// Add other screens here if this component can navigate to them
};

interface Form {
	id: {
		front: ImagePicker.ImagePickerAsset | null;
		back: ImagePicker.ImagePickerAsset | null;
	};
	face: ImagePicker.ImagePickerAsset | null;
}

const KYCVerification = () => {
	const { token } = useContext(AuthContext);
	const [faceCaptured, setFaceCaptured] = useState(false);
	const [form, setForm] = useState<Form>({
		id: { front: null, back: null },
		face: null,
	});

	const handleScan = async (face: CameraType) => {
		const permission = await ImagePicker.requestCameraPermissionsAsync();
		if (!permission.granted) {
			Alert.alert(
				"Permission Denied",
				"Camera permission is required to capture your face.",
			);
			return;
		}

		const result = await ImagePicker.launchCameraAsync({
			allowsEditing: true,
			quality: 1,
			cameraType: ImagePicker.CameraType.back,
			aspect: [16, 9],
		});

		if (result.canceled) {
			Alert.alert(
				"Permission Denied",
				"Camera permission is required to capture your ID.",
			);

			return;
		}

		setForm((value) => ({
			...value,
			id: { ...value.id, [face]: result.assets![0] },
		}));
	};

	const handleUpload = async (face: CameraType) => {
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: "images",
			allowsEditing: true,
			quality: 1,
		}).then((data) => {
			console.log(data);
			if (data.assets?.length && data.assets.length > 0) {
				setForm((prevForm) => ({
					...prevForm,
					id: { ...prevForm.id, [face]: data.assets![0] },
				}));
			}
		});
	};

	const handleFaceCapture = async () => {
		const permission = await ImagePicker.requestCameraPermissionsAsync();
		if (!permission.granted) {
			Alert.alert(
				"Permission Denied",
				"Camera permission is required to capture your face.",
			);
			return;
		}

		const result = await ImagePicker.launchCameraAsync({
			allowsEditing: true,
			quality: 1,
			cameraType: ImagePicker.CameraType.front,
			aspect: [1, 1],
		}).then((data) => {
			if (data.canceled) {
				Alert.alert("Capture Canceled", "No photo was captured.");
			} else {
				setForm((value) => ({ ...value, face: data.assets![0] }));
				setFaceCaptured(true);
			}
		});
	};

	const handleSubmit = () => {
		if (form.id.front && form.id.back && form.face) {
			const formData = new FormData();

			formData.append("id[front]", form.id.front.file!);
			formData.append("id[back]", form.id.back.file!);
			formData.append("face", form.face.file!);

			axios
				.post(`${Config.url.api}/kyc`, formData, {
					headers: {
						Authorization: "Bearer " + token,
						"Content-Type": "multipart/form-data",
					},
				})
				.then(() => {
					Alert.alert(
						"✅ Submitted!",
						"Your documents are under review and may take up to 3 days for validation. We'll notify you once complete.",
					);
					// router.navigate("/(tabs)");
				})
				.catch(() => {
					Alert.alert("❌ Error", "Failed uploading data with server");
				});
		} else {
			Alert.alert(
				"❌ Incomplete",
				"Please complete both ID verification and Face verification before submitting.",
			);
		}
	};

	return (
		<View style={styles.container}>
			{/* <CameraView active={cameraStatus} style={{ height: 400 }} /> */}
			<ScrollView>
				<Text style={styles.description}>
					Please complete the following steps to verify your identity. This
					process ensures the security of your account.
				</Text>

				{/* Step 1: ID Verification */}
				<View style={styles.section}>
					<Text style={styles.stepTitle}>Step 1: ID Verification</Text>
					<Menu>
						<MenuTrigger style={styles.button}>
							{form.id.front ? (
								<Image
									source={{ uri: form.id.front.uri }}
									style={{ width: "100%", aspectRatio: 16 / 9 }}
								/>
							) : (
								<Text>Front</Text>
							)}
						</MenuTrigger>
						<MenuOptions>
							<MenuOption onSelect={() => handleScan("front")} text="Scan" />
							<MenuOption
								onSelect={() => handleUpload("front")}
								text="Upload image"
							/>
						</MenuOptions>
					</Menu>
					<Menu>
						<MenuTrigger style={styles.button}>
							{form.id.back ? (
								<Image
									source={{ uri: form.id.back.uri }}
									style={{ width: "100%", aspectRatio: 16 / 9 }}
								/>
							) : (
								<Text>Back</Text>
							)}
						</MenuTrigger>
						<MenuOptions>
							<MenuOption onSelect={() => handleScan("back")} text="Scan" />
							<MenuOption
								onSelect={() => handleUpload("back")}
								text="Upload image"
							/>
						</MenuOptions>
					</Menu>
				</View>

				{/* Step 2: Face Verification */}
				<View style={styles.section}>
					<Text style={styles.stepTitle}>Step 2: Face Verification</Text>
					<KYCButton
						label="Perform Real-Time Face Capture"
						onPress={handleFaceCapture}
						isCompleted={faceCaptured} // Pass completion status
					/>
					{faceCaptured && (
						<Text style={styles.completionStatus}>Face Captured! ✅</Text>
					)}
				</View>

				{/* Submit */}
				<View style={styles.section}>
					<KYCButton
						label="Submit Verification"
						onPress={handleSubmit}
						customButtonStyle={styles.submitButton} // Apply custom style here
						customButtonTextStyle={styles.submitButtonText} // Apply custom text style here
					/>
				</View>
			</ScrollView>
		</View>
	);
};

// Updated KYCButton component to accept custom styles and completion status
const KYCButton = ({
	label,
	onPress,
	customButtonStyle,
	customButtonTextStyle,
	isCompleted = false, // Default to false
}: {
	label: string;
	onPress: () => void;
	customButtonStyle?: object; // Optional custom style for the button
	customButtonTextStyle?: object; // Optional custom style for the button text
	isCompleted?: boolean;
}) => (
	<TouchableOpacity
		onPress={onPress}
		style={[
			styles.button,
			customButtonStyle, // Apply custom style if provided
			isCompleted && styles.buttonCompleted, // Apply completed style if task is done
		]}
	>
		<Text
			style={[
				styles.buttonText,
				customButtonTextStyle, // Apply custom text style if provided
				isCompleted && styles.buttonTextCompleted, // Apply completed text style
			]}
		>
			{label}
		</Text>
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
		color: "#580097",
	},
	description: {
		fontSize: 16,
		marginBottom: 20,
		textAlign: "center",
		color: "#555",
	},
	section: {
		marginVertical: 15,
		padding: 10,
		borderWidth: 1,
		borderColor: "#eee",
		borderRadius: 10,
		backgroundColor: "#fdfdfd",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.1,
		shadowRadius: 2,
		elevation: 2,
	},
	stepTitle: {
		fontSize: 18,
		fontWeight: "600",
		marginBottom: 15,
		color: "#580097",
		textAlign: "center",
	},
	orText: {
		fontSize: 16,
		color: "#888",
		textAlign: "center",
		marginVertical: 10,
	},
	button: {
		padding: 12,
		borderWidth: 1,
		borderStyle: "dotted",
		borderColor: "#580097",
		borderRadius: 8,
		marginVertical: 8,
		backgroundColor: "#f8f8f8",
		alignItems: "center",
		justifyContent: "center",
		minHeight: 50,
	},
	buttonText: {
		fontSize: 16,
		color: "#000",
		fontWeight: "500",
	},
	submitButton: {
		backgroundColor: "#580097",
		borderColor: "#580097",
		borderStyle: "solid",
		marginTop: 10,
		borderRadius: 25,
	},
	submitButtonText: {
		color: "#fff",
		fontWeight: "bold",
	},
	buttonCompleted: {
		backgroundColor: "#580097",

		borderStyle: "solid",
	},
	buttonTextCompleted: {
		color: "white",
	},
	completionStatus: {
		textAlign: "center",
		marginTop: 5,
		fontSize: 14,
		color: "#580097",
		fontWeight: "bold",
	},
	IdPreview: {
		objectFit: "cover",
	},
	facePreview: {
		objectFit: "cover",
	},
});

export default KYCVerification;
