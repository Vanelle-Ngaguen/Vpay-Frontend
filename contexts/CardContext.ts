import { Card } from "@/types";
import {
	createContext,
	Dispatch,
	ReactNode,
	SetStateAction,
	useState,
} from "react";

interface CreditCardContext {
	cards: Array<Card>;
	setCards: Dispatch<SetStateAction<Array<Card>>>;
	loadCards: () => Promise<any>;
}

export const CardContext = createContext<CreditCardContext>({
	cards: [],
	setCards: () => {},
	loadCards: () => Promise.resolve(),
});
