import React, { Fragment, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteDetails, getDetails } from "../../redux/actions";
import styles from "./DogDetail.module.css";
import heart from "../../assets/heart.jpg";
import scale from "../../assets/metric.png";
import bone from "../../assets/bone.png";

export default function DogDetail() {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getDetails(id));
    return () => dispatch(deleteDetails());
  }, [dispatch, id]);

  const myDog = useSelector((state) => state.details);
  const temperaments = useSelector((state) => state.temperaments);
  // console.log(temperaments);
  console.log(myDog.temperament);

  return (
    <Fragment>
      {myDog ? (
        <div key={myDog.id} className={styles.bodix}>
          <div className={styles.mainContainer}>
            <h2 className={styles.mainTitle}>
              {myDog.id} - {myDog.name}
            </h2>
            <img src={myDog.image} alt={myDog.name} className={styles.image} />
            <div className={styles.detailsContainer}>
              <div className={styles.life_span}>
                <div className={styles.imageSection}>
                  <img
                    src={heart}
                    alt="a tiny svg dog"
                    className={styles.detailsSVG}
                  />
                </div>
                <div className={styles.infoSection}>
                  <h3>Age: </h3>
                  <p>{myDog.age}</p>
                </div>
              </div>
              <div className={styles.weights}>
                <div className={styles.imageSection}>
                  <img
                    src={scale}
                    alt="a tiny svg dog"
                    className={styles.detailsSVG}
                  />
                </div>
                <div className={styles.infoSection}>
                  <h3>Weight: </h3>
                  <p>Min: {myDog.minWeight}</p>
                  <p>Max: {myDog.maxWeight}</p>
                </div>
              </div>
              <div className={styles.heights}>
                <div className={styles.imageSection}>
                  <img
                    src={bone}
                    alt="a tiny svg bone"
                    className={styles.detailsSVG}
                  />
                </div>
                <div className={styles.infoSection}>
                  <h3>Height: </h3>
                  <p>Min: {myDog.minHeight}</p>
                  <p>Max: {myDog.maxHeight}</p>
                </div>
              </div>
              <br />
              <div className={styles.temperament}>
                <div className={styles.infoSection}>
                  {
                    <div>
                      <h3>Temperament: </h3>
                      <p>
                      {myDog.dataBaseDog
                          ? temperaments.map((el) => {return el}).join(", ")
                          : myDog.temperament}
                      </p>
                    </div>
                  }
                </div>
              </div>
            </div>
            <Link to="/home">
              <button className={styles.button}>Back</button>
            </Link>
          </div>
        </div>
      ) : (
        <h2>Loading...</h2>
      )}
    </Fragment>
  );
}
