import { Config } from "@/constants/Config";
import { Card } from "@/types";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import storage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

interface Props {
  show: boolean;
  onClose: VoidFunction;
}
const FundCardModal = ({ show = false, onClose }: Props) => {
  const [loading, setLoading] = useState(false);
  const [fetchingCards, setFetchingCards] = useState(false);
  const [cards, setCards] = useState<Card[]>([]);
  const [selectedCard, setSelectedCard] = useState<Card>();
  const [walletBalance, setWalletBalance] = useState<number>(0);
  const [amountFcfa, setAmountFcfa] = useState<string>("0");

  const [phone, setPhone] = useState<string>("");

  useEffect(() => {
    setFetchingCards(true);
    storage
      .getItem("cards")
      .then((items) => {
        if (!!items) {
          setCards(JSON.parse(items));
        } else {
          storage.getItem("access_token").then((token) => {
            axios
              .get(`${Config.url.api}/cards`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              })
              .then((response) => setCards(response.data))
              .catch((reason) => console.warn(reason))
              .finally(() => setLoading(false));
          });
        }
      })
      .finally(() => setFetchingCards(false));
  }, []);

  useEffect(() => {
    const balance = cards.reduce((balance, card) => card.balance + balance, 0);

    setWalletBalance(balance);
  }, [cards]);

  const handleFundCardSubmit = () => {};

  return (
    <Modal
      animationType="slide" // Slide up/down animation for the modal
      transparent={true} // Allows background content to be seen (dimmed)
      visible={show} // Controls modal visibility
      onRequestClose={onClose} // Handles closing with Android's back button
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Fund Your Virtual Card</Text>
          <TouchableOpacity
            style={styles.closeModalButton}
            onPress={onClose} // Closes the modal
          >
            <MaterialCommunityIcons
              name="close-circle-outline"
              size={28}
              color="#666666"
            />
          </TouchableOpacity>

          {/* Section for Card Selection within the Modal */}
          <View style={styles.sectionInModal}>
            <Text style={styles.sectionTitle}>1. Choose a Card to Fund:</Text>
            {fetchingCards ? ( // Show spinner during card data fetch
              <ActivityIndicator
                size="large"
                color="#1A73E8"
                style={styles.spinner}
              />
            ) : cards.length === 0 ? (
              // Message if no reloadable cards are found
              <View style={styles.emptyCardsContainer}>
                <MaterialCommunityIcons
                  name="credit-card-off-outline"
                  size={60}
                  color="#666666"
                />
                <Text style={styles.emptyCardsText}>
                  No active reloadable virtual cards found. Please create one
                  first.
                </Text>
                <TouchableOpacity
                  style={[styles.button, styles.secondaryButton]}
                  onPress={() => {
                    Alert.alert(
                      "Navigate",
                      "This would navigate to the Virtual Card Creation screen."
                    );
                    onClose(); // Close modal before attempting navigation
                  }}
                >
                  <Text style={[styles.buttonText, styles.secondaryButtonText]}>
                    Create New Card
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              // Horizontal scrollable list of virtual cards for selection
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.cardSelector}
              >
                {cards.map((card: Card) => (
                  <TouchableOpacity
                    key={card.id}
                    onPress={() => setSelectedCard(card)} // Set the selected card
                  >
                    <LinearGradient
                      colors={["#000000", "#9664c4", "#a97bcc"]}
                      locations={[0, 0.85, 1]}
                      start={{ y: 1, x: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={[
                        styles.cardOption,
                        selectedCard?.id === card.id &&
                          styles.selectedCardOption, // Highlight selected card
                      ]}
                    >
                      <MaterialCommunityIcons
                        name="credit-card-outline"
                        size={24}
                        color={
                          selectedCard?.id === card.id ? "#fff" : "#580097"
                        }
                      />
                      <Text
                        style={[
                          styles.cardOptionText,
                          selectedCard?.id === card.id &&
                            styles.selectedCardOptionText,
                        ]}
                      >
                        {card.number}
                      </Text>
                      <Text
                        style={[
                          styles.cardOptionBalance,
                          selectedCard?.id === card.id && { color: "#FFFFFF" },
                        ]}
                      >
                        Bal: ${card.balance.toFixed(2)}{" "}
                        {/* Using toFixed for string display */}
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}

            {/* Display details of the currently selected card within the modal */}
            {selectedCard && (
              <View style={styles.selectedCardInfo}>
                <Text style={styles.selectedCardText}>
                  Selected Card:{" "}
                  <Text style={styles.selectedCardValue}>
                    {selectedCard.number}
                  </Text>
                </Text>
                <Text style={styles.selectedCardText}>
                  Current Card Balance:{" "}
                  <Text style={styles.selectedCardValue}>
                    ${selectedCard.balance.toFixed(2)}
                  </Text>
                </Text>
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
                value={phone}
                onChangeText={setPhone}
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
                  parseFloat(amountFcfa) < 1000 &&
                    !fetchingCards &&
                    styles.inputError,
                ]}
                placeholder="e.g., 10000"
                value={amountFcfa}
                onChangeText={setAmountFcfa}
                keyboardType="numeric"
              />
              {/* Display error message if amount exceeds balance */}
              {parseFloat(amountFcfa) < 1000 && (
                <Text style={styles.errorText}>
                  Minimum topup amount is 1000 (FCFA )
                </Text>
              )}
            </View>
          </View>

          {/* Fund Button within the Modal */}
          <TouchableOpacity
            style={[
              styles.button,
              styles.accentButton,
              // Disable button if form is invalid or loading
              (loading ||
                !selectedCard ||
                !phone ||
                !amountFcfa ||
                parseFloat(amountFcfa) < 1000) &&
                styles.buttonDisabled,
            ]}
            onPress={handleFundCardSubmit} // Trigger the funding submission
            disabled={
              loading ||
              !selectedCard ||
              !phone ||
              phone?.length < 9 ||
              !amountFcfa ||
              parseFloat(amountFcfa) < 1000
            }
          >
            {loading ? (
              <ActivityIndicator size="small" color="#FFFFFF" /> // Show spinner if loading
            ) : (
              <Text style={[styles.buttonText, styles.accentButtonText]}>
                Fund Card Now
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  // Styles for the modal overlay and content
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)", // Dim background when modal is open
  },
  modalView: {
    margin: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "90%", // Modal width
    maxHeight: "90%", // Max modal height to allow scrolling on smaller screens
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 20,
    textAlign: "center",
  },
  closeModalButton: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 5,
  },
  // Styles for sections within the modal
  sectionInModal: {
    backgroundColor: "#F9F9F9", // Slightly lighter background for modal sections
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    width: "100%",
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 15,
    textAlign: "center",
  },
  spinner: {
    marginVertical: 40,
  },
  emptyCardsContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
  },
  emptyCardsText: {
    fontSize: 16,
    color: "#666666",
    marginTop: 15,
    marginBottom: 20,
    textAlign: "center",
  },
  cardSelector: {
    flexDirection: "row",
    marginBottom: 20,
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  cardOption: {
    width: 150,
    height: 100,
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "transparent",
  },
  selectedCardOption: {
    // backgroundColor: "#1A73E8",
    borderColor: "#580097",
  },
  cardOptionText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333333",
    marginTop: 5,
  },
  selectedCardOptionText: {
    color: "#FFFFFF",
  },
  cardOptionBalance: {
    fontSize: 12,
    color: "#666666",
  },
  selectedCardInfo: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    width: "100%",
    borderWidth: 1,
    borderColor: "#a97bcc",
  },
  selectedCardText: {
    fontSize: 14,
    marginBottom: 5,
  },
  selectedCardValue: {
    fontWeight: "bold",
  },
  // Styles for TextInput (now inline in the component)
  inputContainer: {
    marginBottom: 15,
    width: "100%",
  },
  inputLabel: {
    fontSize: 14,
    color: "#333333",
    marginBottom: 5,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: "#333333",
    backgroundColor: "#FFFFFF",
  },
  inputError: {
    borderColor: "#F44336",
  },
  errorText: {
    fontSize: 12,
    color: "#F44336",
    marginTop: 5,
  },
  // Styles for general buttons (used for both main and modal buttons)
  button: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginTop: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  accentButton: {
    backgroundColor: "#FF9800", // Orange accent button
  },
  accentButtonText: {
    color: "#FFFFFF",
  },

  secondaryButton: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#1A73E8", // Primary blue border
    marginTop: 15,
  },
  secondaryButtonText: {
    color: "#1A73E8",
  },
  buttonDisabled: {
    backgroundColor: "#F5F5F5",
    opacity: 0.6,
  },
  fundButton: {
    marginBottom: 40,
  },
});

export default FundCardModal;
