// frontend/VPayApp/screens/Main/WalletScreen.tsx
import { MaterialCommunityIcons } from '@expo/vector-icons'; // For icons
import { useFocusEffect } from '@react-navigation/native'; // Hook to refetch data when screen comes into focus
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Alert, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

// Define the interface for a VirtualCard object
interface VirtualCard {
    id: string;
    cardType: 'one-time' | 'reloadable';
    cardNumberMasked: string;
    expiryDate: string;
    currentBalance: number; // Current balance is a number
    status: 'active' | 'frozen' | 'deleted';
}

// WalletScreen component - designed as a standalone page/screen
const WalletScreen = () => { 
    // Removed userId as it was assigned a value but never used in this simulated environment.
    // const userId: string = 'dummyUser123'; // This line has been removed.

    // State variables with explicit TypeScript type annotations
    const [virtualCards, setVirtualCards] = useState<VirtualCard[]>([]); // Array of virtual card objects
    const [selectedCard, setSelectedCard] = useState<VirtualCard | null>(null); // The currently selected card, can be null
    const [phoneNumber, setPhoneNumber] = useState<string>(''); // Phone number input, stored as string
    const [amountFcfa, setAmountFcfa] = useState<string>(''); // Amount input, stored as string (for TextInput)
    const [loading, setLoading] = useState<boolean>(false); // Loading state for fund button
    const [fetchingCards, setFetchingCards] = useState<boolean>(true); // Loading state for initial data fetch
    const [mainWalletBalance, setMainWalletBalance] = useState<number>(0); // User's main wallet balance

    // State to control the visibility of the funding modal
    const [isFundModalVisible, setFundModalVisible] = useState<boolean>(false);

    /**
     * Fetches dummy data for virtual cards and the main wallet balance.
     * In a real application, this function would make actual API calls to your backend.
     * It's wrapped in `useCallback` to optimize performance by preventing unnecessary re-creations.
     */
    const fetchData = useCallback(async (): Promise<void> => {
        console.log("Simulating fetching data for Wallet Screen...");
        setFetchingCards(true); // Indicate that data fetching has started
        try {
            // Simulate a network request delay
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Dummy data for virtual cards. We only consider 'reloadable' and 'active' cards.
            const dummyCards: VirtualCard[] = [
                { id: 'vc-1', cardType: 'reloadable', cardNumberMasked: '**** **** **** 1234', expiryDate: '12/26', currentBalance: 50.75, status: 'active' },
                { id: 'vc-2', cardType: 'reloadable', cardNumberMasked: '**** **** **** 5678', expiryDate: '08/25', currentBalance: 120.00, status: 'active' },
                { id: 'vc-3', cardType: 'one-time', cardNumberMasked: '**** **** **** 9012', expiryDate: '01/24', currentBalance: 10.00, status: 'active' }, 
                { id: 'vc-4', cardType: 'reloadable', cardNumberMasked: '**** **** **** 3456', expiryDate: '06/27', currentBalance: 25.50, status: 'frozen' }, 
            ];
            
            // Filter dummy cards to only include those that are reloadable and active
            const reloadableCards: VirtualCard[] = dummyCards.filter(card => card.cardType === 'reloadable' && card.status === 'active');
            setVirtualCards(reloadableCards);
            
            // Logic to automatically select the first reloadable card if none is currently selected,
            // or ensure the previously selected card is still valid.
            if (reloadableCards.length > 0 && !selectedCard) {
                setSelectedCard(reloadableCards[0]);
            } else if (reloadableCards.length > 0 && selectedCard) {
                const foundSelected = reloadableCards.find((card: VirtualCard) => card.id === selectedCard.id);
                if (!foundSelected) {
                    setSelectedCard(reloadableCards[0]);
                }
            } else if (reloadableCards.length === 0) {
                setSelectedCard(null); // No reloadable cards found, so no card can be selected
            }

            // Set a dummy main wallet balance for demonstration
            setMainWalletBalance(150000); 

        } catch (error: any) { // Using 'any' for error type for broad error catching
            console.error('Error simulating data fetch:', error.message);
            Alert.alert('Error', 'Failed to load data (simulation error). Please check console for details.');
        } finally {
            setFetchingCards(false); // Indicate that data fetching has completed
        }
    }, [selectedCard]); // `fetchData` depends on `selectedCard` because of the auto-selection logic

    /**
     * `useFocusEffect` hook from `@react-navigation/native` is used to trigger `fetchData`
     * whenever this screen comes into focus. This ensures the data is fresh if the user
     * navigates back to this screen from another part of the app.
     */
    useFocusEffect(
        useCallback(() => {
            fetchData(); // Call the data fetching function
            return () => {
                // Optional: Cleanup function if you have any subscriptions or listeners
                // that need to be cleared when the screen loses focus.
            };
        }, [fetchData]) // `useFocusEffect`'s callback depends on `fetchData`
    );

    /**
     * Handles the submission of the virtual card funding form.
     * This function simulates the process of funding a virtual card.
     */
    const handleFundCardSubmit = async (): Promise<void> => {
        // --- Form Validation ---
        if (!selectedCard) {
            Alert.alert('Selection Required', 'Please select a virtual card to fund.');
            return;
        }
        if (!phoneNumber) {
            Alert.alert('Input Required', 'Please enter your Mobile Money phone number.');
            return;
        }
        // Convert amount input string to a number for validation and calculations
        const amount: number = parseFloat(amountFcfa);
        if (isNaN(amount) || amount <= 0) {
            Alert.alert('Invalid Amount', 'Please enter a valid amount to fund (e.g., 10000).');
            return;
        }

        // Check if the funding amount exceeds the user's main wallet balance
        if (amount > mainWalletBalance) {
            Alert.alert('Insufficient Funds', `Your main wallet balance (FCFA ${mainWalletBalance.toLocaleString()}) is not enough for this amount.`);
            return;
        }

        setLoading(true); // Activate loading spinner on the fund button
        try {
            // --- Simulate Backend API Call ---
            // In a real application, you would send this `amount` and `selectedCard.id`
            // to your backend. Your backend would then handle the interaction with
            // the actual Straw Wallet API to fund the card and update your database.
            console.log(`Simulating funding card ${selectedCard.cardNumberMasked} with FCFA ${amountFcfa} via phone ${phoneNumber}`);
            await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate a 2-second network request delay

            // --- Success Feedback and UI Update ---
            Alert.alert('Funding Initiated', `Card funding process for ${selectedCard.cardNumberMasked}  FCFA. please comfirm the transaction ${amount}!`);
            
            // Simulate updating the main wallet balance by deducting the funded amount
            setMainWalletBalance((prev: number) => prev - amount); 
            
            // Simulate updating the selected card's balance
            setSelectedCard((prev: VirtualCard | null) => { 
                if (prev) {
                    return {
                        ...prev,
                        // Dummy conversion: Assuming 1 USD = 600 FCFA for demonstration purposes
                        currentBalance: prev.currentBalance + (amount / 600) 
                    };
                }
                return null; // Should not happen if selectedCard is checked above
            });
            
            // Clear the input fields and close the modal after successful submission
            setAmountFcfa(''); 
            setPhoneNumber(''); 
            setFundModalVisible(false); // Close the modal

        } catch (error: any) {
            console.error('Simulated fund card error:', error.message);
            Alert.alert('Funding Failed ', 'Failed to fund card. Please try again.');
        } finally {
            setLoading(false); // Deactivate loading spinner
        }
    };

    return (
        <ScrollView style={styles.scrollViewContainer} contentContainerStyle={styles.container}>
            
            

            {/* Button to open the funding modal */}
            <TouchableOpacity 
                style={styles.openFundModalButton} 
                onPress={() => setFundModalVisible(true)} // Opens the modal
            >
                <MaterialCommunityIcons name="plus-circle-outline" size={24} color="#FFFFFF" />
                <Text style={styles.openFundModalButtonText}>Fund a Virtual Card</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={styles.openFundModalButton} 
                onPress={() => setFundModalVisible(true)} // Opens the modal
            >
                <MaterialCommunityIcons name="plus-circle-outline" size={24} color="#FFFFFF" />
                <Text style={styles.openFundModalButtonText}>Fund Main Account</Text>
            </TouchableOpacity>

            {/* Funding Modal Component */}
            <Modal
                animationType="slide" // Slide up/down animation for the modal
                transparent={true} // Allows background content to be seen (dimmed)
                visible={isFundModalVisible} // Controls modal visibility
                onRequestClose={() => setFundModalVisible(false)} // Handles closing with Android's back button
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalTitle}>Fund Your Virtual Card</Text>
                        <TouchableOpacity 
                            style={styles.closeModalButton} 
                            onPress={() => setFundModalVisible(false)} // Closes the modal
                        >
                            <MaterialCommunityIcons name="close-circle-outline" size={28} color="#666666" />
                        </TouchableOpacity>

                        {/* Section for Card Selection within the Modal */}
                        <View style={styles.sectionInModal}>
                            <Text style={styles.sectionTitle}>1. Choose a Card to Fund:</Text>
                            {fetchingCards ? ( // Show spinner during card data fetch
                                <ActivityIndicator size="large" color="#1A73E8" style={styles.spinner} />
                            ) : virtualCards.length === 0 ? (
                                // Message if no reloadable cards are found
                                <View style={styles.emptyCardsContainer}>
                                    <MaterialCommunityIcons name="credit-card-off-outline" size={60} color="#666666" />
                                    <Text style={styles.emptyCardsText}>No active reloadable virtual cards found. Please create one first.</Text>
                                    <TouchableOpacity
                                        style={[styles.button, styles.secondaryButton]}
                                        onPress={() => { 
                                            Alert.alert('Navigate', 'This would navigate to the Virtual Card Creation screen.'); 
                                            setFundModalVisible(false); // Close modal before attempting navigation
                                        }}
                                    >
                                        <Text style={[styles.buttonText, styles.secondaryButtonText]}>Create New Card</Text>
                                    </TouchableOpacity>
                                </View>
                            ) : (
                                // Horizontal scrollable list of virtual cards for selection
                                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.cardSelector}>
                                    {virtualCards.map((card: VirtualCard) => ( 
                                        <TouchableOpacity
                                            key={card.id}
                                            style={[
                                                styles.cardOption,
                                                selectedCard?.id === card.id && styles.selectedCardOption, // Highlight selected card
                                            ]}
                                            onPress={() => setSelectedCard(card)} // Set the selected card
                                        >
                                            <MaterialCommunityIcons name="credit-card-outline" size={24} color={selectedCard?.id === card.id ? '#FFFFFF' : '#1A73E8'} />
                                            <Text style={[styles.cardOptionText, selectedCard?.id === card.id && styles.selectedCardOptionText]}>
                                                {card.cardNumberMasked}
                                            </Text>
                                            <Text style={[styles.cardOptionBalance, selectedCard?.id === card.id && { color: '#FFFFFF' }]}>
                                                Bal: ${card.currentBalance.toFixed(2)} {/* Using toFixed for string display */}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </ScrollView>
                            )}

                            {/* Display details of the currently selected card within the modal */}
                            {selectedCard && (
                                <View style={styles.selectedCardInfo}>
                                    <Text style={styles.selectedCardText}>Selected Card: <Text style={styles.selectedCardValue}>{selectedCard.cardNumberMasked}</Text></Text>
                                    <Text style={styles.selectedCardText}>Type: <Text style={styles.selectedCardValue}>{selectedCard.cardType === 'one-time' ? 'One-Time Use' : 'Reloadable'}</Text></Text>
                                    <Text style={styles.selectedCardText}>Current Card Balance: <Text style={styles.selectedCardValue}>${selectedCard.currentBalance.toFixed(2)}</Text></Text>
                                
                                </View>
                            )}
                        </View>

                        {/* Section for Funding Details Form Fields within the Modal */}
                        <View style={styles.sectionInModal}>
                            <Text style={styles.sectionTitle}>2. Funding Details:</Text>
                            
                            {/* Mobile Money Phone Number Input */}
                            <View style={styles.inputContainer}>
                                <Text style={styles.inputLabel}>Mobile Money Phone Number</Text>
                                <TextInput
                                    style={styles.textInput}
                                    placeholder="+237XXXXXXXXX"
                                    value={phoneNumber}
                                    onChangeText={setPhoneNumber}
                                    keyboardType="phone-pad" 
                                    autoCapitalize="none"
                                />
                            </View>

                            {/* Amount to Fund Input */}
                            <View style={styles.inputContainer}>
                                <Text style={styles.inputLabel}>Amount to Fund (FCFA)</Text>
                                <TextInput
                                    style={[
                                        styles.textInput, 
                                        // Apply error style if amount is invalid or exceeds balance
                                        parseFloat(amountFcfa) > mainWalletBalance && !fetchingCards && styles.inputError 
                                    ]}
                                    placeholder="e.g., 10000"
                                    value={amountFcfa}
                                    onChangeText={setAmountFcfa}
                                    keyboardType="numeric" 
                                />
                                {/* Display error message if amount exceeds balance */}
                                {parseFloat(amountFcfa) > mainWalletBalance && !fetchingCards && (
                                    <Text style={styles.errorText}>Insufficient main wallet balance (FCFA {mainWalletBalance.toLocaleString()})</Text>
                                )}
                            </View>
                        </View>

                        {/* Fund Button within the Modal */}
                        <TouchableOpacity
                            style={[
                                styles.button,
                                styles.accentButton,
                                // Disable button if form is invalid or loading
                                (loading || !selectedCard || !phoneNumber || !amountFcfa || parseFloat(amountFcfa) <= 0 || parseFloat(amountFcfa) > mainWalletBalance) && styles.buttonDisabled
                            ]}
                            onPress={handleFundCardSubmit} // Trigger the funding submission
                            disabled={loading || !selectedCard || !phoneNumber || !amountFcfa || parseFloat(amountFcfa) <= 0 || parseFloat(amountFcfa) > mainWalletBalance}
                        >
                            {loading ? (
                                <ActivityIndicator size="small" color="#FFFFFF" /> // Show spinner if loading
                            ) : (
                                <Text style={[styles.buttonText, styles.accentButtonText]}>Fund Card Now</Text> 
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

        </ScrollView>
    );
};

// StyleSheet for WalletScreen and its components
const styles = StyleSheet.create({
    scrollViewContainer: {
        flex: 1,
        backgroundColor: '#F5F5F5', // Light grey background
    },
    container: {
        flexGrow: 1,
        padding: 20,
        paddingBottom: 80, // Space at the bottom for tab bar (if used)
    },
    header: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#1A73E8', // Primary blue for headers
        marginBottom: 10,
        marginTop: 20,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#666666', // Secondary text color
        textAlign: 'center',
        marginBottom: 30,
        paddingHorizontal: 10,
    },
    balanceCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        padding: 20,
        marginBottom: 20,
        elevation: 3, // Android shadow
        shadowColor: '#000', // iOS shadow
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        alignItems: 'center',
    },
    balanceLabel: {
        fontSize: 16,
        color: '#666666',
        marginBottom: 5,
    },
    balanceAmount: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#1A73E8',
    },
    balanceSpinner: {
        marginVertical: 10,
    },
    // Style for the button that opens the modal on the main screen
    openFundModalButton: {
        backgroundColor: '#580097', 
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row', 
        marginTop: 20,
        marginBottom: 30,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        width: '100%',
    },
    openFundModalButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    // Styles for the modal overlay and content
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)', // Dim background when modal is open
    },
    modalView: {
        margin: 20,
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '90%', // Modal width
        maxHeight: '90%', // Max modal height to allow scrolling on smaller screens
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333333',
        marginBottom: 20,
        textAlign: 'center',
    },
    closeModalButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        padding: 5,
    },
    // Styles for sections within the modal
    sectionInModal: {
        backgroundColor: '#F9F9F9', // Slightly lighter background for modal sections
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        width: '100%',
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333333',
        marginBottom: 15,
        textAlign: 'center',
    },
    spinner: {
        marginVertical: 40,
    },
    emptyCardsContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
    },
    emptyCardsText: {
        fontSize: 16,
        color: '#666666',
        marginTop: 15,
        marginBottom: 20,
        textAlign: 'center',
    },
    cardSelector: {
        flexDirection: 'row',
        marginBottom: 20,
        paddingVertical: 5,
        paddingHorizontal: 5,
    },
    cardOption: {
        width: 150,
        height: 100,
        backgroundColor: '#F5F5F5',
        borderRadius: 10,
        padding: 10,
        marginRight: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'transparent',
    },
    selectedCardOption: {
        backgroundColor: '#580097',
        borderColor: '#000000',
    },
    cardOptionText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333333',
        marginTop: 5,
    },
    selectedCardOptionText: {
        color: '#FFFFFF',
    },
    cardOptionBalance: {
        fontSize: 12,
        color: '#666666',
    },
    selectedCardInfo: {
        backgroundColor: 'rgba(181, 180, 182, 0.87))',
        borderRadius: 10,
        padding: 15,
        marginBottom: 20,
        width: '100%',
        borderWidth: 1,
        
    },
    selectedCardText: {
        fontSize: 14,
        color: '#333333',
        marginBottom: 5,
    },
    selectedCardValue: {
        fontWeight: 'bold',
    },
    // Styles for TextInput (now inline in the component)
    inputContainer: {
        marginBottom: 15,
        width: '100%',
    },
    inputLabel: {
        fontSize: 14,
        color: '#333333',
        marginBottom: 5,
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 8,
        paddingHorizontal: 15,
        paddingVertical: 12,
        fontSize: 16,
        color: '#333333',
        backgroundColor: '#FFFFFF',
    },
    inputError: {
        borderColor: '#F44336',
    },
    errorText: {
        fontSize: 12,
        color: '#F44336',
        marginTop: 5,
    },
    // Styles for general buttons (used for both main and modal buttons)
    button: {
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        marginTop: 10,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    accentButton: {
        backgroundColor: '#580097',
        borderRadius: 25, // Orange accent button
    },
    accentButtonText: {
        color: '#FFFFFF',
    },
    secondaryButton: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: '#1A73E8', // Primary blue border
        marginTop: 15,
    },
    secondaryButtonText: {
        color: '#1A73E8',
    },
    buttonDisabled: {
        backgroundColor: '#F5F5F5',
        opacity: 0.6,
    },
    fundButton: {
        marginBottom: 40,
    },
});

export default WalletScreen;
