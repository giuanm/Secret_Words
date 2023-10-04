// CSS
import './App.css';

// React
import { useCallback, useState, useEffect} from 'react';

// Data
import {wordsList} from "./data/words"

// Components
import StartScreen from './components/StartScreen';
import Game from './components/Game';
import GameOver from './components/GameOver';

const Stages = [
  {id: 1, name: "start"},
  {id: 2, name: "game"},
  {id: 3, name: "end"},
]

const guessesQty = 3;

function App() {
  const [gameStage, setGameStage] = useState(Stages[0].name)
  const [words] = useState(wordsList);

  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [letters, setLetters] = useState([]);

  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(guessesQty);
  const [score, setScore] = useState(0);

  const pickedWordAndCategory = useCallback(() => {
    // Select category
    const categories = Object.keys(words)
    const category = categories[Math.floor(Math.random()*Object.keys(categories).length)];
  
    // pick a random word
    //const word = words[category][Math.floor(Math.random()*Object.keys(category).length)];
    const word = words[category]
    return {word, category}
  }, [words]);

  // start the secret words
  const startGame = useCallback(() => {
    // clear all letters
    clearLetterStates();

    //pick word and pick category
    const {word, category} = pickedWordAndCategory();

    //create an array of letters
    let wordLetters = word[0].split("");
    wordLetters = wordLetters.map((l) => l.toLowerCase());

    // fill states
    setPickedWord(word)
    setPickedCategory(category)
    setLetters(wordLetters)

    setGameStage(Stages[1].name);
  }, [pickedWordAndCategory]);

  // process the letter input
  const verifyLetter = (letter) => {
    const normalizedLetter = letter.toLowerCase();

    //check if letter has already been utillized
    if (
      guessedLetters.includes(normalizedLetter) ||
      wrongLetters.includes(normalizedLetter)
    ) {
      return;
    }

    // push guessed letter or remove a guess
    if (letters.includes(normalizedLetter)){
      setGuessedLetters((actualGuessedLetters) =>[
        ...actualGuessedLetters,
        normalizedLetter,
      ]);
    } else {
      setWrongLetters((actualWrongLetters) =>[
        ...actualWrongLetters,
        normalizedLetter,
      ]);
      setGuesses((actualGuesses) => actualGuesses -1);
    }
  };

  const clearLetterStates = () => {
    setGuessedLetters([]);
    setWrongLetters([]);
  };

  // check if guesses ended
  useEffect(() =>{
    if(guesses<=0){
      //reset all state
      clearLetterStates();

      setGameStage(Stages[2].name);
    }
  }, [guesses]);

  // check win condition
  useEffect(()=>{
    
    const uniqueLetters =[...new Set(letters)]
    
    // win condition
    if(guessedLetters.length === uniqueLetters.length && gameStage === Stages[1].name){
      //add score
      setScore((actualScore) => (actualScore += 100))

      //restart game with new word
      setGuesses(guessesQty);
      startGame();
    }
  }, [guessedLetters, letters, startGame, gameStage]);
  
    //restarts the game
  const retry = () => {
    setScore(0);
    setGuesses(guessesQty);

    setGameStage(Stages[0].name)
  }

  return (
    <div className="App">
      {gameStage === 'start' && 
      <StartScreen 
        startGame={startGame}
      />}
      
      {gameStage === 'game' && 
      <Game 
        verifyLetter={verifyLetter} 
        pickedWord={pickedWord} 
        pickedCategory={pickedCategory} 
        letters={letters}
        guessedLetters={guessedLetters}
        wrongLetters={wrongLetters}
        guesses={guesses}
        score={score}
      />}
      
      {gameStage === 'end' && 
      <GameOver 
        retry={retry}
        score={score} 
      />}
    </div>
  );
}

export default App;