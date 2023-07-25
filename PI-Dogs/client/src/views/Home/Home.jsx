import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import SideBar from "../../components/Home/SideBar/SideBar";
import Cards from "../../components/Home/Cards/Cards";
import NavBar from "../../components/Home/NavBar/NavBar";
import styles from "../Home/Home.module.css";
import { getDogs, getTemperamentsList, filterCreated, orderByName, filterDogsByMAXWeight, filterDogsByMINWeight,orderByWeight,} 
from "../../redux/actions";

const Home = () => {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.allDogs);
  const temperaments = useSelector((state) => state.temperaments);

  const [filterSync, setFilterSync] = useState({
    orderName: "all",
    orderWeight: "all",
    filterOrigin: "all",
    filterTemp: "all",
    filterMin: "all",
    filterMax: "all",
  });

  useEffect(() => {
    !(allDogs.length) && dispatch(getDogs());
    !(temperaments.length) && dispatch(getTemperamentsList());
  }, [dispatch, allDogs, temperaments]);

  function handleClickOrder(e) {
    e.preventDefault();
    const { name, value } = e.target;
    dispatch(orderByName(value));
    setFilterSync((prevFilterSync) => ({ ...prevFilterSync, [name]: value }));
  }

  function handleClickOrderWeight(e) {
    e.preventDefault();
    const { name, value } = e.target;
    dispatch(orderByWeight(value));
    setFilterSync((prevFilterSync) => ({ ...prevFilterSync, [name]: value }));
  }

  function handleFilterCreated(e) {
    e.preventDefault();
    const { name, value } = e.target;
    dispatch(filterCreated(value));
    value === 'all' ? dispatch(getDogs()) : dispatch(filterCreated(value))
    setFilterSync((prevFilterSync) => ({ ...prevFilterSync, [name]: value }));
  }

  function handleFilteredByTemp(e) {
    e.preventDefault();
    const { name, value } = e.target;

    // Si se selecciona "Todos", mostramos todos los perros nuevamente sin aplicar filtro de temperamento.
    if (value === "all") {
      dispatch(getDogs());
    } else {
      // Filtrar los perros en el estado global por el temperamento seleccionado.
      allDogs.filter((dog) => {
        if (dog.temperament) {
          // Para los perros de la API, el temperamento es una cadena de texto.
          return dog.temperament?.includes(value);
        } else {
          // Para los perros creados, el temperamento es un array de objetos.
          return temperaments?.some((temp) => temp.name === value);
        }
      });
      
    }

    setFilterSync((prevFilterSync) => ({ ...prevFilterSync, [name]: value }));
  }

  function handleFilteredMAXWeight(e) {
    e.preventDefault();
    const { name, value } = e.target;
    value === "all" ? dispatch(getDogs()) : dispatch(filterDogsByMAXWeight(value));
    setFilterSync((prevFilterSync) => ({ ...prevFilterSync, [name]: value }));
  }

  function handleFilteredMINWeight(e) {
    e.preventDefault();
    const { name, value } = e.target;
    value === "all" ? dispatch(getDogs()) : dispatch(filterDogsByMINWeight(value));
    setFilterSync((prevFilterSync) => ({ ...prevFilterSync, [name]: value }));
  }

  return (
    <>
      <div className={styles.mainContainer}>
        <NavBar />
        <SideBar
          filterSync={filterSync}
          handleClickOrder={handleClickOrder}
          handleClickOrderWeight={handleClickOrderWeight}
          handleFilterCreated={handleFilterCreated}
          handleFilteredByTemp={handleFilteredByTemp}
          handleFilteredMAXWeight={handleFilteredMAXWeight}
          handleFilteredMINWeight={handleFilteredMINWeight}
        />
        <Cards filterSync={filterSync} />
      </div>
    </>
  );
};

export default Home;
