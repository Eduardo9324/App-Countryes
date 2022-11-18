import './countryCard.css';
import React from 'react';
/* import { Link } from 'react-router-dom'; */

const CountryCard = ({ id, name, image, continent, capital, population }) => {
  return (
    <React.Fragment>
      <div className="countryCard">
        <div className="card-image">
            <h3 className="name">{name}</h3>
            <img className="img" src={image} alt={`Country ${name}`} />
            <h4 className="continent">{continent}</h4>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CountryCard;