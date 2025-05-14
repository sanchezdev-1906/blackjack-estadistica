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
    if (points >= 21) {
      setFolded(true);
    }
  }, [deck, setPlayerPoints]);
  const handleFold = () => {
    setFolded(true);
    onFold();
  };
  return (
    <div className="player">
      <div className="card-container">
        {deck.map((card, index) => {
          const center = (deck.length - 1) / 2;
          const distanceToCenter = Math.abs(index - center);
          const maxDistance = center;
          const weight = 1 - distanceToCenter / maxDistance; // 1 en el centro, 0 en los bordes

          return (
            <Card
              value={card}
              key={index}
              handPlayer={true}
              index={weight} // pasa el valor al componente si lo necesitas
            />
          );
        })}
      </div>
      <span className="points">{points}</span>
      <span className="tag-name">Player</span>
      {!folded && (
        <div className="buttons">
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
          <button className="btn--folt" onClick={handleFold}>Parar</button>
        </div>
      )}
    </div>
  );
};

export default Player;
