import { createContext, useState, useContext, useEffect} from "react";
import { useAuth } from "./AuthContext";
import { getPokemon } from "../api/api";

const UserPokemonsContext = createContext()

export const UserPokemonsProvider = ({ children }) => {

    const [pokemonList, setPokemonList] = useState([])
    const {user} = useAuth()


    useEffect(() => {
        const updateListEffect = async () => {
            console.log("weszło w useEffect")
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
            if(user.id ==-1) {
                return
            }
            updateListEffect()
        }
    }, [user])
  

    const updateList = async (newPokemon) => {
        if(user.id == -1) {
            const stored = JSON.parse(localStorage.getItem("pokemonList"));
            setPokemonList(stored?.list || []);
            if(!newPokemon) return
            console.log("1")
            const list = [...pokemonList, newPokemon]
            console.log("2")
            setPokemonList(list)
            console.log("3")
            localStorage.setItem("pokemonList", 
                    JSON.stringify({id: user.id, list: list})
            )
            console.log(list)
            console.log("4")
            return
        }
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