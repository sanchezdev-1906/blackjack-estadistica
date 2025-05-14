import { useEffect, useState, type FC } from "react";
import Card from "./card";

interface Props {
  getCard: () => string | undefined;
  onFold: () => void;
  setPlayerPoints: (points: number) => void;
  initial: string[];
}
const Player: FC<Props> = ({ getCard, initial, onFold, setPlayerPoints }) => {
  const [deck, setDeck] = useState<string[]>(initial);
  const [points, setPoints] = useState(0);
  const [folded, setFolded] = useState(false);
  useEffect(() => {
    setDeck(initial);
  }, [initial]);
  useEffect(() => {
    let points = 0;
    let aces = 0;

    for (const card of deck) {
      const value = card.slice(0, -1);
      if (value === "A") {
        points += 11;
        aces++;
      } else if (["J", "Q", "K"].includes(value)) {
        points += 10;
      } else {
        points += parseInt(value);
      }
    }
    while (points > 21 && aces > 0) {
      points -= 10;
      aces--;
    }
    setPoints(points);
    setPlayerPoints(points);
  }, [deck, setPlayerPoints]);
  const handleFold = () => {
    setFolded(true);
    onFold();
  };
  return (
    <div>
      {!folded && (
        <>
          <button
            onClick={() => {
              const card = getCard();
              if (card) {
                setDeck([...deck, card]);
              }
            }}
          >
            Pedir
          </button>
          <button onClick={handleFold}>fold</button>
        </>
      )}
      <div className="card-container">
        {deck.map((card, index) => (
          <Card value={card} key={index} />
        ))}
      </div>
      <div>puntos:{points}</div>
    </div>
  );
};

export default Player;
