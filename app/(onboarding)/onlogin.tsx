import { Link, router } from "expo-router";
import React, { useState } from "react";
import {
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";

const OnboardingLogin = () => {
    const [fullName, setFullName] = useState("");
    const [username, setUsername] = useState("");
    const [errorMessage, setErrorMessage] = useState(""); // New state for error message

    const handleContinuePress = () => {
        // Check if full name or username is empty
        if (fullName.length < 1 || username.length < 1) {
            setErrorMessage("Please fill in both your full name and username to continue.");
            return; // Stop the function here, do not navigate
        }

        // If both fields are filled, clear any existing error and navigate
        setErrorMessage(""); // Clear the error message
        router.push({
            pathname: "/(auth)/signup",
            params: { name: fullName, username },
        });
    };

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
                        value={fullName} // Added value prop for controlled component
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.icon}>🆔</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Username"
                        placeholderTextColor="#888"
                        onChangeText={setUsername}
                        value={username} // Added value prop for controlled component
                    />
                </View>
            </View>

            {/* Error Message Display */}
            {errorMessage ? ( // Conditionally render if errorMessage is not empty
                <Text style={styles.errorText}>{errorMessage}</Text>
            ) : null}

            {/* Continue Button Section */}
            <View>
                <TouchableOpacity
                    onPress={handleContinuePress} // Now always clickable
                    style={styles.continueButton}
                    // No 'disabled' prop here anymore, handle logic in onPress
                >
                    <Text style={styles.continueButtonText}>Continue</Text>
                </TouchableOpacity>

                <Link
                    href="/(auth)/login"
                    style={{
                        textAlign: "center",
                        marginTop: 15, // Adjusted margin to provide space
                        textDecorationLine: "underline",
                        color: "#580097",
                        fontSize: 16, // Ensure consistent font size
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
        backgroundColor: "#fff",
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
        paddingLeft: 10,
    },
    icon: {
        fontSize: 18,
        color: "#888",
        marginRight: 10,
    },
    input: {
        flex: 1,
        height: 40,
        fontSize: 16,
        paddingVertical: 10,
    },
    errorText: {
        color: "red", // Style for the error message
        textAlign: "center",
        marginBottom: 10, // Space below the error message
        fontSize: 14,
    },
    continueButton: {
        width: "100%",
        padding: 10,
        backgroundColor: "rgba(88, 0, 151, 1)",
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
    },
    // The 'disabledButton' style is no longer actively used for the 'disabled' prop,
    // but you could adapt it for other visual feedback if desired (e.g., border color on input).
    // For this specific request, it's not needed.
    // disabledButton: {
    //     color: "#aaa",
    // },
    continueButtonText: {
        fontSize: 16,
        color: "#fff",
    },
});

export default OnboardingLogin;