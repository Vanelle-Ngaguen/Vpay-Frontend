import { Card } from "@/types";
import {
	createContext,
	Dispatch,
	PropsWithChildren,
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

const CardContextProvider = ({ children }: PropsWithChildren) => {
	const [cards, setCards] = useState<Array<Card>>([]);
	const loadCards = async () => {};
	return (
		<CardContext value={{ cards, setCards, loadCards }}>{children}</CardContext>
	);
};

export default CardContextProvider;
