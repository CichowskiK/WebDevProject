import * as React from "react"
import { useNavigate } from "react-router-dom"
import "./Pokedex.css"
import SearchBar from "../components/SearchBar"
import pokemons from "../assets/Pokemon.json"
import { useAuth } from "../context/AuthContext"
import { usePokemonList } from "../context/UserPokemonsContext"
import PokemonDisplay from "../components/PokemonDisplay"

const Pokedex = () => {
  const { logout, user } = useAuth()
  const { pokemonList, updateList } = usePokemonList()
  const navigate = useNavigate()
  const userPokemons = pokemonList

  React.useEffect(() => {
    updateList()
  }, [])

  const catchingPokemons = () => {
    navigate("/pokemonCatching")
  }

  const [searchQuery, setSearchQuery] = React.useState('')

  const onSearch = (value) => {
    if (parentRef.current) {
      // przewija wewnętrzny kontener na górę
      parentRef.current.scrollTo({ top: 0});
    }
    setSearchQuery(value)
  }

  const filteredPokemons = pokemons
  .filter(p => userPokemons.includes(p.id))
  .filter((p) => {
    if(/^[A-Za-z]+$/.test(searchQuery)) {
      return p.name.english.toLowerCase().includes(searchQuery.toLocaleLowerCase())
    } else if(/^[0-9]+$/.test(searchQuery)) {
      return p.id == searchQuery
    } else {
      return true
    }
  })

  const signOut = () => {
    logout()
    navigate("/login")
  }

  const parentRef = React.useRef()

  return (
    <div className="pokedex">
      <div className="top-bar">
        <h1>
          {user.username}
        </h1>
        <SearchBar onSearch={onSearch}></SearchBar>
        <div>
        <button onClick={signOut}>Sign Out</button>
        <button onClick={catchingPokemons}>Catch Pokemons</button>
        </div>
      </div>
      <PokemonDisplay pokemonList={filteredPokemons} parentRef={parentRef}/>
    </div>
  )
}

export default Pokedex