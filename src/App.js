import React, { useCallback, useEffect, useState } from "react";

//Componentes
import StartScreen from "./components/StartScreen/StartScreen";

//Styles
import './App.css'

//Library
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


//Data
import { wordsList } from './data/words.js';
import Game from "./components/Game/Game";
import GameOver from "./components/GameOver.jsx/GameOver";

const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" }
]

const guessesNumber = 3;

function App() {

  const [stage, setStage] = useState(stages[0].name);
  const [words] = useState(wordsList);

  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [letters, setLetters] = useState([]);

  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(guessesNumber);
  const [score, setScore] = useState(0);

  const notify = () => toast("Congratulations!");

  const pickWordAndCategory = useCallback(() => {
    //Pick a random category
    const categories = Object.keys(words);
    const category = categories[Math.floor(Math.random() * categories.length)];

    //Pick a random word from the category
    const word = words[category][Math.floor(Math.random() * words[category].length)];

    return { word, category };

  }, [words]);

  const startGame = useCallback(() => {

    clearLettersStates();

    //pick word and pick category
    const { word, category } = pickWordAndCategory();

    //creating a array of letters
    const wordLetter = word.split("").map(letter => letter.toLowerCase());

    //fill states
    setPickedWord(word);
    setPickedCategory(category);
    setLetters(wordLetter);

    setStage(stages[1].name)
  }, [pickWordAndCategory]);

  //process the letter input
  const verifyLetter = (letter) => {
    const letterLowerCase = letter.toLowerCase();

    //Check if the letter is already in the guessed letters
    if (guessedLetters.includes(letterLowerCase) || wrongLetters.includes(letterLowerCase)) {
      return;
    }

    //Check if the letter is in the word
    if (letters.includes(letterLowerCase)) {
      setGuessedLetters(prevState => [...prevState, letterLowerCase]);
    } else {
      setWrongLetters(prevState => [...prevState, letterLowerCase]);
      setGuesses(guesses - 1);
    }

  }

  const clearLettersStates = () => {
    setGuessedLetters([]);
    setWrongLetters([]);
  }

  useEffect(() => {
    if (guesses <= 0) {
      //resete all states
      clearLettersStates();
      setStage(stages[2].name)
    }
  }, [guesses])

  //Check win condition
  useEffect(() => {

    const uniqueLetters = [...new Set(letters)];

    if (uniqueLetters.length === guessedLetters.length) {
      setScore(score + 100);
      notify();
      startGame();
    }

  }, [guessedLetters, letters, startGame, score])

  //restart the game
  const restartGame = () => {
    setScore(0);
    setGuesses(guessesNumber);
    setStage(stages[0].name)
  }

  return (
    <div className="App">
      {
        stage === 'start' &&
        <StartScreen startGame={startGame} />
      }

      {
        stage === 'game' &&
        <Game
          verifyLetter={verifyLetter}
          pickedWord={pickedWord}
          pickedCategory={pickedCategory}
          letters={letters}
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          guesses={guesses}
          score={score}
        />
      }

      {
        stage === 'end' &&
        <GameOver restartGame={restartGame} score={score} />
      }
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
