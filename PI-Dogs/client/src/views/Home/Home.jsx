import SideBar from "../../components/Home/SideBar/SideBar";
import Cards from "../../components/Home/Cards/Cards";
import NavBar from "../../components/Home/NavBar/NavBar";
import styles from '../Home/Home.module.css'


const Home = () => {

  return (
    <>
      <div className={styles.mainContainer}>
        <NavBar />
        <SideBar  />
        <Cards />
      </div>
    </>
  );
}

export default Home;