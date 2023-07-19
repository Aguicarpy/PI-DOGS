import React, { Fragment } from "react";
import Logo from "../../../assets/favicon-32x32.png";
import styles from "./NavBar.module.css";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

export default function NavBar() {
  return (
    <Fragment>
      <div className={styles.nav}>
      <div className={styles.TitleAndSearchBar}>
        <div className={styles.logoAndTitle}>
          <Link to="/home">
            <img
              id="logoHenry"
              src={Logo}
              alt="a happy dog icon"
              className={styles.logo}
            />
          </Link>
          <div className={styles.title}>
            <h1>🐶 Woof Woof 🐶</h1>
            <p>WikiDogs</p>
          </div>
        </div>
        <div>
          <SearchBar />
        </div>
      </div>
        
      </div>
    </Fragment>
  );
}