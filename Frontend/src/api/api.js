export const addPokemon = async (pokemonId, userId) => {
  if(userId == -1) return
    try {
      const res = await fetch("https://pokedexbackend-la0a.onrender.com/api/pokemons/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: userId, pokemonId: parseInt(pokemonId) })
      })
      if (!res.ok) throw new Error("Network response was not ok")
    } catch (err) {
      console.error(err);
    }
}

export const getPokemon = async (userId) => {
  if (userId == -1) return
    try {
        const response = await fetch(`https://pokedexbackend-la0a.onrender.com/api/pokemons/${userId}`);
        if (!response.ok) {
            throw new Error("Błąd pobierania pokemonów");
        }

        const data = await response.json();
        return data.map(p => p.pokemonId)
    } catch (err) {
        console.error(err);
    }
}