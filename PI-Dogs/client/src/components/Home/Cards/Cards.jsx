import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Card from "./Card";
import Pagination from "../../Pagination/Pagination";
import styles from "./Cards.module.css";

const Cards = ({ filterSync }) => {
  const allDogs = useSelector((state) => state.allDogs);
  const [currentPage, setCurrentPage] = useState(1);
  const [dogsPerPage] = useState(8);
  const [filteredAndSortedDogs, setFilteredAndSortedDogs] = useState([]);

  const pagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    // Copiamos el array de perros del estado global
    let filteredDogs = [...allDogs];
    const { filterOrigin, filterTemp, filterMin, filterMax, orderName, orderWeight } = filterSync;

    if (orderName === "asc") {
      filteredDogs = filteredDogs.sort((a, b) => (a.name > b.name ? 1 : -1));
    } else if (orderName === "desc") {
      filteredDogs = filteredDogs.sort((a, b) => (b.name > a.name ? 1 : -1));
    // } else if(orderName === 'all'){
    //   filteredDogs = [...filteredDogs]
    }

    if (orderWeight === "desc") {
      filteredDogs = filteredDogs.sort((a, b) => a.weight_max - b.weight_max);
    } else if (orderWeight === "asc") {
      filteredDogs = filteredDogs.sort((a, b) => b.weight_max - a.weight_max);
    }

    if (filterOrigin === "created") {
      filteredDogs = filteredDogs.filter((dog) => dog.createdInDB);
    } else if (filterOrigin === "inDB") {
      filteredDogs = filteredDogs.filter((dog) => !dog.createdInDB);
    }

    if (filterTemp !== "all") {
      filteredDogs = filteredDogs.filter((dog) => {
        if (dog.temperament) {
          return dog.temperament.includes(filterTemp);
        } else if (dog.temperaments) {
          return dog.temperaments.some((temp) => temp.name === filterTemp);
        }
        return false;
      });
    }

    if (filterMin !== "all") {
      filteredDogs = filteredDogs.filter((dog) => dog.weight_min >= parseInt(filterMin));
    }

    if (filterMax !== "all") {
      filteredDogs = filteredDogs.filter((dog) => dog.weight_max <= parseInt(filterMax));
    }

    // Actualizar la lista de perros filtrados y ordenados
    setFilteredAndSortedDogs(filteredDogs);
    setCurrentPage(1); // Reiniciar la paginación al cambiar los filtros
  }, [allDogs, filterSync]);

  // Calcular los índices para la paginación después de aplicar los filtros y ordenamientos
  const indexOfLastDog = currentPage * dogsPerPage;
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;
  const currentDogs = filteredAndSortedDogs.slice(indexOfFirstDog, indexOfLastDog);

  return (
    <>
      <div className={styles.dogsArea}>
        <Pagination
          dogsPerPage={dogsPerPage}
          allDogs={filteredAndSortedDogs.length}
          pagination={pagination}
          currentPage={currentPage}
        />
        <div className={styles.pagination}></div>
        {currentDogs.map((el) => {
          return (
            <Card
              key={el.id}
              id={el.id}
              name={el.name}
              image={el.image}
              temperament={el.temperament}
              temperaments={el.temperaments}
              weight_min={el.weight_min}
              weight_max={el.weight_max}
            />
          );
        })}
      </div>
    </>
  );
};

export default Cards;


