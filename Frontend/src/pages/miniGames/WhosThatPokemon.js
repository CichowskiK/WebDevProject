import { useNavigate} from "react-router-dom"
import * as React from "react"
import pokemons from "../../assets/Pokemon.json"
import "./Games.css"
import { addPokemon} from "../../api/api"
import { useAuth } from "../../context/AuthContext"
import { usePokemonList } from "../../context/UserPokemonsContext"
import { getRandomPokemon } from "../../components/GamesFunctions"


const WhosThatPokemon = () => {
    const navigate = useNavigate()
    const {user} = useAuth()
    const { pokemonList, updateList } = usePokemonList()

    const [outlined, setOutlined] = React.useState(true);
    const [started, setStarted] = React.useState(false)
    const [pokemonData, setPokemonData] = React.useState(null)
    const [guess, setGuess] = React.useState('')
    const [message, setMessage] = React.useState("")
    const [buttonColor, setButtonColor] = React.useState("")
    const [randomInt, setRandomInt] = React.useState(getRandomPokemon(pokemonList))
    const [pokemonName, setPokemonName] = React.useState('')

    const startGame = () => {

        setStarted(true)

        setPokemonData({"name": pokemons[randomInt].name.english, "image": pokemons[randomInt].image.thumbnail})
    }

    const guessPokemon = async (e) => {
        e.preventDefault();
        setOutlined(false);

        if (guess.toLowerCase() === pokemonData.name.toLowerCase()) {
            addPokemon(randomInt+1, user.id)
            updateList(randomInt+1)

            setMessage("You won!!! Try again?")
            setButtonColor("green")
        } else {
            setMessage("You lost :( Try again?")
            setButtonColor("red")
        }
        setPokemonName(pokemonData.name)
    };

    return (
        <div>
            <div className="top-bar">
                <h1>Who's That Pokemon</h1>
                <button
                    onClick={() => navigate("/pokemonCatching")}
                >
                    Go back
                </button>
            </div>
            <div className="whos-that-pokemon">
            <h1
                style={{
                    border: "2px orange dotted",
                    borderRadius: "10px",
                    justifyContent: "center",
                    alignSelf: "center",
                    backgroundColor: "white",
                    margin: "0",
                    marginTop: "10vh",
                    padding: "5px",
                    fontSize: "4vh",
                    minHeight: "5vh",
                    width: "fit-content",
                    textAlign: "center",
                    visibility: outlined ? "hidden" : "visible", // ukrywa tekst, ale zachowuje miejsce
                }}
                >
                {pokemonName || " "} {/* pusty tekst dla rezerwacji miejsca */}
            </h1>
            {!started ? (
                <button className="start-button" onClick={startGame}>
                    START
                </button>
            ) : (
                <div className="game-area">
                    <img
                        src= {pokemonData.image}
                        alt="kontury"
                        className={outlined ? "black-outline" : ""}
                    />
                    <form className="guess-pokemon" onSubmit={guessPokemon}>
                        <input
                            placeholder="Name of the pokemon" 
                            value={guess}
                            onChange={(e) => setGuess(e.target.value)}
                        />
                        <button
                            type="submit"
                            style={{ backgroundColor: buttonColor }}
                            onClick={() => message && window.location.reload()} // klik po zgadywaniu odświeża
                            >
                            {message || "Guess"}
                        </button>
                    </form>
                </div>
            )}
            </div>
        </div>
    )
}

export default WhosThatPokemon