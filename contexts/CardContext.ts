import { Card } from "@/types";
import { createContext, useState } from "react";

const [cards, setCards] = useState<Array<Card>>();

export const CardContext = createContext<{
  cards: Array<Card>;
  setCards: (cards: Array<Card>) => void;
}>({ cards, setCards });
