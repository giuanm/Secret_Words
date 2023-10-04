import './StartScreen.css';

const StartScreen = ({startGame}) => {
  return (
    <div className="start">
        <h1>Secret Word</h1>
        <p>Click on the button and start the game!!</p>
        <button onClick={startGame}>Start Here</button>
    </div>
  )
}

export default StartScreen