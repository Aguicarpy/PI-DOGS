import React from "react";
import { Fragment } from "react";
import SideBar from "../../components/SideBar/SideBar";
import Cards from "../../components/Home/Cards/Cards";
import NavBar from "../../components/Home/NavBar/NavBar";
import styles from '../Home/Home.module.css'


export default function Home() {
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