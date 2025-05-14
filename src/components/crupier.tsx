import { useEffect, useState, type FC } from "react";
import Card from "./card";

interface Props {
  getCard: () => string | undefined;
  initial: string[];
}
const Player: FC<Props> = ({ getCard, initial }) => {
  const [deck, setDeck] = useState<string[]>(initial);
  useEffect(() => {
    setDeck(initial);
  }, [initial]);
  return (
    <div className="player">
      <span className="tag-name">Crupier</span>
      <span className="points">10</span>
      <div className="card-container">
        {deck.map((card, index) => (
          <Card value={card} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Player;
