import { FontAwesome } from '@expo/vector-icons';
import { Link, router } from 'expo-router'; // Make sure 'router' is imported here
import React, { useState } from 'react';
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'; // Import Alert

const ForgotPassword2: React.FC = () => {
    const [email, setEmail] = useState(''); // State to hold email input

    const handleConfirmPress = () => {
        // Basic client-side validation
        if (email.length === 0 || !email.includes('@') || !email.includes('.')) {
            Alert.alert('Invalid Email', 'Please enter a valid email address (e.g., example@domain.com).');
            return; // Stop the function if validation fails
        }

        console.log('--- Button Pressed! ---');
        console.log('Current Email State:', email);

        console.log('Validation passed. Attempting to navigate to OTP page...');
        router.push({
            pathname: "/(auth)/otp-auth",
            params: { email: email }
        });
        console.log('router.push called.');
    };

    return (
        <View style={styles.container}>
            {/* Image Section */}
            <Image
                source={require('../../assets/images/forgot-pwd.jpg')} // Make sure this path is correct
                style={styles.image}
            />

            {/* Heading */}
            <Text style={styles.heading}>
                Ohone Number Verification</Text>

            {/* Paragraph */}
            <Text style={styles.paragraph}>
                Please enter your phone number to receive a verification code.
            </Text>

            {/* Email Input */}
            <View style={styles.inputContainer}>
                <View style={styles.inputWrapper}>
                    <FontAwesome
                        name="phone"
                        size={20}
                        color="rgba(88, 0, 151, 1)"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your phone number"
                        placeholderTextColor="#888"
                        keyboardType="phone-pad"
                        value={email} // Replace with phone state if needed
                        onChangeText={setEmail} // Replace with phone state setter if needed
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                </View>
            </View>
                

            {/* Confirm Button */}
            <TouchableOpacity
                style={styles.button}
                onPress={handleConfirmPress}
            >
                <Text style={styles.buttonText}>Confirm</Text>
            </TouchableOpacity>

            {/* Alternative Verification - Using Link with asChild for proper routing */}
            {/* Added a wrapper View to ensure it takes full width and aligns its children */}
            <View style={styles.alternativeLinkWrapper}>
                <Link href="/(auth)/forgot-pwd" asChild>
                    <TouchableOpacity style={styles.alternativeLinkTouchable}> {/* Give TouchableOpacity full width */}
                        <Text style={styles.alternativeText}>Verify with Email instead</Text>
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
        alignItems: 'center', // This centers children by default
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
        textAlign: 'left',
        alignSelf: 'flex-start',
        width: '100%',
    },
    paragraph: {
        fontSize: 16,
        textAlign: 'left',
        marginBottom: 20,
        color: '#666',
        alignSelf: 'flex-start',
        width: '100%',
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
        alignItems: 'center',
        width: '100%',
        marginBottom: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    // New styles for the alternative link
    alternativeLinkWrapper: {
        width: '100%', // Crucial: make the wrapper take full width
        alignItems: 'flex-start', // Align children to the left within this wrapper
    },
    alternativeLinkTouchable: {
        // No specific styles needed here unless you want to change padding/margins
    },
    alternativeText: {
        fontSize: 14,
        color: '#580097',
        textDecorationLine: 'underline',
        textAlign: 'left', // Crucial: align the text itself to the left
    },
});

export default ForgotPassword2;