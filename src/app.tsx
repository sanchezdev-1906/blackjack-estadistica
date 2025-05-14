import { useState } from "react";
import Game from "./components/game";

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const onGameRestart = () => {
    setGameStarted(false);
  };
  return (
    <>
      {!gameStarted && (
        <button onClick={() => setGameStarted(true)}>Iniciar</button>
      )}
      {gameStarted && <Game onGameRestart={onGameRestart}></Game>}
    </>
  );
}

export default App;
