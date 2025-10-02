const GameOver = () => {

    return(
        <div className="game-over-screen">
            <h1>Game Over</h1>
            <button 
                onClick={() => {window.location.reload()}}
            >Play Again?</button>
        </div>
    )
}

export default GameOver