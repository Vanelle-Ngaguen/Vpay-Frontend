import FundCardModal from "@/components/FundCardModal";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";

const HomePage = () => {
	const [showFundingModal, setShowFundingModal] = useState<boolean>(false)

	return (
		<ScrollView style={styles.container}>
			{/* Top Section */}
			<View style={styles.topSection}>
				<Ionicons name="menu" size={24} color="black" />
				<Ionicons name="notifications" size={24} color="black" />
			</View>

			{/* Account Balance Section */}
			<View style={styles.balanceBox}>
				<Text style={styles.balanceText}>Main Account Balance</Text>
				<Text style={styles.balanceAmount}>XAF 0.00</Text>
				<TouchableOpacity>
					<Text style={styles.convertText}>Convert to USD</Text>
				</TouchableOpacity>
			</View>

			{/* Actions Section */}
			<View style={styles.actionsSection}>
				<TouchableOpacity style={styles.action} onPress={() => setShowFundingModal(true)}>
					<MaterialIcons name="add-circle" size={40} color="green" />
					<Text style={styles.actionText}>Add Funds</Text>
				</TouchableOpacity>
				<View style={styles.action}>
					<MaterialIcons name="remove-circle" size={40} color="red" />
					<Text style={styles.actionText}>Withdraw</Text>
				</View>
			</View>

			{/* Transactions Section */}
			<View style={styles.transactionsSection}>
				<Text style={styles.transactionsTitle}>Recent Transactions</Text>
				<TouchableOpacity>
					<Text style={styles.seeAllText}>See All</Text>
				</TouchableOpacity>
			</View>
			{/* Example Transactions */}
			<View style={styles.transactionItem}>
				<Text>Transaction 1</Text>
				<View style={{ marginLeft: 10 }}>
					<Text>- XAF 10,000</Text>
				</View>
			</View>
			<View style={styles.transactionItem}>
				<Text>Transaction 2</Text>
				<View style={{ marginLeft: 10 }}>
					<Text>- XAF 10,000</Text>
				</View>
			</View>
			<View style={styles.transactionItem}>
				<Text>Transaction 3</Text>
				<View style={{ marginLeft: 10 }}>
					<Text>- XAF 10,000</Text>
				</View>
			</View>
			<View style={styles.transactionItem}>
				<Text>Transaction 2</Text>
				<Text>- XAF 5,000</Text>
			</View>

			<FundCardModal show={showFundingModal} onClose={() => setShowFundingModal(false)} />
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
		backgroundColor: "#fff",
	},
	topSection: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 20,
	},
	balanceBox: {
		backgroundColor: "#580097",
		borderRadius: 10,
		padding: 20,
		alignItems: "center",
		marginBottom: 20,
		width: "100%", // Ensures the background occupies the whole width
		justifyContent: "center", // Centers content vertically
	},
	balanceText: {
		color: "#fff",
		fontSize: 16,
		marginBottom: 10,
	},
	balanceAmount: {
		color: "#fff",
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 10,
	},
	convertText: {
		color: "#fff",
		textDecorationLine: "underline",
	},
	actionsSection: {
		flexDirection: "row",
		justifyContent: "space-around",
		marginBottom: 20,
	},
	action: {
		alignItems: "center",
	},
	actionText: {
		marginTop: 5,
		fontSize: 14,
	},
	transactionsSection: {
		padding: 15,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 10,
		backgroundColor: "#DDDADF",
	},
	transactionsTitle: {
		fontSize: 16,
		fontWeight: "bold",
	},
	seeAllText: {
		color: "#580097",
		textDecorationLine: "underline",
	},
	transactionItem: {
		flexDirection: "row",
		justifyContent: "space-between",
		paddingVertical: 10,
		borderBottomWidth: 1,
		borderBottomColor: "#ccc",
	},
});

export default HomePage;
