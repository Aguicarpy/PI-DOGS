import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteDetails, getDetails } from "../../redux/actions";
import styles from "./DogDetail.module.css";
import heart from "../../assets/heart.jpg";
import scale from "../../assets/metric.png";
import bone from "../../assets/bone.png";

const DogDetail = () => {
  const dispatch = useDispatch();
  const {id} = useParams()

  useEffect(() => {
    dispatch(getDetails(id));
    return () => dispatch(deleteDetails());
  }, [dispatch, id]);

  const myDog = useSelector((state) => state.details);

  return (
    <>
      {myDog ? (
        <div key={myDog.id} className={styles.bodix}>
          <div className={styles.mainContainer}>
            <h2 className={styles.mainTitle}>{myDog.name}</h2>
            <img src={myDog.image} alt={myDog.name} className={styles.image} />
            <div className={styles.detailsContainer}>
              <div className={styles.life_span}>
                <div className={styles.imageSection}>
                  <img src={heart} alt="heart" className={styles.details} />
                </div>
                <div className={styles.infoSection}>
                  <h4>Edad: </h4>
                  <p>{myDog.life_span}</p>
                </div>
              </div>
              <div className={styles.weights}>
                <div className={styles.imageSection}>
                  <img src={scale} alt="scale" className={styles.details} />
                </div>
                <div className={styles.infoSection}>
                  <h4>Peso: </h4>
                  <p>Min: {myDog.weight_min}</p>
                  <p>Max: {myDog.weight_max}</p>
                </div>
              </div>
              <div className={styles.heights}>
                <div className={styles.imageSection}>
                  <img src={bone} alt="bone" className={styles.details} />
                </div>
                <div className={styles.infoSection}>
                  <h4>Altura: </h4>
                  <p>Min: {myDog.height_min}</p>
                  <p>Max: {myDog.height_max}</p>
                </div>
              </div>
              <br />
              <div className={styles.temperament}>
                <div className={styles.infoSection}>
                  {<div>
                      <h4>Temperamento: </h4>
                      <p>
                        {myDog.createdInDB
                          ? myDog.temperaments.map((el) => el.name).join(", ")
                          : myDog.temperament}
                      </p>
                    </div>}
                </div>
              </div>
            </div>
            <Link to="/home">
              <button className={styles.button}>Atrás</button>
            </Link>
          </div>
        </div>
      ) : (
        <h2>Cargando...</h2>
      )}
    </>
  );
}

export default DogDetail;