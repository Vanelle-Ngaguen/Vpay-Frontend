import { Config } from "@/constants/Config";
import { User } from "@/types";
import storage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {
	createContext,
	PropsWithChildren,
	useContext,
	useEffect,
	useState,
} from "react";
import { Text } from "react-native";
import { LoadingContext } from "./LoadingContext";

interface AuthContextInterface {
	token: string | undefined;
	setToken: (user?: string | undefined) => void;
	user: undefined | User;
	setUser: (user?: User | undefined) => void;
	getUser: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextInterface>({
	token: undefined,
	setToken: () => {},
	user: undefined,
	setUser: () => {},
	getUser: () => Promise.resolve(),
});

const AuthContextProvider = ({ children }: PropsWithChildren) => {
	const [token, setTokenState] = useState<string | undefined>(undefined);
	const [user, setUserState] = useState<User | undefined>(undefined);
	const { loading, setLoading } = useContext(LoadingContext);

	const getUser = () =>
		axios
			.get<User>(`${Config.url.api}/user`, {
				headers: { Authorization: "Bearer " + token },
			})
			.then((response) => {
				setUserState(response.data);
			});

	useEffect(() => {
		setLoading(true);
		storage.getItem("access_token").then((access_token) => {
			console.log("wtf", token);
			console.log("getting access token", access_token);
			setTokenState(access_token || undefined);
			storage.getItem("user").then((userData) => {
				setUserState(
					typeof userData == "string" ? JSON.parse(userData) : undefined,
				);
				setLoading(false);
			});
		});
	}, []);

	const setUser = (user: User | undefined = undefined) => {
		setUserState(user);

		if (!!user) storage.setItem("user", JSON.stringify(user));
		else storage.removeItem("user");
	};

	const setToken = (token: string | undefined = undefined) => {
		setTokenState(token);
		if (!!token) storage.setItem("access_token", token);
		else storage.removeItem("access_token");
	};

	return (
		<AuthContext value={{ token, user, setUser, setToken, getUser }}>
			{children}
			<Text>Token is: {token}</Text>
		</AuthContext>
	);
};

export default AuthContextProvider;
