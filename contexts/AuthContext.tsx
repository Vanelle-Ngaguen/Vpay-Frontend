import { User } from "@/types";
import {
	createContext,
	Dispatch,
	ReactNode,
	SetStateAction,
	useEffect,
	useLayoutEffect,
	useState,
} from "react";
import storage from "@react-native-async-storage/async-storage";

interface AuthContextInterface {
	token: string | undefined;
	setToken: (user?: string | undefined) => void;
	user: undefined | User;
	setUser: (user?: User | undefined) => void;
}

export const AuthContext = createContext<AuthContextInterface>({
	token: undefined,
	setToken: () => {},
	user: undefined,
	setUser: () => {},
});

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
	const [token, setTokenState] = useState<string | undefined>(undefined);
	const [user, setUserState] = useState<User | undefined>(undefined);

	useLayoutEffect(() => {
		storage.getItem("access_token").then((access_token) => {
			console.log("getting access token", access_token);
			setTokenState(access_token || undefined);
		});
		storage.getItem("user").then((userData) => {
			setTokenState(
				typeof userData == "string" ? JSON.parse(userData) : undefined,
			);
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
		<AuthContext value={{ token, user, setUser, setToken }}>
			{children}
		</AuthContext>
	);
};

export default AuthContextProvider;
