import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

// Define the type for your navigation stack parameters
// This should match the names of the screens defined in your Stack Navigator (e.g., in App.tsx)
type RootStackParamList = {
    Home: undefined; // Assuming 'Home' screen takes no parameters
    // Add other screens here if this component can navigate to them
};

export const options = {
    title: "KYC Verification",
};

const KYCVerification = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const [idUploaded, setIdUploaded] = useState(false);
    const [faceCaptured, setFaceCaptured] = useState(false);

    const handleIDScan = (side: "Front" | "Back") => {
        Alert.alert(`Scanning ${side} of ID...`, "Simulating scan success for demo purposes.");
        setIdUploaded(true);
    };

    const handleIDUpload = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            Alert.alert("ID Uploaded", `File URI: ${result.assets[0].uri}`);
            setIdUploaded(true);
        } else {
            Alert.alert("Upload Canceled", "No image was selected for upload.");
        }
    };

    const handleFaceCapture = async () => {
        const permission = await ImagePicker.requestCameraPermissionsAsync();
        if (!permission.granted) {
            Alert.alert("Permission Denied", "Camera permission is required to capture your face.");
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            quality: 1,
            // front: true, // Specify front camera if desired for face capture
        });

        if (!result.canceled) {
            Alert.alert("Face Captured", `Photo URI: ${result.assets[0].uri}`);
            setFaceCaptured(true);
        } else {
            Alert.alert("Capture Canceled", "No photo was captured.");
        }
    };

    const handleSubmit = () => {
        if (idUploaded && faceCaptured) {
            Alert.alert(
                "✅ Submitted!",
                "Your documents are under review and may take up to 3 days for validation. We'll notify you once complete.",
            );
            // Here you would typically send the data to your backend

            // --- NAVIGATE TO HOME PAGE ---
            navigation.navigate('Home'); // This will take the user to the 'Home' screen
            // --- END NAVIGATION ---

        } else {
            Alert.alert(
                "❌ Incomplete",
                "Please complete both ID verification and Face verification before submitting.",
            );
        }
    };

    return (
        <View style={styles.container}>

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
                    isCompleted={idUploaded} // Pass completion status
                />
                <KYCButton
                    label="Scan Back of ID"
                    onPress={() => handleIDScan("Back")}
                    isCompleted={idUploaded} // Pass completion status
                />
                <Text style={styles.orText}>or</Text> {/* Using the new 'orText' style */}
                <KYCButton
                    label="Upload ID from Gallery"
                    onPress={handleIDUpload}
                    isCompleted={idUploaded} // Pass completion status
                />
                {idUploaded && <Text style={styles.completionStatus}>ID Verified! ✅</Text>}
            </View>

            {/* Step 2: Face Verification */}
            <View style={styles.section}>
                <Text style={styles.stepTitle}>Step 2: Face Verification</Text>
                <KYCButton
                    label="Perform Real-Time Face Capture"
                    onPress={handleFaceCapture}
                    isCompleted={faceCaptured} // Pass completion status
                />
                {faceCaptured && <Text style={styles.completionStatus}>Face Captured! ✅</Text>}
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
    },
    description: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
        color: '#555',
    },
    section: {
        marginVertical: 15,
        padding: 10,
        borderWidth: 1,
        borderColor: '#eee',
        borderRadius: 10,
        backgroundColor: '#fdfdfd',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    stepTitle: {
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 15,
        color: '#333',
        textAlign: 'center',
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
        justifyContent: 'center',
        minHeight: 50,
    },
    buttonText: {
        fontSize: 16,
        color: "#000",
        fontWeight: '500',
    },
    submitButton: {
        backgroundColor: "#580097",
        borderColor: "#580097",
        borderStyle: "solid",
        marginTop: 20,
    },
    submitButtonText: {
        color: "#fff",
        fontWeight: "bold",
    },
    buttonCompleted: {
        backgroundColor: '#e0ffe0',
        borderColor: 'green',
        borderStyle: 'solid',
    },
    buttonTextCompleted: {
        color: 'green',
    },
    completionStatus: {
        textAlign: 'center',
        marginTop: 5,
        fontSize: 14,
        color: 'green',
        fontWeight: 'bold',
    }
});

export default KYCVerification; 