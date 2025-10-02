/**
 * Zwraca losowy ID Pokémona, którego nie ma w pokemonList
 * @param {number[]} pokemonList - lista ID Pokémonów już posiadanych
 * @param {number} maxId - maksymalny ID Pokémona w grze (domyślnie 898)
 * @returns {number} losowy ID Pokémona
 */
export function getRandomPokemon(pokemonList, maxId = 898) {
  if (pokemonList.length >= maxId) {
    throw new Error("Wszystkie Pokemony zostały już złapane!");
  }

  let randomInt = Math.floor(Math.random() * maxId) + 1;
  while (pokemonList.includes(randomInt)) {
    randomInt = Math.floor(Math.random() * maxId) + 1;
  }
  return randomInt;
}

export function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}