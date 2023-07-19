import React from "react";
import { Fragment } from "react";
import SideBar from "../../components/Home/SideBar/SideBar";
import Cards from "../../components/Home/Cards/Cards";
import NavBar from "../../components/Home/NavBar/NavBar";
import styles from '../Home/Home.module.css'


const Home = () => {
  return (
    <Fragment>
      <div className={styles.mainContainer}>
        <NavBar />
        <SideBar />
        <Cards />
      </div>
    </Fragment>
  );
}

export default Home;