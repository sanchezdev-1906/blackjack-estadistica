import { type FC } from "react";

interface Props {
  value: string;
  hidden?: boolean;
  handPlayer?: boolean;
  indexTranslate?: number;
  indexRotate?: number;
}
const Card: FC<Props> = ({
  value,
  handPlayer,
  indexTranslate,
  indexRotate,
  hidden = false,
}) => {
  const number = value.slice(0, -1);
  const symbol = value[value.length - 1];
  return (
    <div
      className={
        "card " +
        (hidden ? " rotate " : "") +
        (symbol == "♥" || symbol == "♦" ? "red" : "black") +
        (handPlayer ? " hand-player" : "")
      }
      style={{
        transform: `${
          handPlayer
            ? `translateY(${
                indexTranslate ? indexTranslate * -30 : 0
              }px) rotateZ(${indexRotate ? indexRotate * 15 : 0}deg)`
            : ""
        } `,
      }}
    >
      <div className="card-content">
        <span className="value">{number}</span>
        <span className="suit">{symbol}</span>
      </div>
    </div>
  );
};

export default Card;
