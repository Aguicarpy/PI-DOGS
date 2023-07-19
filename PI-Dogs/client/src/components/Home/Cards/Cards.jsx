import Card from "./Card";
import Pagination from "../../Pagination/Pagination";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDogs } from "../../../redux/actions";
import styles from "./Cards.module.css";

const Cards = ({currentPage,setCurrentPage,dogsPerPage,indexOfFirstDog,indexOfLastDog}) => {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.allDogs);
  // const [currentPage, setCurrentPage] = useState(1);
  // const [dogsPerPage] = useState(8);
  // const indexOfLastDog = currentPage * dogsPerPage;
  // const indexOfFirstDog = indexOfLastDog - dogsPerPage;
  const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog);
  const paginate = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
   dispatch(getDogs());
  }, [dispatch]);

  return (
    <>
     <div className={styles.dogsArea}>
        <Pagination
          dogsPerPage={dogsPerPage}
          allDogs={allDogs.length}
          paginate={paginate}
          currentPage={currentPage}
        />
        <div className={styles.pagination}></div>
        {
          currentDogs.map((el) => { 
            return  (
          <Card
            key={el.id}
            id={el.id}
            name={el.name}
            image={el.image}
            temperament={el.temperament} //TEMPERAMENTO API
            temperaments={el.temperaments} //TEMPERAMENTO DB
            weight_min={el.weight_min}
            weight_max={el.weight_max}
          />
        )})}
      </div>
    </>
  );
}

export default Cards;