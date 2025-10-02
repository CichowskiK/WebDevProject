import * as React from "react"
import "./MemoCard.css"
import PokemonCard from "./PokemonCard"
import { getRandomPokemon } from "./GamesFunctions"
import { usePokemonList } from "../context/UserPokemonsContext"
import pokemons from "../assets/Pokemon.json"

const MemoCard = ({ pokemonId, onClick, isReversed }) => {
    return (
        <div>
            {!isReversed ? (
                <div className="memo-card" onClick={onClick}>
                    <img 
                        style={{ width: "120px" }}
                        src="/gameImg/pokeball.png"
                        alt="Pokeball"
                    />
                </div>
            ) : (
                <PokemonCard pokemonInfo={pokemons[pokemonId - 1]} />
            )}
        </div>
    )
}

export default MemoCard