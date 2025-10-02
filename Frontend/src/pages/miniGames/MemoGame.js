import WorkInProgress from "../../components/WorkInProgress"
import { useNavigate} from "react-router-dom"
import MemoCard from "../../components/MemoCard"
import GameOver from "../../components/GameOver"
import { getRandomPokemon, shuffleArray } from "../../components/GamesFunctions"
import { usePokemonList } from "../../context/UserPokemonsContext"
import { useAuth } from "../../context/AuthContext"
import { addPokemon } from "../../api/api"
import "./Games.css"
import React from "react"

const MemoGame = () => {
    const {user} = useAuth()
    const navigate = useNavigate()

    const {pokemonList, updateList} = usePokemonList()
    const [pokemons, setPokemons] = React.useState([])
    const [counter, setCounter] = React.useState(0)
    const [flippedCards, setFlippedCards] = React.useState([])
    const [matchedCards, setMatchedCards] = React.useState([])
    const [selectedCards, setSelectedCards] = React.useState([])
    const [isFinished, setIsFinished] = React.useState(false)

    React.useEffect(() => {
        const newpokemons = []
        for(let i = 0; i < 7; i++) {
            const randomInt = getRandomPokemon(pokemonList)
            newpokemons.push(randomInt)
            newpokemons.push(randomInt)
        }
        const shuffled = shuffleArray(newpokemons)
        setPokemons(shuffled)
        setFlippedCards(new Array(shuffled.length).fill(false))
        setMatchedCards(new Array(shuffled.length).fill(false))
        setSelectedCards([])
    }, [pokemonList])  //to jest do wyrzucania w momencie kiedy zrobimy przycisk startu i cała logika z useEffect pójdzie do przycisku startu

    const handleCardClick = (index) => {
        if (selectedCards.length === 2) return
        if (matchedCards[index] || flippedCards[index]) return
        if(counter >= 10) setIsFinished(true)

        const newFlipped = [...flippedCards]
        newFlipped[index] = true
        setFlippedCards(newFlipped)

        const newSelected = [...selectedCards, index]
        setSelectedCards(newSelected)

        if (newSelected.length === 2) {
            const [first, second] = newSelected
            setCounter(counter+1)

            if (pokemons[first] === pokemons[second]) {
                // 🎉 para pasuje → zostają odkryte
                const newMatched = [...matchedCards]
                newMatched[first] = true
                newMatched[second] = true
                setMatchedCards(newMatched)
                setSelectedCards([])
                addPokemon(pokemons[first], user.id)
            } else {
                // ❌ brak pary → odwracamy z powrotem po 1s
                setTimeout(() => {
                    const resetFlipped = [...flippedCards]
                    resetFlipped[first] = false
                    resetFlipped[second] = false
                    setFlippedCards(resetFlipped)
                    setSelectedCards([])
                }, 1000)
            }
        }
    }


    return (
        <div style={{height: "100vh", overflow: "auto"}}>
            <div className="top-bar">
                <h1>Memo Game </h1>
                <button
                    onClick={() => navigate("/pokemonCatching")}
                >
                    Go back
                </button>
            </div>
            {isFinished ? (
                <GameOver/>
            ) : (
                <>
                <h1>You have 10 tries. Used tries: {counter}</h1>
                <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                        justifyItems: "center",
                    }}>
                    {pokemons.map((Id, index) => (
                        <MemoCard
                            key={index}
                            pokemonId={Id}
                            isReversed={flippedCards[index] || matchedCards[index]}
                            onClick={() => handleCardClick(index)}
                        />
                    ))}
                </div>
                </>
            )}
            {/* <WorkInProgress/> */}
        </div>
    )
}

export default MemoGame