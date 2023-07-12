import React from "react";
import { useState } from "react";



const SearchBar = ({onSearch}) => {
    const [name, setName] = useState('')
    
    const handleChange = (event) => {
    setName(event.target.value)
    }

    const cleanInput = (event) => {
        onSearch(name)
        setName(' ')
    }

    return(
        <div>
            <input 
            type="search"
            placeholder="Ingrese raza del perro"
            onChange={handleChange}
            value={name}/>
            <button onClick={()=> cleanInput()}>Search Dog</button>
        </div>
    )
}

export default SearchBar;