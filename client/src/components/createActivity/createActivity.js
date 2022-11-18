import "./createActivity.css";
import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

//IMPORTAR ACCIONES
import { getActivities, createActivity } from "../../Redux/actions/index.js";

/* Creo una funcion donde van todas las condiciones que debe cumplir el formulario */
const validate = (input) => {
  let errors = {};
  if (!input.name) {
    errors.name = "Nombre Obligatorio";
  }
  else if (!input.difficulty) {
    errors.difficulty = "Debe marcar una dificultad.";
  }
  else if (!input.duration || input.duration <= 0 || input.duration > 24) {
    errors.duration = "Debe ingresar un rango valido.";
  } else if (!errors.season) {
    errors.season = "Campo necesario.";
  }
  return errors;
};


const CreateActivity = () => {
  /* guardo dispatch en una constante para poder manipularlo */
  const dispatch = useDispatch();
  
  /* guardo el useHistory en una constante para poder manipularlo */
  const history = useHistory();

  /* me traigo y guardo en una variavle o (constante) todo mi estado global usando el useSelector */
  const countries = useSelector((state) => state.countries); 

  /* Me creo un estado para el manejo de errores (validacion de formulario) */
  const [errors, setErrors] = useState({})
  
  /* creo un estado local donde se van a almacenar todos los datos necesarios para mi formulario controlado, son todos los datos que necesita la createActivity  */
  const [input, setInput] = useState({
    name: "",
    difficulty: "",
    duration: "",
    season: "",
    countries: [],
  });

  /* Esta funcion coge cada atributo "name", y es la que me permite actualizar mis estados locales  */
  const handleChange = (e) => {
    /* e.preventDefault(); */
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
    /* aqui se pasa el estado "Errors" con la funcion creada como parametro */
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value
      })
    );
    console.log(input)
  };

  /* Esta funcion modifica el destado de la "dificultadad" dependiendo del check que haya sido marcado */
  const handleChack = (e) => {
    e.preventDefault();
    /* si esta marcado el check, trae todo el estado y actualiza la propiedad especifica */
    if (e.target.checked) {
      setInput({
        ...input,
        difficulty: e.target.value
      });
    }
  };

  /* Esta funcion trae todo mi estado actual y lo concatena con todo lo que se guarda en el select */
  const handleSelect = (e) => {
    e.preventDefault();
    setInput({
      ...input,
      countries: [...input.countries, e.target.value],
    });
  };


  const handleSubmit = (e) => {
    e.preventDefault(); // evita que se recargue la pagina
    console.log(input);
    dispatch(createActivity(input));
    alert('Actividad creada exitosamente !!!')
    setInput({
      name: "",
      difficulty: "",
      duration: "",
      season: "",
      countries: [],
    });
    //el histoy me redirige a mi pagina principal (OPCIONAL)
    history.push('/countries')
    dispatch(getActivities()); //actualiza toda la pag de nuevo
  };
  
  
  //Esta funcion elemina en elemento de mi estado, me devuelve un estado nuevo sin ese elemento en particular
  const handleDelete = (e) => {
    setInput({
      ...input,
      countries: input.countries.filter((el) => el !== e),
    });
  };


  useEffect(() => {
    dispatch(getActivities());
  }, []);


  return (
    <React.Fragment>
      <div>
        <div className="go-back">
          <Link to={"/countries"}>
            <button className="vol">Volver</button>
          </Link>
        </div>

        <div className="general-contnet">
          <h1 className="title-activity">Crea tu Actividad</h1>
          {/* Si no es establece un "key" para los input React nos toma a todos por igual */}
          <form className="form" onSubmit={(e) => handleSubmit(e)}>
            <div>
              <label className="lab-nombre">Nombre</label>
              <input
                type={"text"}
                value={input.name}
                name={"name"}
                placeholder={"Nombre de la actividad"}
                required
                onChange={(e) => handleChange(e)}
              />
              {errors.name && <p>{errors.name}</p>}
            </div>
            <br />
            <div className="chack">
              <label className="lab-difi">Dificultad</label>
              <label className="1">
                <input
                  type={"checkbox"}
                  name={"1"}
                  value={"1"}
                  onChange={(e) => handleChack(e)}
                />
                1
              </label>
              <label>
                <input
                  type={"checkbox"}
                  name={"2"}
                  value={"2"}
                  onChange={(e) => handleChack(e)}
                />
                2
              </label>
              <label>
                <input
                  type={"checkbox"}
                  name={"3"}
                  value={"3"}
                  onChange={(e) => handleChack(e)}
                />
                3
              </label>
              <label>
                <input
                  type={"checkbox"}
                  name={"4"}
                  value={"4"}
                  onChange={(e) => handleChack(e)}
                />
                4
              </label>
              <label>
                <input
                  type={"checkbox"}
                  name={"5"}
                  value={"5"}
                  onChange={(e) => handleChack(e)}
                />
                5
              </label>
              {errors.difficulty && <p>{errors.difficulty}</p>}
            </div>
            <br />
            <div>
              <label className="lab-duracion">Duracion</label>
              <input
                type={"text"}
                value={input.duration}
                name={"duration"}
                placeholder={"Ingresa No ente 1 a 24"}
                required
                onChange={(e) => handleChange(e)}
              />
              {errors.duration && <p>{errors.duration}</p>}
            </div>
            <br />
            <div>
              <label className="lab-tem">Temporada</label>
              <input
                type={"text"}
                value={input.season}
                name={"season"}
                placeholder={"Epoca del año"}
                required
                onChange={(e) => handleChange(e)}
              />
              {errors.season && <p>{errors.season}</p>}
            </div>
            <br />
            <select onChange={(e) => handleSelect(e)}>
              {countries.map((e, index) => (
                <option key={index} value={e.name}>
                  {e.name}
                </option>
              ))}
            </select>

            <ul>
              <li>{input.countries.map((e) => e + " - ")}</li>
            </ul>

            <div className="content-btnCa">
              <button type={"submit"} className={"btn-createActivity"}>
                Crear Actividad
              </button>
            </div>
          </form>

          {input.countries.length > 0 &&
            input.countries.map((e, index) => (
              <div key={index}>
                <p>{e}</p>
                {/* renderiza un parrafo con el elemento en cuestion */}
                <button className="button-x" onClick={() => handleDelete(e)}>
                  X
                </button>
              </div>
            ))}
        </div>
      </div>
    </React.Fragment>
  );
};

export default CreateActivity;