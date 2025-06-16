import { FontAwesome } from '@expo/vector-icons';
import { Link, router } from 'expo-router'; // Make sure 'router' is imported here
import React, { useState } from 'react';
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'; // Import Alert

const ForgotPassword: React.FC = () => {
    const [email, setEmail] = useState(''); // State to hold email input

    const handleConfirmPress = () => {
        // Basic client-side validation
        if (email.length === 0 || !email.includes('@') || !email.includes('.')) {
            Alert.alert('Invalid Email', 'Please enter a valid email address (e.g., example@domain.com).');
            return; // Stop the function if validation fails
        }

        // --- Console logs for debugging (you can remove these once it works) ---
        console.log('--- Confirm Button Pressed! ---');
        console.log('Current Email State:', email);
        console.log('Validation passed. Attempting to navigate to OTP page...');
        // --- End Debugging Logs ---

        // This is where the navigation to the OTP page happens
        router.push({
            pathname: "/(auth)/otp-auth",
            params: { email: email } // Optionally pass the email to the OTP page
        });

        console.log('router.push called. Navigation should occur now.'); // Debugging log
    };

    return (
        <View style={styles.container}>
            {/* Image Section */}
            <Image
                source={require('../../assets/images/forgot-pwd.jpg')} // Make sure this path is correct
                style={styles.image}
            />

            {/* Heading */}
            <Text style={styles.heading}>E-mail Verification</Text>

            {/* Paragraph */}
            <Text style={styles.paragraph}>
                Please enter your email address to receive a verification code.
            </Text>

            {/* Email Input */}
            <View style={styles.inputContainer}>
                <View style={styles.inputWrapper}>
                    <FontAwesome
                        name="envelope"
                        size={20}
                        color="rgba(88, 0, 151, 1)"
                        style={styles.inputIcon}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your email address"
                        placeholderTextColor="#888"
                        keyboardType="email-address"
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                </View>
            </View>

            {/* Confirm Button - Corrected for navigation */}
            <TouchableOpacity
                style={styles.button}
                onPress={handleConfirmPress} // This triggers the navigation
            >
                {/* Do NOT put a <Link> component directly inside a <TouchableOpacity> */}
                <Text style={styles.buttonText}>Confirm</Text>
            </TouchableOpacity>

            {/* Alternative Verification - Using Link with asChild for proper routing and left alignment */}
            <View style={styles.alternativeLinkWrapper}>
                <Link href="/(auth)/forgot-pwd2" asChild>
                    <TouchableOpacity style={styles.alternativeLinkTouchable}>
                        <Text style={styles.alternativeText}>Verify with phone number instead</Text>
                    </TouchableOpacity>
                </Link>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center', // Centers items horizontally by default in a column layout
        backgroundColor: '#fff',
    },
    image: {
        width: 150,
        height: 150,
        marginBottom: 20,
        resizeMode: 'contain',
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'left', // Aligns text inside this component
        alignSelf: 'flex-start', // Aligns this component within its parent
        width: '100%', // Ensures it takes full width to allow text align left
    },
    paragraph: {
        fontSize: 16,
        textAlign: 'left', // Aligns text inside this component
        marginBottom: 20,
        color: '#666',
        alignSelf: 'flex-start', // Aligns this component within its parent
        width: '100%', // Ensures it takes full width to allow text align left
    },
    inputContainer: {
        width: '100%',
        marginBottom: 20,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 10,
    },
    inputIcon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        fontSize: 16,
        paddingVertical: 10,
    },
    button: {
        backgroundColor: '#580097',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center', // Centers text within the button
        width: '100%',
        marginBottom: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    // Styles for the alternative link (Verify with phone number instead)
    alternativeLinkWrapper: {
        width: '100%', // Crucial: make the wrapper take full width
        alignItems: 'flex-start', // Aligns children (the Link/TouchableOpacity) to the left within this wrapper
        marginTop: 5, // Add some top margin for separation if needed
    },
    alternativeLinkTouchable: {
        // No specific styles needed here for alignment, as it inherits from wrapper
        // You can add padding/margin here if you want it different from default touchable area
    },
    alternativeText: {
        fontSize: 14,
        color: '#580097',
        textDecorationLine: 'underline',
        textAlign: 'left', // Aligns the text content itself to the left
    },
});

export default ForgotPassword;