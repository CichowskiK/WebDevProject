import * as React from "react";
import { addPokemon } from "../api/api"
import { useAuth } from "../context/AuthContext"
import { usePokemonList } from "../context/UserPokemonsContext";
import { useNavigate} from "react-router-dom"
import "./PokemonCatching.css"

function PokemonCatching() {

  const [pokemonId, setPokemonId] = React.useState('')
  const { logout, user } = useAuth()
  const { pokemonList, updateList } = usePokemonList()
  const navigate = useNavigate()
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    addPokemon(pokemonId, user.id)
    updateList()
  }

  const signOut = () => {
    logout()
    navigate("/login")
  }

  const goToPokedex = () => {
    navigate("/pokedex")
  }

  return (
    <div>
      <div className="top-bar">
        <h1>
          {user.username}
        </h1>
        <div>
          <button onClick={signOut}>Sign Out</button>
          <button onClick={goToPokedex}>Pokedex</button>
        </div>
      </div>
      <div className="games-display">
        <button 
          onClick={() => navigate("/pokemonCatching/memo")}
          style={{background: "purple"}}>
            Memo
        </button>
        <button 
          onClick={() => navigate("/pokemonCatching/wackAMole")}
          style={{background: "green"}}>
            Wack a Mole
        </button>
        <button 
          onClick={() => navigate("/pokemonCatching/whosThatPokemon")}
          style={{background: "red"}}>
            Who's That Pokemon
        </button>
      </div>







      {/* <form onSubmit={handleSubmit}>
        <input 
                    type="number"
                    placeholder="Pokemon Id"
                    value={pokemonId}
                    onChange={(e) => setPokemonId(e.target.value)}
                    //required
                />
                <button type="submit">add Pokemon</button>
      </form> */}
    </div>
  );
}

export default PokemonCatching;
