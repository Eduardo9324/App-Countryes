import './inicio.css';
import React from 'react';
/* import logoCountries from '../../img/logoc.jpg' */
import Ingresar from '../ingresar/ingresar';

const Inicio = () => {
  return (
    <React.Fragment>
      <div>
        <div className="logo1"></div>
        <div className="title">
          <h1>Countries of the world.</h1>
        </div>
        <div className='ingresar'>
          <Ingresar />
        </div>
      </div>
    </React.Fragment>
  );
}

export default Inicio;