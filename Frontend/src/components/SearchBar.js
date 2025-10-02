import * as React from "react"
import "./SearchBar.css"

const SearchBar = ({onSearch}) => {
    
    const [query, setQuery] = React.useState('')

    const handleChange = (e) => {
        const value = e.target.value
        setQuery(value)
        onSearch(value)
    }

    return (
        <div>
            <input 
                className="pokemon-search"
                placeholder="Search Pokemon"
                type="search"
                autoComplete="on"
                onChange={handleChange}
                value={query}
            />
        </div>
    )
}

export default SearchBar