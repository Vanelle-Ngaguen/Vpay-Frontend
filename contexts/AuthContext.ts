import { User } from "@/types";
import { createContext, Dispatch, SetStateAction } from "react";

interface AuthContext {
	token: string | undefined;
	setToken: Dispatch<SetStateAction<string | undefined>>;
	user: undefined | User;
	setUser: Dispatch<SetStateAction<User | undefined>>;
}

export const AuthContext = createContext<AuthContext>({
	token: undefined,
	setToken: () => {},
	user: undefined,
	setUser: () => {},
});
