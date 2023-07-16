import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getDogsByName, getDogs } from "../../../redux/actions";
import styles from "./SearchBar.module.css";

export default function SearchBar() {
  const [dogState, setDogsState] = useState("");
  const [allDogs, setAllDogs] = useState([]); 
  const dispatch = useDispatch();

  function handleClick(e) {
    e.preventDefault();
    
    if (dogState.length === 0) {
      dispatch(getDogs()).then(() => setAllDogs(allDogs));
    } else {
      dispatch(getDogsByName(dogState))
      // setDogsState("");
    }
  }
  function handleInputChange(e) {
    setDogsState(e.target.value);

    if (e.target.value.length === 0) {
      dispatch(getDogs()).then(() => setAllDogs(allDogs)); // Actualizar el estado allDogs con todos los perros
    }
  }

  return (
    <div className={styles.searchBarObject}>
      <input
        type="text"
        placeholder="Buscar un perro..."
        className={styles.input}
        value={dogState}
        onChange={handleInputChange}
      />
      <button type="submit" onClick={handleClick}>
        <span className="material-icons">Buscar</span>
      </button>
    </div>
  );
}