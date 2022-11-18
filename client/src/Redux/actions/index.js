import axios from 'axios';
//CONSTANTES DE ACTIONS
export const GET_ALL_COUNTRIES = 'GET_ALL_COUNTRIES';
export const SEARCH_COUNTRY = 'SEARCH_COUNTRY';
export const FILTER_BY_CONTINENT = 'FILTER_BY_CONTINENT';
export const ORDER_BY_NAME = 'ORDER_BY_NAME';
export const ORDER_BY_POPULATION = 'ORDER_BY_POPULATION';
export const FILTER_CREATE = 'FILTER_CREATE';
export const CREATE_ACTIVITY = 'CREATE_ACTIVITY';
export const GET_ACTIVITIES = 'GET_ACTIVITIES';
export const GET_DETAILS = 'GET_DETAILS';


// trae toda la informacion desde mi tura del backend
export const getAllCountries = () => {
  return function (dispatch) {
    axios.get("http://localhost:3001/api/countries")
      .then(country => {
        dispatch({
          type: GET_ALL_COUNTRIES,
          payload: country.data
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }
};

// action para busqueda (searchBar)
export const searchCountry = (search) => {
  return function (dispatch) {
    axios
      .get(`http://localhost:3001/api/countries?name=${search}`)
      .then((country) => {
        dispatch({
          type: SEARCH_COUNTRY,
          payload: country.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

// accion para filtrar por continente, el payload es el value del select 
export const filterCountryesByContinent = (payload) => {
  console.log(payload)
  return {
    type: FILTER_BY_CONTINENT,
    payload,
  }
};


// accion para filtrar por nombre
export const orderByName = (payload) => {
  return {
    type: ORDER_BY_NAME,
    payload
  }
};


// accion para filtrar por cantidad de poblacion
export const orderByPopulation = (payload) => {
  return {
    type: ORDER_BY_POPULATION,
    payload
  }
};

export const filterCreate = (payload) => {
  return {
    type: FILTER_CREATE,
    payload
  }
};

//obtener actividades
export const getActivities = () => {
  return (dispatch) => {
    axios.get("http://localhost:3001/api/activities")
      .then(activity => {
        dispatch({
          type: GET_ACTIVITIES,
          payload: activity.data
        })
      })
      .catch((error) => {
        console.log(error);
      })
  }
};


// accion para crear actividad 
export const createActivity = (payload) => {
  return async (dispatch) => {
    try {
      const response = await axios.post("http://localhost:3001/api/activities", payload);
      console.log(response);
      return dispatch({
        type: CREATE_ACTIVITY,
      })
    } catch (error) {
      console.log(error)
    }
  }
};

// Esta accion obtiene los detalles de cada pais por si id
export const getDetail = (id) => {
  return async (dispatch) => {
    try {
      const detail = await axios.get(`http://localhost:3001/api/countries/${id}`)
      console.log(detail);
      return dispatch({
        type: GET_DETAILS,
        payload: detail.data
      })
    } catch (error) {
      console.log(error)
    }
  }
}; 