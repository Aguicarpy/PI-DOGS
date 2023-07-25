import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./SideBar.module.css";

const SideBar = ({ filterSync, handleClickOrder, handleClickOrderWeight, handleFilterCreated, handleFilteredByTemp, handleFilteredMAXWeight, handleFilteredMINWeight,}) => {
  const temperaments = useSelector((state) => state.temperaments)
  .sort(function (a, b) {
      if (a < b) return -1;
      else return 1;
    }
  );
  const allDogs = useSelector((state) => state.allDogs);

  const minWeights = allDogs
    .map((el) => el.weight_min)
    .sort(function (a, b) {
      return a - b;
    });
  const allDogsMinWeights = [...new Set(minWeights)];

  const maxWeights = allDogs
    .map((el) => el.weight_max)
    .sort(function (a, b) {
      return a - b;
    });
  const allDogsMaxWeights = [...new Set(maxWeights)];

  return (
    <>
      <div className={styles.side}>
        <div className={styles.sideBarHeader}>
          <h3 className={styles.header}> Filtros:</h3>
        </div>
        <hr />
        <div className={styles.filterSection}>
          <h5 className={styles.filterHeader}>Nombre</h5>
          <select name="orderName" value={filterSync.orderName} onChange={(e) => {handleClickOrder(e); }}>
            <option disabled>Ordenar por Nombre</option>
            <option value="all">Sin especificar</option>
            <option value="asc">Ascendente: A - Z</option>
            <option value="desc">Descendente: Z - A</option>
          </select>
        </div>
        <div className={styles.filterSection}>
          <h5 className={styles.filterHeader}>Peso</h5>
          <select name="orderWeight" value={filterSync.orderWeight} onChange={(e) => {handleClickOrderWeight(e); }}>
            <option disabled>Ordenar por Peso</option>
            <option value="all">Sin especificar</option>
            <option value="asc">Orden: Mayor peso</option>
            <option value="desc">Orden: Menor peso</option>
          </select>
        </div>
        <div className={styles.filterSection}>
          <h5 className={styles.filterHeader}>Origen</h5>
          <select
            name="filterOrigin"
            value={filterSync.filterOrigin}
            onChange={(e) => {
              handleFilterCreated(e);
            }}
          >
            <option value="all">Todos 🐶</option>
            <option value="created">Creados 🐶</option>
            <option value="inDB">Api 🐶</option>
          </select>
        </div>
        <div className={styles.filterSection}>
          <h5 className={styles.filterHeader}>Temperamento</h5>
          <select
            name="filterTemp"
            value={filterSync.filterTemp}
            onChange={(e) => handleFilteredByTemp(e)}
          >
            <option value="all">Todos</option>
            {temperaments.map((temp) => {
              return (
                <option value={temp} key={temp}>
                  {temp}
                </option>
              );
            })}
          </select>
        </div>
        <div className={styles.filterSection}>
          <h5 className={styles.filterHeader}>Peso mínimo</h5>
          <select
            name="filterMin"
            value={filterSync.filterMin}
            onChange={(e) => handleFilteredMINWeight(e)}
          >
            <option value="all">Sin especificar</option>
            {allDogsMinWeights.map((minWeight) => {
              return minWeight ? (
                <option value={minWeight} key={minWeight}>
                  {minWeight} kg
                </option>
              ) : (
                "null"
              );
            })}
          </select>
        </div>
        <div className={styles.filterSection}>
          <h5 className={styles.filterHeader}>Peso máximo</h5>
          <select
            name="filterMax"
            value={filterSync.filterMax}
            onChange={(e) => handleFilteredMAXWeight(e)}
          >
            <option value="all">Sin especificar</option>
            {allDogsMaxWeights.map((maxWeight) => {
              return maxWeight ? (
                <option value={maxWeight} key={maxWeight}>
                  {maxWeight} kg
                </option>
              ) : (
                "null"
              );
            })}
          </select>
        </div>

        <div className={styles.filterSection}>
          <div className={styles.addDog}>
            <Link to="/create/" className={styles.tooltip}>
              <h3 className={styles.filterHeader}>Agregar Perro 🐕</h3>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;
