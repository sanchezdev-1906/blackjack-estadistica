import { useState, type FC } from "react";

interface Props {
  value: string;
  handPlayer?: boolean;
  index: number;
}
const Card: FC<Props> = ({ value, handPlayer, index }) => {
  const number = value.slice(0, -1);
  const symbol = value[value.length - 1];
  const [volteado, setVoltadeo] = useState("");
  return (
    <div
      className={"card " + volteado + (symbol == "♥" || symbol == "♦" ? "red" : "black") + (handPlayer ? " hand-player" : "")}
      style={{
        transform: `translateY(${index * -40}px)`,
      }}
      onClick={() => {
        if (volteado == "") {
          setVoltadeo(" rotate ");
        } else {
          setVoltadeo("");
        }
      }}
    >
      <div className="card-content">
        <span className="value">{number}</span>
        <span className="suit">{symbol}</span>
      </div>
    </div >
  );
};

export default Card;
