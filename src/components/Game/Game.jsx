import React, { useState, useRef, useEffect } from "react";

import "./styles.css";

const Game = ({
  verifyLetter,
  pickedWord,
  pickedCategory,
  letters,
  guessedLetters,
  wrongLetters,
  guesses,
  score,
}) => {
  const [letter, setLetter] = useState("");
  const letterInputRef = useRef(null);

  useEffect(() => {
    letterInputRef.current.focus();
  }, []);

  const handleLetter = (e) => {
    e.preventDefault();

    verifyLetter(letter);
    setLetter("");
    letterInputRef.current.focus();
  };

  return (
    <div className="game">
      <p className="points">
        <span>Pontuação: {score}</span>
      </p>
      <h1>Advinhe a palavra</h1>

      <h3 className="tip">
        Dica sobre a palavra <span>{pickedCategory}</span>
      </h3>
      <p>Você ainda tem {guesses} tentativas</p>

      <div className="wordContainer">
        {letters.map((letter, index) =>
          guessedLetters.includes(letter) ? (
            <span className="letter" key={index}>
              {letter}
            </span>
          ) : (
            <span className="blankSquare" key={index}></span>
          )
        )}
      </div>

      <div className="letterContainer">
        <p>Tente advinhar uma letra da palavra:</p>
        <form onSubmit={handleLetter}>
          <input
            type="text"
            name="letter"
            maxLength="1"
            required
            onChange={(e) => setLetter(e.target.value)}
            value={letter}
            ref={letterInputRef}
          />
          <button>Jogar!</button>
        </form>
      </div>

      <div className="wrongLettersContainer">
        <p>Letras erradas:</p>
        {wrongLetters.map((letter, index) => (
          <span key={index}>{letter}, </span>
        ))}
      </div>
    </div>
  );
};

export default Game;
