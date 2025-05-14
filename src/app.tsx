import { useState } from "react";
import Game from "./components/game";

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const onGameRestart = () => {
    setGameStarted(false);
    const id = setTimeout(() => {
      setGameStarted(true);
    }, 1);
    return () => {
      clearTimeout(id);
    };
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
