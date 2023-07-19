import { useState, useEffect, } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { postDog, getTemperamentsList } from "../../redux/actions";
import styles from "./DogForm.module.css";
import validate from "../../helpers/validate";


const DogCreation = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const temperament = useSelector((state) => state.temperaments).sort(function (a, b) {
      if (a < b) return -1;
      else return 1;
    }
  );
  const [errors, setErrors] = useState({});
  const [isFormComplete, setIsFormComplete] = useState(false);
  const [input, setInput] = useState({
    name: "",
    image:"",
    height_min: "",
    height_max: "",
    weight_min: "",
    weight_max: "",
    life_span: "",
    temperament: [],
  });

  function handleChange(e) {
    setInput({...input, [e.target.name]: e.target.value,});
    setErrors(validate({...input, [e.target.name]: e.target.value,}));
  }

  function handleSelect(e) {
    setInput({...input, temperament: [...input.temperament, e.target.value],});
  }

  function handleDelete(el) {
    setInput({...input, temperament: input.temperament.filter((temp) => temp !== el),});
  }
  useEffect(() => {
    dispatch(getTemperamentsList());
  }, [dispatch]);
  useEffect(() => {
    const requiredFieldsFilled = Object.values(input).every(value => value !== '');
    setIsFormComplete(requiredFieldsFilled);
  }, [input]);

  function handleSubmit(e) {
    e.preventDefault();
    if ( !errors.name && !errors.image && !errors.weight_min && !errors.height_min && !errors.weight_max && !errors.height_max){
      alert("Tu perro ha sido creado con éxito!");
      dispatch(postDog(input));
      setInput({
        name: "",
        image:"",
        height_min: "",
        weight_min: "",
        height_max: "",
        weight_max: "",
        life_span: "",
        temperament: [],
      });
    } else {
      return alert("Algo ha salido mal, intente nuevamente.");
    }
    history.push("/home");
  }

  return (
    <>
      <div className={styles.mainContainerCreation}>
        <div>
          <h2>Crea a tu perro</h2>
        </div>
        <div className={styles.formContainer}>
          <form onSubmit={(e) => handleSubmit(e)}>
            {/* Campo Nombre */}
            <div className={styles.Section}>
              <label>Nombre:</label>
              <input type="text" value={input.name} name="name" placeholder="Ej: Grand Canadian Bulldog..." onChange={(e) => handleChange(e)} required />
              <div>
                <p className={styles.error}>{errors.name}</p>
              </div>
            </div>
            {/* Campo Nombre */}

            {/* Campo Link */}
            <div className={styles.Section}>
              <label>URL:</label>
              <input type="url" value={input.image} name="image" placeholder="Ej: http://myimageontheweb.com..." onChange={(e) => handleChange(e)} />
              <div>
                <p className={styles.error}>{errors.image}</p>
              </div>
            </div>
            {/* Campo Link */}

            {/* Campo Alturas */}
            <div className={styles.Section}>
              <h4>Alturas</h4>
              <label>Minimo</label>
              <input type="number" value={input.height_min} name="height_min" placeholder="Ej: 20" onChange={(e) => handleChange(e)} required />
              <div>
                <p className={styles.error}>{errors.height_min}</p>
              </div>
              <label>Máximo</label>
              <input type="number" value={input.height_max} name="height_max" placeholder="Ej: 50" onChange={(e) => handleChange(e)} required
              />
              <div>
                <p className={styles.error}>{errors.height_max}</p>
              </div>
            </div>
            {/* Campo Alturas */}

            {/* Campo Pesos */}
            <div className={styles.Section}>
              <h4>Pesos</h4>
              <label>Minimo</label>
              <input type="number" value={input.weight_min} name="weight_min" placeholder="Ej: 15" onChange={(e) => handleChange(e)} required />
              <div>
                <p className={styles.error}>{errors.weight_min}</p>
              </div>
              <label>Máximo</label>
              <input type="number" value={input.weight_max} name="weight_max" placeholder="Ej: 32" onChange={(e) => handleChange(e)} required />
              <div>
                <p className={styles.error}>{errors.weight_max}</p>
              </div>
            </div>
            {/* Campo Pesos */}

            {/* Campo Edad */}
            <div className={styles.Section}>
              <label>Tiempo de vida</label>
              <input type="text" value={input.life_span} name="life_span" placeholder="Ej: 12 - 15 years" onChange={(e) => handleChange(e)} />
            <div>
            <p className={styles.error}>{errors.life_span}</p>
            </div>
            </div>
            {/* Campo Edad */}
            {/* Select Temperamentos */}
            <div className={styles.Section}>
              <label>Temperamentos</label>
              <select onChange={(e) => handleSelect(e)} className={styles.styled_select}>
              <option>Seleccione temperamento:</option>
                {temperament.map((temp) => {
                  return (
                    <option key={temp} name={temp}>
                      {temp}
                    </option>
                  )})
                }
              </select>
              <div className={styles.sidebar_box}>
                <h4>Seleccionados:</h4>
                {input.temperament.map((el) => (
                  <div key={el} className={styles.selectedItems}>
                    <p>{el}</p>
                    <button onClick={() => handleDelete(el)}>x</button>
                  </div>))
                }
              </div>
              <div>
                <p className={styles.error}>{errors.temperament}</p>
              </div>
            </div>
            {/* Select Temperamentos */}
            <div className={styles.buttonSection}>
              <Link to="/home">
                <button className={styles.buttonCancel}>Cancelar</button>
              </Link>
              <button className={styles.button} type="submit" disabled={!isFormComplete}>Crear 🐕</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
export default DogCreation;