import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getTemperamentsList, postDog } from "../../redux/actions";
import validate from "../../helpers/validate";
import s from "../Form/DogForm.module.css";

const DogsForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const temperaments = useSelector((state) => state.temperaments);
  const [errors, setErrors] = useState("");
  const [input, setInput] = useState({
    name: "",
    life_span: "",
    image: "",
    temperament: [],
    minWeight: "",
    maxWeight: "",
    minHeight: "",
    maxHeight: "",
  });

  useEffect(() => {
    dispatch(getTemperamentsList());
  }, [dispatch]);

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
    if (input.temperament.find((t) => t.id === event.target.value.split(",")[0])) {
      console.log({ input });
      alert("Already in the list");
    } else {
      setInput({
        ...input,
        temperament: [
          ...input.temperament,
          {
            id: event.target.value.split(",")[0],
            name: event.target.value.split(",")[1],
          },
        ],
      });
    }
  }

  const handleDelete = (event) => {
    setInput({
      ...input,
      temperament: input.temperament.filter((el) => el !== event),
    });
  };

  function handleSubmit(event) {
    if (
      input.name && !parseInt(input.name) &&input.life_span &&input.minWeight &&input.maxWeight &&input.minHeight 
      && input.maxHeight &&input.image &&input.temperament &&input.temperament.length > 0) {
      event.preventDefault();
      dispatch(
        postDog({
          name: input.name,
          life_span: input.life_span,
          image: input.image,
          maxHeight: input.maxHeight,
          minHeight: input.minHeight,
          maxWeight: input.maxWeight,
          minWeight: input.minWeight,
          temperaments: input.temperament.map((t) => +(t.id)),
        })
      );

      alert("Perro creado con exito");
      setInput({
        name: "",
        life_span: "",
        minWeight: "",
        maxWeight: "",
        minHeight: "",
        maxHeight: "",
        image: "",
        temperament: [],
      });
      history.push("/home");
    } else {
      alert("Información incompleta");
      event.preventDefault();
    }
  }

  return (
    <div className={s.container}>
      <div className={s.back}>
        <Link to="/home">Ir a la página principal</Link>
        <p className={s.return}>Return</p>
      </div>
      <h2 className={s.title}>Crear nueva raza</h2>
      <form
        className={s.form}
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        {/* Titles */}
        <div className={s.titles}>
          <label>Raza: </label>
          <label>Año: </label>
          <label>Altura (Cm): </label>
          <label>Peso (Kg): </label>
          <label>Imagen: </label>
          <label>Temperamento: </label>
        </div>

        {/* Inputs */}
        <div className={s.inputs}>
          {/* BreedName */}
          <div style={{ width: "352px" }}>
            <input
              style={{ width: "352px" }}
              type="text"
              placeholder="Nombre de raza"
              value={input.name}
              name="name"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <br />
          {/* life_span */}
          <div style={{ width: "352px" }}>
            <input
              style={{ width: "352px" }}
              type="number"
              placeholder="Edad"
              value={input.life_span}
              name="life_span"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <br />
          <div className={s.heightDiv}>
            {/* MaxHeight */}
            <div>
              <input
                type="number"
                min="0"
                placeholder="Altura máxima"
                value={input.maxHeight}
                name="maxHeight"
                onChange={(e) => handleChange(e)}
              />
            </div>
            {/* MinHeight */}
            <div>
              <input
                type="number"
                min="0"
                placeholder="Altura minima"
                value={input.minHeight}
                name="minHeight"
                onChange={(e) => handleChange(e)}
                style={{ marginLeft: "10px" }}
              />
            </div>
          </div>
          <br />
          <div className={s.weightDiv}>
            {/* MaxWeight */}
            <div>
              <input
                type="number"
                min="0"
                placeholder="Peso máximo"
                value={input.maxWeight}
                name="maxWeight"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <br />
            {/* MinWeight */}
            <div>
              <input
                type="number"
                min="0"
                placeholder="Peso minimo"
                value={input.minWeight}
                name="minWeight"
                onChange={(e) => handleChange(e)}
                style={{ marginLeft: "10px" }}
              />
            </div>
          </div>
          <br />
          {/* Image */}
          <div style={{ width: "352px" }}>
            <input
              style={{ width: "352px" }}
              type="URL"
              placeholder="URL de la imagen"
              value={input.image}
              name="image"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <br />
          {/* Temperament */}
          <div>
            <select onChange={(e) => handleSelect(e)}>
            {temperaments.map((temp) => {
                  return (
                    <option key={temp} name={temp}>
                      {temp}
                    </option>
                  );
                })}
            </select>
          </div>
        </div>
      </form>

      <div>
        {input.temperament.map((el, i) => (
          <button
            className={s.buttonTemperament}
            key={i}
            type="reset"
            onClick={() => handleDelete(el)}
          >
            {el.name} X
          </button>
        ))}
        {errors.temperament && <p className="error">{errors.temperament}</p>}
      </div>

      <div className={s.submit}>
        <button
          className={s.buttonSubmit}
          type="submit"
          onClick={(e) => handleSubmit(e)}
        >
          Crear raza
        </button>
      </div>
      {/*Errors */}
      <div className={s.errors}>
        <ul>
          {errors.name && <li className="error">{errors.name}</li>}

          {errors.life_span && <li className="error">{errors.life_span}</li>}

          {(errors.weight && <li className="error">{errors.weight}</li>) ||
            (errors.maxWeight && (
              <li className="error">*{errors.maxWeight}</li>
            )) ||
            (errors.minWeight && <li className="error">{errors.minWeight}</li>)}

          {(errors.height && <li className="error">{errors.height}</li>) ||
            (errors.maxHeight && (
              <li className="error">{errors.maxHeight}</li>
            )) ||
            (errors.minHeight && <li className="error">{errors.minHeight}</li>)}

          {errors.image && <li className="error">{errors.image}</li>}
        </ul>
      </div>
    </div>
  );
};


export default DogsForm