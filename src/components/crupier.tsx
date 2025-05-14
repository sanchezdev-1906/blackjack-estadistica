import { useCallback, useEffect, useState, type FC } from "react";
import Card from "./card";

interface Props {
  getCard: () => string | undefined;
  initial: string[];
  playerFolded: boolean;
  onCrupierPlay: () => void;
  setCrupierPoints: (points: number) => void;
}
const Player: FC<Props> = ({
  getCard,
  initial,
  playerFolded,
  setCrupierPoints,
  onCrupierPlay,
}) => {
  const [deck, setDeck] = useState<string[]>(initial);
  const [croupierPlayed, setCroupierPlayed] = useState(false);
  const [points, setPoints] = useState(0);
  useEffect(() => {
    setDeck(initial);
  }, [initial]);
  useEffect(() => {
    if (!playerFolded || croupierPlayed) return;
    if (points >= 17) {
      onCrupierPlay();
      return;
    }
    const id = setTimeout(() => {
      const card = getCard();
      if (card) {
        setDeck([...deck, card]);
      } else {
        onCrupierPlay();
        setCroupierPlayed(true);
      }
    }, 1000);
    return () => {
      clearTimeout(id);
    };
  }, [playerFolded, deck, getCard, points, onCrupierPlay, croupierPlayed]);

  const calculatePoints = useCallback(() => {
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
    setCrupierPoints(points);
  }, [deck, setCrupierPoints]);

  useEffect(() => {
    calculatePoints();
  }, [calculatePoints]);
  return (
    <div className="player">
      <span className="tag-name">Crupier</span>
      <span className="points">10</span>
      <div className="card-container">
        {deck.map((card, index) => (
          <Card value={card} key={index} />
        ))}
      </div>
      <p>puntos:{points}</p>
    </div>
  );
};

export default Player;
