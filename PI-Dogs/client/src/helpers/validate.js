const validate = (input) => {
    let errors = {};
    let expression = /^[a-zA-Z ]+$/gm;
  
    if (!input.name) {
      errors.name = "Ingrese nombre";
    }
    if (!input.height_max || !input.height_min) {
      errors.height = "Por favor, ingrese altura del perro";
    }
    if (!input.weight_max || !input.weight_min) {
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
  
    if (!input.life_span) {
      errors.life_span = "Por favor, ingrese edad del perro";
    } else if (input.life_span > 25 || input.life_span < 1) {
      errors.life_span = " Inserte un número del 1 al 25";
    }
  
    if (Number(input.weight_min) <= 0 || Number(input.weight_min >= 100)) {
      errors.weight_min = "Ingrese un número del 0 al 100";
    }
    if (Number(input.weight_max) <= 0 || Number(input.weight_max > 100)) {
      errors.weight_max = "Ingrese un número del 0 al 150";
    }
    if (Number(input.height_min) <= 0 || Number(input.height_min) >= 100) {
      errors.height_min = "Ingrese un número del 0 al 100";
    }
    if (Number(input.height_max) <= 0 || Number(input.height_max) > 100) {
      errors.height_max = "Ingrese un número del 0 al 100";
    }
    if (!input.temperament.length) {
      errors.temperament = "Selecciona al menos un temperamento";
    }
    return errors;
  };


  export default validate;