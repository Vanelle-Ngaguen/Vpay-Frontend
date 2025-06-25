import CardComponent from "@/components/card";
import { Config } from "@/constants/Config";
import { Card } from "@/types";
import storage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CardScreen = () => {
  const [showHowItWorks, setShowHowItWorks] = useState(false);
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleCreateCard = () => {
    setShowHowItWorks(true);
  };

  useEffect(() => {
    setLoading(true);
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
  }, []);

  const renderHowItWorks = () => (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.heading}>How it works</Text>
        <View style={styles.list}>
          <Text style={styles.listItem}>• No Creation fee</Text>
          <Text style={styles.listItem}>• Min $5 deposit</Text>
          <Text style={styles.listItem}>• 0.2% fee on each transaction</Text>
        </View>
        <View style={styles.terms}>
          <Text style={styles.termsText}>
            By proceeding, you agree to our terms and conditions.
          </Text>
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Agree and continue</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );

  const renderMainContent = () => (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
      >
        {loading ? (
          <Text>Loading cards...</Text>
        ) : cards.length ? (
          cards.map((card) => <CardComponent card={card} key={card.id} />)
        ) : (
          <Text style={styles.heading}>
            You don’t have a card yet. Click the button below to create one.
          </Text>
        )}
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={handleCreateCard}
        >
          <View style={styles.fab}>
            <Text style={styles.fabText}>+</Text>
          </View>
          <Text style={styles.iconText}>Create my virtual card</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );

  return showHowItWorks ? renderHowItWorks() : renderMainContent();
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    padding: 20,
    alignItems: "center",
    flexGrow: 1,
    justifyContent: "flex-start",
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  iconContainer: {
    alignItems: "center",
    marginTop: 30,
  },
  fab: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#580097",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  fabText: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
  },
  iconText: {
    fontSize: 16,
    marginTop: 10,
  },
  list: {
    marginVertical: 20,
  },
  listItem: {
    fontSize: 16,
    marginVertical: 5,
  },
  terms: {
    marginVertical: 20,
    paddingHorizontal: 10,
  },
  termsText: {
    fontSize: 14,
    textAlign: "center",
    color: "#555",
  },
  button: {
    backgroundColor: "#580097",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default CardScreen;
