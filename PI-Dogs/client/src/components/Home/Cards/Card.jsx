import React from "react";
import { Link } from "react-router-dom";
import styles from "./Card.module.css";

const Card = ( { id, name, image, temperament, temperaments, weight_max, weight_min } ) => {
  if(!temperaments) {
    // Renderizado perro de la API
    return (
      <>
        <div className={styles.dogCard}>
          <Link to={"/dogs/" + id}>
            <div className={styles.titleArea}>
              <h4 className={styles.dogName}>{name}</h4>
              <h5 className={styles.dogName}>Min: {weight_min} - Max: {weight_max} (kg)</h5>
            </div>
            <div className={styles.infoArea}>
              <div className={styles.tempArea}>
                {temperament ? (
                  <h5 className={styles.dogTemp}>{temperament}</h5> 
                  ) : (
                    <h5>Sin temperamento...</h5>
                    )}
              </div>
              <div className={styles.imageArea}>
                <img className={styles.dogImage} src={image} alt={name} height="140px" />
              </div>
            </div>
          </Link>
        </div>
      </>
    );
  } else {
    // Renderizado perro creado
    return (
      <>
        <div className={styles.dogCard}>
          <Link to={"/dogs/" + id}>
            <div className={styles.titleArea}>
              <h4 className={styles.dogName}>{name}</h4>
              <h5 className={styles.dogName}>Min: {weight_min} - Max: {weight_max} (kg)</h5>
            </div>
            <div className={styles.infoArea}>
              <div className={styles.tempArea}>
                {temperaments ? (
                  <h5 className={styles.dogTemp}>
                    {temperaments.map((temp) => temp.name).join(', ')}
                  </h5>
                ) : (
                  <br />
                )}
              </div>
              <div className={styles.imageArea}>
                <img className={styles.dogImage} src={image} alt={name} height="140px" />
              </div>
            </div>
          </Link>
        </div>
      </>
    );
  }
}

export default Card;