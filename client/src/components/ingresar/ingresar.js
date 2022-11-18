import './ingresar.css';
import React from 'react';
import { Link } from 'react-router-dom';

const Ingresar = () => {
  return (
    <React.Fragment>
      <div>
        <Link to={"/countries"}>
          <div>
            <button className="btnIngresar">Ingresar</button>
          </div>
        </Link>
      </div>
    </React.Fragment>
  );
}

export default Ingresar;