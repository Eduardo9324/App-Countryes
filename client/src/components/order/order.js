import './order.css';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  filterCountryesByContinent,
  orderByName,
  orderByPopulation,
  filterCreate,
} from "../../Redux/actions/index.js";

const Order = () => {
  const dispatch = useDispatch();
  const acty = useSelector((state) => state.activities);

  const handleFilterContinent = (e) => {
    /* console.log(e.target.value)  */
    /* e.preventDefault(); */
    dispatch(filterCountryesByContinent(e.target.value));
  };

  const handleFilterByName = (e) => {
    /* e.preventDefault(); */
    dispatch(orderByName(e.target.value));
  };

  const handleFilterByPopulation = (e) => {
    e.preventDefault();
    dispatch(orderByPopulation(e.target.value));
  };

  const handleFilterCreate = (e) => {
    e.preventDefault();
    dispatch(filterCreate(e.target.value));
  }

  return (
    <React.Fragment>
      <div className="select">
        <select name="select" onChange={handleFilterByName}>
          <option value="asc">A - Z</option>
          <option value="des">Z - A</option>
        </select>
        <select name="select" onChange={handleFilterByPopulation}>
          <option value="pasc">Poblacion Ascendente</option>
          <option value="pdes">Poblacion Descendente</option>
        </select>
        <select name="select" onChange={handleFilterContinent}>
          <option value="All">Todos</option>
          <option value="Continent: Asia">Asia</option>
          <option value="Continent: Africa">Africa</option>
          <option value="Continent: Antarctica">Antartida</option>
          <option value="Continent: Europe">Europa</option>
          <option value="Continent: North America">Norte America</option>
          <option value="Continent: South America">Sur America</option>
          <option value="Continent: Oceania">Oceania</option>
        </select>
        <select name="select" onChange={(e) => handleFilterCreate(e)}>
          <option value="All">Actividades Creadas</option>
          {acty.map((e, index) => {
            //cuando se ponen llaves USAR EL RETURN !!!
            return (
              <option key={index} value={e.name}>
                {e.name}
              </option>
            )
          })}
        </select>
      </div>
    </React.Fragment>
  );
}

export default Order;