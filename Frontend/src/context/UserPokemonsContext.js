import { createContext, useState, useContext, useEffect} from "react";
import { useAuth } from "./AuthContext";
import { getPokemon } from "../api/api";

const UserPokemonsContext = createContext()

export const UserPokemonsProvider = ({ children }) => {

    const [pokemonList, setPokemonList] = useState([])
    const {user} = useAuth()


    useEffect(() => {
        const updateList = async () => {
                const storedPokemonList = JSON.parse(localStorage.getItem("pokemonList"))
            if(!storedPokemonList || storedPokemonList.id != user.id) {
                //console.log("nie ma listy")
                const list = await getPokemon(user.id)
                localStorage.setItem("pokemonList", 
                    JSON.stringify({id: user.id, list: list})
                )
                setPokemonList(list)
            } else {
                //console.log(storedPokemonList)
                setPokemonList(storedPokemonList.list)
                //console.log(pokemonList)
            }
        }
        if(user) {
            updateList()
        }
    }, [user])
  

    const updateList = async () => {
        const list = await getPokemon(user.id)
        localStorage.setItem("pokemonList", 
                    JSON.stringify({id: user.id, list: list})
        )
        setPokemonList(list)
    }

    return (
        <UserPokemonsContext.Provider value={{ pokemonList, updateList}}>
            {children}
        </UserPokemonsContext.Provider>
    );
};

export const usePokemonList = () => useContext(UserPokemonsContext);