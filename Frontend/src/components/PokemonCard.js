import "./PokemonCard.css"

const typeIcons = {
  Fire: "/types/fire.png",
  Bug: "/types/bug.png",
  Dark: "/types/dark.png",
  Dragon: "/types/dragon.png",
  Electric: "/types/electric.png",
  Fairy: "/types/fairy.png",
  Fighting: "/types/fighting.png",
  Flying: "/types/flying.png",
  Ghost: "/types/ghost.png",
  Grass: "/types/grass.png",
  Ground: "/types/ground.png",
  Ice: "/types/ice.png",
  Normal: "/types/normal.png",
  Poison: "/types/poison.png",
  Psychic: "/types/psychic.png",
  Rock: "/types/rock.png",
  Steel: "/types/steel.png",
  Water: "/types/water.png",
};

const PokemonCard = ({pokemonInfo}) => {

    return(
        <div className="pokemon-card">
            <h1>{pokemonInfo.id}</h1>
            <h2>{pokemonInfo.name.english}</h2>
            <img className= "pokemon-sprite"src={pokemonInfo.image.sprite}></img>
            <div className="pokemon-types">
                {pokemonInfo.type.map((t) => (
                    <img
                        key={t}
                        className="pokemon-type"
                        src={typeIcons[t] || "/images/types/unknown.png"}
                        alt={t}
                    />
                ))}
            </div>
        </div>
    )
}

export default PokemonCard