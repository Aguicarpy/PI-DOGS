import { React, Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getDogs,
  getTemperamentsList,
  filterDogsByTemperament,
  orderByName,
  filterCreated,
  filterDogsByMAXWeight,
  filterDogsByMINWeight,
  filterDogs,
  orderByWeight
} from "../../../redux/actions";
import styles from "./SideBar.module.css";

export default function SideBar() {
  const dispatch = useDispatch();
  const temperaments = useSelector((state) => state.temperaments).sort(
    function (a, b) {
      if (a < b) return -1;
      else return 1;
    }
  );
  const allDogs = useSelector((state) => state.allDogs);

  const [orderBy, setOrderBy] = useState("all");
  const [orderByWeight, setOrderByWeight] = useState("all");
  const [filterCreatedValue, setFilterCreatedValue] = useState("all");
  const [filterTempValue, setFilterTempValue] = useState("all");
  const [filterMaxWeight, setFilterMaxWeight] = useState("all");
  const [filterMinWeight, setFilterMinWeight] = useState("all");

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

  useEffect(() => {
    dispatch(getDogs());
    dispatch(getTemperamentsList());
    // dispatch(getBreeds());
  }, [dispatch]);

  useEffect(() => {
    if (orderBy !== "all") {
      dispatch(orderByName(orderBy));
    }
  }, [dispatch, orderBy]);

  useEffect(() => {
    if (orderByWeight !== "all") {
      dispatch(orderByWeight(orderByWeight));
    }
  }, [dispatch, orderByWeight]);

  useEffect(() => {
    dispatch(filterCreated(filterCreatedValue));
  }, [dispatch, filterCreatedValue]);

  useEffect(() => {
    dispatch(filterDogsByTemperament(filterTempValue));
  }, [dispatch, filterTempValue]);

  useEffect(() => {
    dispatch(filterDogsByMAXWeight(filterMaxWeight));
  }, [dispatch, filterMaxWeight]);

  useEffect(() => {
    dispatch(filterDogsByMINWeight(filterMinWeight));
  }, [dispatch, filterMinWeight]);

  useEffect(() => {
    const filters = {
      orderBy,
      orderByWeight,
      filterCreatedValue,
      filterTempValue,
      filterMaxWeight,
      filterMinWeight
    };

    dispatch(filterDogs(filters));
  }, [
    dispatch,
    orderBy,
    orderByWeight,
    filterCreatedValue,
    filterTempValue,
    filterMaxWeight,
    filterMinWeight
  ]);



  function handleClick(e) {
    e.preventDefault();
    dispatch(getDogs());
  }

  function handleFilterCreated(e) {
    setFilterCreatedValue(e.target.value);
  }

  function handleFilteredByTemp(e) {
    setFilterTempValue(e.target.value);
  }

  function handleFilteredMAXWeight(e) {
    setFilterMaxWeight(e.target.value);
  }

  function handleFilteredMINWeight(e) {
    setFilterMinWeight(e.target.value);
  }

  return (
    <Fragment>
      <div className={styles.side}>
        <div className={styles.sideBarHeader}>
          <h4 className={styles.header}> Find by filters:</h4>
          <div
            className={styles.tooltip}
            onClick={(e) => {
              handleClick(e);
            }}
          >
            <span className="material-icons refresh">loop</span>
          </div>
        </div>
        <hr />
        <div className={styles.filterSection}>
          <h5 className={styles.filterHeader}>Order by name</h5>
          <select
            value={orderBy}
            onChange={(e) => {
              setOrderBy(e.target.value);
            }}
          >
            <option value="all" hidden>
              Order
            </option>
            <option value="asc">A - Z</option>
            <option value="desc">Z - A</option>
          </select>
        </div>
        <div className={styles.filterSection}>
          <h5 className={styles.filterHeader}>Order by weight</h5>
          <select
            value={orderByWeight}
            onChange={(e) => {
              setOrderByWeight(e.target.value);
            }}
          >
            <option value="all" hidden>
              Order
            </option>
            <option value="asc">Heaviest 1º</option>
            <option value="desc">Lightest 1º</option>
          </select>
        </div>
        <div className={styles.filterSection}>
          <h5 className={styles.filterHeader}>Filter by source</h5>
          <select value={filterCreatedValue} onChange={handleFilterCreated}>
            <option value="all">All Sources 🐶</option>
            <option value="created">Yours 🐶</option>
            <option value="inDB">dbase 🐶</option>
          </select>
        </div>
        <div className={styles.filterSection}>
          <h5 className={styles.filterHeader}>Filter by temperament</h5>
          <select value={filterTempValue} onChange={handleFilteredByTemp}>
            <option value="all">All Temperaments</option>
            {temperaments.map((temperament) => {
              return (
                <option value={temperament} key={temperament}>
                  {temperament}
                </option>
              );
            })}
          </select>
        </div>
        <div className={styles.filterSection}>
          <h5 className={styles.filterHeader}>Filter by max weight</h5>
          <select
            value={filterMaxWeight}
            onChange={handleFilteredMAXWeight}
          >
            <option value="all">All Weights</option>
            {allDogsMaxWeights.map((maxWeight) => {
              return maxWeight ? (
                <option value={maxWeight} key={maxWeight}>
                  {maxWeight} kg
                </option>
              ) : (
                ""
              );
            })}
          </select>
        </div>
        <div className={styles.filterSection}>
          <h5 className={styles.filterHeader}>Filter by min weight</h5>
          <select
            value={filterMinWeight}
            onChange={handleFilteredMINWeight}
          >
            <option value="all">All Weights</option>
            {allDogsMinWeights.map((minWeight) => {
              return minWeight ? (
                <option value={minWeight} key={minWeight}>
                  {minWeight} kg
                </option>
              ) : (
                ""
              );
            })}
          </select>
        </div>
        <div className={styles.filterSection}>
          <div className={styles.addDog}>
            <Link to="/create" className={styles.tooltip}>
              <h5 className={styles.filterHeader}>Agrega un Perro</h5>
            </Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
