import { useEffect, useState, type FC } from "react";
import { GetDeck } from "../utils/baraja";
import Player from "./player";
import Crupier from "./crupier";

interface Props {
  onGameRestart: () => void;
}
const Game: FC<Props> = ({ onGameRestart }) => {
  const deck = GetDeck();
  const [initialCards, setInitialCards] = useState<{
    player: string[];
    crupier: string[];
  }>({ player: [], crupier: [] });

  const getCard = (): string | undefined => {
    if (deck.length > 0) {
      const card = deck.pop();
      return card;
    }
  };

  useEffect(() => {
    const pCards: string[] = [];
    const cCards: string[] = [];
    for (let i = 0; i < 4; i++) {
      if (i % 2 == 0 && deck.length > 0) {
        pCards.push(deck.pop()!);
      } else {
        cCards.push(deck.pop()!);
      }
    }
    setInitialCards({ player: pCards, crupier: cCards });
  }, []);

  return (
    <div>
      <p>crupier</p>
      <Crupier getCard={getCard} initial={initialCards.crupier} />
      <p>player</p>
      <Player
        onFold={() => {}}
        setPlayerPoints={() => {}}
        getCard={getCard}
        initial={initialCards.player}
      />
    </div>
  );
};

export default Game;
