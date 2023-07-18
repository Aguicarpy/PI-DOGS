const validate = (input) => {
    let errors = {};
    let expression = /^[a-zA-Z ]+$/gm;
  
    if (!input.name) {
      errors.name = "Ingrese nombre";
    }
    if (!input.maxHeight || !input.minHeight) {
      errors.height = "Por favor, ingrese altura del perro";
    }
    if (!input.maxWeight || !input.minWeight) {
      errors.weight = "Por favor, ingrese peso del perro";
    }
    if (!input.image) {
      errors.image = "Por favor, ingrese imagen del perro ";
    }
  
    if (parseInt(input.name)) {
      errors.name = "Nombre invalido, ingrese un texto";
    } else if (!expression.test(input.name)) {
      errors.name = "No se permiten caracteres especiales";
    }
  
    if (!input.age) {
      errors.age = "Por favor, ingrese edad del perro";
    } else if (input.age > 20 || input.age < 1) {
      errors.life_span = " life span must be in a number from 1 - 20";
    }
  
    if (Number(input.minWeight) <= 0 || Number(input.minWeight >= 100)) {
      errors.minWeight = "Minimum heigh must be in a number from 0 - 100";
    }
    if (Number(input.maxWeight) <= 0 || Number(input.maxWeight > 100)) {
      errors.maxWeight = "Maximun weight must be in a number from 0 - 150";
    }
    if (Number(input.minHeight) <= 0 || Number(input.minHeight) >= 100) {
      errors.minHeight = "Minimun height must be in a number from 0 - 100";
    }
    if (Number(input.maxHeight) <= 0 || Number(input.maxHeight) > 100) {
      errors.maxHeight = "Maximun height must be in a number from 0 - 100";
    }
    if (!input.temperament.length) {
      errors.temperament = "Selecciona al menos un temperamento";
    }
    return errors;
  };


  export default validate;