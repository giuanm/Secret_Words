import './GameOver.css';

const GameOver = ({retry, score}) => {
  return (
    <div className='gameOver'>
        <h1>Game Over</h1>
        <h2>
            Your scores was: {score}
        </h2>

        <button onClick={retry}>Reset Game</button>
    </div>
  )
}

export default GameOver