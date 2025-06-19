import { Config } from "@/constants/Config";
import storage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Card } from "@/types";

const CardScreen = () => {
	const [showHowItWorks, setShowHowItWorks] = useState(false);
	const [cards, setCards] = useState<Array<Card>>([]);
	const [loading, setLoading] = useState<boolean>(false);

	const handleCreateCard = () => {
		setShowHowItWorks(true);
	};

	useEffect(() => {
		setLoading(true);
		storage.getItem("access_token").then((token) => {
			console.log("user token is ", token);
			axios
				.get(`${Config.url.api}/cards`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
				.then((response) => {
					console.log(response.data);
					setCards(response.data);
				})
				.catch((reason) => console.warn({ ...reason }))
				.finally(() => setLoading(false));
		});
	}, []);

	if (showHowItWorks) {
		return (
			<View style={[styles.container, styles.shadowBox]}>
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
			</View>
		);
	}

	return (
		<View style={styles.container}>
			{loading ? (
				<Text>Loading cards...</Text>
			) : (
				<>
					{cards.length ? (
						cards.map((card) => <Text>{card.number}</Text>)
					) : (
						<>
							<Text style={styles.heading}>
								You don’t have a card yet, click on the button below to create
								one
							</Text>
						</>
					)}
				</>
			)}
			<TouchableOpacity style={styles.iconContainer} onPress={handleCreateCard}>
				<View>
					<View
						style={{
							width: 50,
							height: 50,
							borderRadius: 25,
							backgroundColor: "#580097",
							justifyContent: "center",
							alignItems: "center",
							alignSelf: "center",
						}}
					>
						<Text style={{ color: "white", fontSize: 30, fontWeight: "bold" }}>
							+
						</Text>
					</View>
					<Text style={styles.iconText}>Create my virtual card</Text>
				</View>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		justifyContent: "center",
		alignItems: "center",
		padding: 20,
		backgroundColor: "",
	},
	shadowBox: {
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
	heading: {
		fontSize: 18,
		fontWeight: "bold",
		textAlign: "center",
		marginBottom: 20,
	},
	iconContainer: {
		alignItems: "center",
		marginTop: 20,
	},
	icon: {
		fontSize: 50,
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
	},
	buttonText: {
		color: "#fff",
		fontSize: 16,
	},
});

export default CardScreen;
