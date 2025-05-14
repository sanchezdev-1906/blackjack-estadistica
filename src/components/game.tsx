import { useCallback, useEffect, useMemo, useState, type FC } from "react";
import { GetDeck } from "../utils/baraja";
import Player from "./player";
import Crupier from "./crupier";

interface Props {
  onGameRestart: () => void;
}
const Game: FC<Props> = ({ onGameRestart }) => {
  const deck = useMemo(() => GetDeck(), []);
  const [croupierPoints, setCroupierPoints] = useState(0);
  const [playerPoints, setPlayerPoints] = useState(0);
  const [playerFolded, setPlayerFolded] = useState(false);
  const [croupierPlayed, setCroupierPlayed] = useState(false);
  const [initialCards, setInitialCards] = useState<{
    player: string[];
    crupier: string[];
  }>({ player: [], crupier: [] });

  const getCard = useCallback((): string | undefined => {
    if (deck.length > 0) {
      const card = deck.pop();
      return card;
    }
  }, [deck]);
  useEffect(() => {
    if (!croupierPlayed) return;
    if (playerPoints > 21 && croupierPoints > 21) {
      console.log("pierden ambos");
    } else if (playerPoints > 21) {
      console.log("gana mesa");
    } else if (croupierPoints > 21) {
      console.log("gana jugador");
    } else if (playerPoints < croupierPoints) {
      console.log("gano mesa");
    } else {
      console.log("gano jugador");
    }
  }, [croupierPlayed, croupierPoints, playerPoints]);

  useEffect(() => {
    if (initialCards.crupier.length >= 2 || initialCards.player.length >= 2)
      return;
    const pCards: string[] = [];
    const cCards: string[] = [];
    for (let i = 0; i < 4; i++) {
      if (i % 2 == 0) {
        pCards.push(getCard()!);
      } else {
        cCards.push(getCard()!);
      }
    }
    setInitialCards({ player: pCards, crupier: cCards });
  }, [getCard, initialCards]);

  const handleFold = () => {
    setPlayerFolded(true);
  };
  const handleCroupierPlay = () => {
    setCroupierPlayed(true);
  };

  return (
    <div className="game">
      {croupierPlayed && (
        <div className="modal">
          <button onClick={onGameRestart}>Reiniciar</button>
        </div>
      )}
      <Crupier
        playerFolded={playerFolded}
        setCrupierPoints={setCroupierPoints}
        getCard={getCard}
        onCrupierPlay={handleCroupierPlay}
        initial={initialCards.crupier}
      />
      <Player
        onFold={handleFold}
        setPlayerPoints={setPlayerPoints}
        getCard={getCard}
        initial={initialCards.player}
      />
    </div>
  );
};

export default Game;
