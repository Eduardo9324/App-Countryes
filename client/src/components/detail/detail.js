import './detail.css';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getDetail } from '../../Redux/actions/index';



const Detail = () => {
  const dispatch = useDispatch();

let { id } = useParams();
  //Se puede acceder al id de cada elemento usando props.match.params.id
  useEffect(() => {
    dispatch(getDetail(id));
  }, [dispatch])

  // Me traigo el estado del reducer 
  const myCountry = useSelector((state) => state.detail)


  return (
    <React.Fragment>
      <div className="go-backk">
        <Link to={"/countries"}>
          <button className="voll">Volver</button>
        </Link>
        <div className="cardDetail">
          {myCountry ? (
            <div className='card-img'>
              <h1 className="name">{myCountry.name}</h1>
              <img className="img" src={myCountry.image} />
              <h2 className="capital">{myCountry.capital}</h2>
              <h2 className="continent">{myCountry.continent}</h2>
              <h2 className="subregion">Subregion: {myCountry.subregion}</h2>
              <h2 className="area">Area: {myCountry.area}</h2>
              <h2 className="population">Poblacion: {myCountry.population}</h2>
              <h2 className="activities">
                activities:{" "}
                {myCountry.activities ? (
                  myCountry.activities.map((e) => e.name + " ")
                ) : (
                  <p>No hay actividades.</p>
                )}
              </h2>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Detail;
