import { Link } from "expo-router";
import { Image, StyleSheet, Text, View } from "react-native";

const Onboarding = () => {
	return (
		<View style={styles.container}>
			<Image
				source={require("../../assets/images/unboard_img.png")} // Reusing the imported local asset
				style={styles.unboardImage}
			/>
			<Text style={styles.text}>Your Virtual Gateway</Text>
			<Text style={styles.paragraph}>
				Create virtual cards, manage transactions, and enhance your security
				with ease.
			</Text>
			<Link href="/(onboarding)/onlogin" style={styles.buttonContainer}>
				<Text style={styles.buttonText}>Get Started</Text>
			</Link>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#f5f5f5",
	},
	text: {
		fontSize: 24,
		fontWeight: "bold",
		color: "#333",
		marginBottom: 20,
	},
	logo: {
		width: 150,
		height: 150,
	},
	unboardImage: {
		width: "100%",
		height: 300,
		resizeMode: "contain",
		marginBottom: 20,
	},
	paragraph: {
		fontSize: 16,
		color: "#666",
		textAlign: "center",
		marginHorizontal: 20,
	},
	buttonContainer: {
		backgroundColor: "rgba(88, 0, 151, 1)",
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 25,
		marginTop: 20,
		alignItems: "center",
		justifyContent: "center", // Ensure the text is centered vertically
	},
	buttonText: {
		fontSize: 16,
		color: "#fff",
		textAlign: "center",
		fontWeight: "bold",
		width: "100%",
	},
});

export default Onboarding;
