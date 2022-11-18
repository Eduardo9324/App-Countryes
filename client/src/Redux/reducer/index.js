
import { GET_ALL_COUNTRIES, SEARCH_COUNTRY, FILTER_BY_CONTINENT, ORDER_BY_NAME, ORDER_BY_POPULATION, FILTER_CREATE, CREATE_ACTIVITY, GET_ACTIVITIES, GET_DETAILS } from "../actions/index";

const initialState = {
  allCountries: [],
  countries: [],
  activities: [],
  detail: []
};

export default function rootReducer (state = initialState, action) {
  switch (action.type) {
    case GET_ALL_COUNTRIES:
      return {
        ...state,
        allCountries: action.payload,
        countries: action.payload,
      };

    case SEARCH_COUNTRY:
      return {
        ...state,
        allCountries: action.payload,
      };

    case FILTER_BY_CONTINENT:
      const allCoun = state.countries
      const filtered =
        action.payload === "All"
          ? allCoun
          : allCoun.filter((e) => e.continent === action.payload);
      return {
        ...state, allCountries: filtered
      };
    
    case ORDER_BY_NAME:
      const orderName = [...state.allCountries]
      const orderByName = orderName.sort((a, b) => {
        if (a.name > b.name) { 
          return action.payload === 'asc' ? 1 : -1;
        }
        if (a.name < b.name) {
          return action.payload === 'des' ? 1 : -1;
        }
        return 0;
      })
      return {
        ...state,
        allCountries: orderByName,
      };
    
    case ORDER_BY_POPULATION:
      const orderPopulation = [...state.allCountries]
      const orderByPopulation = orderPopulation.sort((a, b) => {
        if (a.population > b.population) {
          return action.payload === 'pasc' ? 1 : -1;
        }
        if (a.population < b.population) {
          return action.payload === 'pdes' ? 1 : -1;
        }
        return 0;
      })
      return {
        ...state,
        allCountries: orderByPopulation
      };
    
      case GET_ACTIVITIES:
        return {
          ...state,
          activities: action.payload 
        };
      
    case FILTER_CREATE:
      /* const allActivities = state.activities */
      const filteredActivities = state.countries.filter(e => {
        return e.activities.find(e => {
          return e.name === action.payload
        })
      }) 
      /* const allsCountries = state.activities
      const createFilter =
        action.payload === "All"
          ? allsCountries.filter((e) => e.createInDb)
          : allsCountries.filter((e) => !e.createInDb); */
      return {
        ...state,
        allCountries: filteredActivities /* filteredActivities */,
      };
    
    case CREATE_ACTIVITY:
      return {
        ...state,
      };
    
    case GET_DETAILS:
      return {
        ...state,
        detail: action.payload
      };
    
    default:
      return {
        ...state,
      };
  };
};
