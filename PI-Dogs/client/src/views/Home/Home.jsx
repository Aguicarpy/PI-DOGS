import React from "react";
import { Fragment } from "react";
import { useState } from "react";
import SideBar from "../../components/Home/SideBar/SideBar";
import Cards from "../../components/Home/Cards/Cards";
import NavBar from "../../components/Home/NavBar/NavBar";
import styles from '../Home/Home.module.css'


const Home = () => {

  const [currentPage, setCurrentPage] = useState(1);
  const [dogsPerPage] = useState(8);
  const indexOfLastDog = currentPage * dogsPerPage;
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;


  return (
    <Fragment>
      <div className={styles.mainContainer}>
        <NavBar />
        <SideBar currentPage={currentPage} setCurrentPage={setCurrentPage} />
        <Cards 
          currentPage={ currentPage } 
          setCurrentPage={ setCurrentPage } 
          dogsPerPage={ dogsPerPage } 
          indexOfFirstDog={ indexOfFirstDog } 
          indexOfLastDog={ indexOfLastDog } 
        />
      </div>
    </Fragment>
  );
}

export default Home;