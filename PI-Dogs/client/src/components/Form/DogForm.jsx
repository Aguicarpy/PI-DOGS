import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getTemperamentsList, postDog } from "../../redux/actions";
import validate from "../../helpers/validate";
import s from "../Form/DogForm.module.css";

const DogsForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const temperament = useSelector((state) => state.temperaments)
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    name: "",
    age: "",
    image: "",
    minWeight: "",
    maxWeight: "",
    minHeight: "",
    maxHeight: "",
    temperament: [],
  });

  
  function handleChange(event) {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
    setErrors(
      validate({
        ...input,
        [event.target.name]: event.target.value,
      })
    );
  }

  function handleSelect(event) {
    setInput({
      ...input,
      temperament: [...input.temperament, event.target.value],
    });
  }

  const handleDelete = (el) => {
    setInput({
      ...input,
      temperament: input.temperament.filter((temp) => temp !== el),
    });
  };
  
  function handleSubmit(event) {
    event.preventDefault();
    if (!errors.name && !errors.image && !errors.minWeight && !errors.minHeight && !errors.maxWeight && !errors.maxHeight) {
      alert("Your dog has been created successfully");
      dispatch(postDog(input));
      setInput({
        name: "",
        image:"",
        minWeight: "",
        maxWeight: "",
        minHeight: "",
        maxHeight: "",
        age: "",
        temperament: [],
      });
    } else {
      return alert("Something went wrong. Please try again.");
    }
    history.push("/home");
  }

  useEffect(() => {
    dispatch(getTemperamentsList());
  }, [dispatch]);
  
  return (
    <>
      <div className={s.mainContainerCreation}>
        <div>
          <h2>Create your Woof</h2>
        </div>
        <div className={s.formContainer}>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className={s.Section}>
              <label>Name:</label>
              <input
                type="text"
                value={input.name}
                name="name"
                placeholder="Grand Canadian Bulldog"
                onChange={(e) => handleChange(e)}
                required
              />
              <div>
                <p className={s.error}>{errors.name}</p>
              </div>
            </div>
            <div className={s.Section}>
              <label>Image URL:</label>
              <input
                type="url"
                value={input.image}
                name="image"
                placeholder="http://myimageontheweb.com"
                onChange={(e) => handleChange(e)}
              />
              <div>
                <p className={s.error}>{errors.image}</p>
              </div>
            </div>
            <div className={s.Section}>
              <h4>Heights</h4>
              <label>Min</label>
              <input
                type="number"
                value={input.minHeight}
                name="minHeight"
                placeholder="20"
                onChange={(e) => handleChange(e)}
                required
              />
              <div>
                <p className={s.error}>{errors.minHeight}</p>
              </div>
              <label>Max</label>
              <input
                type="number"
                value={input.maxHeight}
                name="maxHeight"
                placeholder="50"
                onChange={(e) => handleChange(e)}
                required
              />
              <div>
                <p className={s.error}>{errors.maxHeight}</p>
              </div>
            </div>
            <div className={s.Section}>
              <h4>Weights</h4>
              <label>Min</label>
              <input
                type="number"
                value={input.minWeight}
                name="minWeight"
                placeholder="15"
                onChange={(e) => handleChange(e)}
                required
              />
              <div>
                <p className={s.error}>{errors.minWeight}</p>
              </div>
              <label>Max</label>
              <input
                type="number"
                value={input.maxWeight}
                name="maxWeight"
                placeholder="32"
                onChange={(e) => handleChange(e)}
                required
              />
              <div>
                <p className={s.error}>{errors.maxWeight}</p>
              </div>
            </div>
            <div className={s.Section}>
              <label>Life Span</label>
              <input
                type="text"
                value={input.age}
                name="age"
                placeholder="12 - 15 years"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className={s.Section}>
              <label>Temperaments</label>
              <select onChange={(e) => handleSelect(e)} className={s.styled_select}>
                {temperament.map((temp) => {
                  return (
                    <option key={temp} name={temp}>
                      {temp}
                    </option>
                  );
                })}
              </select>
              <div className={s.sidebar_box}>
                <h4>You have selected that:</h4>
                {input.temperament.map((el) => (
                  <div key={el} className={s.selectedItems}>
                    <p>{el}</p>
                    <button onClick={() => handleDelete(el)}>x</button>
                  </div>
                ))}
              </div>
            </div>
            <div className={s.buttonSection}>
              <Link to="/home">
                <button className={s.buttonCancel}>Cancel</button>
              </Link>
              <button className={s.button} type="submit">
                Creat 🐕
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};


export default DogsForm