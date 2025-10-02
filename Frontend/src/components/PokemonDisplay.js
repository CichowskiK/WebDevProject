import PokemonCard from "./PokemonCard"
import * as React from "react"
import { useVirtualizer } from "@tanstack/react-virtual"


const PokemonDisplay = ({pokemonList, parentRef}) => {
    function useWindowWidth() {
        const [width, setWidth] = React.useState(window.innerWidth)
    
        React.useEffect(() => {
            const handleResize = () => setWidth(window.innerWidth)
            window.addEventListener("resize", handleResize)
            return () => window.removeEventListener("resize", handleResize)
        }, [])
    
        return width
        }
    
    
      // ile kolumn w gridzie
      const columns = Math.floor(useWindowWidth()/250)
      const rowCount = Math.ceil(pokemonList.length / columns)
    
      const rowVirtualizer = useVirtualizer({
        count: rowCount, // ilość rzędów (nie pojedynczych pokemonów)
        getScrollElement: () => parentRef.current,
        estimateSize: () => 280, // wysokość jednego rzędu (dopasuj do CSS karty)
        overscan: 4, // ładuje dodatkowe rzędy przed i po widocznym
      })

    return (
        <div
                ref={parentRef}
                className="pokemon-display"
              >
                <div
                  style={{
                    height: `${rowVirtualizer.getTotalSize()}px`,
                    position: "relative",
                  }}
                >
                  {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                    const startIndex = virtualRow.index * columns
                    const rowPokemons = pokemonList.slice(
                      startIndex,
                      startIndex + columns
                    )
                    //console.log("Renderuję wiersz:", virtualRow.index, rowPokemons)
        
                    return (
                      <div
                        key={virtualRow.key}
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          display: "grid",
                          gridTemplateColumns: `repeat(${columns}, 1fr)`,
                          gap: "1px",
                          transform: `translateY(${virtualRow.start}px)`,
                        }}
                      >
                        {rowPokemons.map((pokemon) => (
                          <PokemonCard
                            key={pokemon.id}
                            pokemonInfo={pokemon}
                          />
                        ))}
                      </div>
                    )
                  })}
                </div>
              </div>
    )
}

export default PokemonDisplay