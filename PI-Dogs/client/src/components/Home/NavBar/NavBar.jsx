import styles from "./NavBar.module.css";
import SearchBar from "./SearchBar";

export default function NavBar() {
  return (
    <>
      <div className={styles.nav}>
      <div className={styles.TitleAndSearchBar}>
        <div className={styles.logoAndTitle}>
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
    </>
  );
}