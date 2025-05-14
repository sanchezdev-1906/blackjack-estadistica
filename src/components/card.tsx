import type { FC } from "react";

interface Props {
  value: string;
}
const Card: FC<Props> = ({ value }) => {
  const [number, symbol] = [...value];
  return (
    <div
      className={"card " + (symbol == "♥" || symbol == "♦" ? "red" : "black")}
    >
      <span className="value">{number}</span>
      <span className="suit">{symbol}</span>
    </div>
  );
};

export default Card;
