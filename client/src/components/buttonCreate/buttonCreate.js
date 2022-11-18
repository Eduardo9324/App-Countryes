import './buttonCreate.css';
import React from 'react';
import { Link } from 'react-router-dom';

const ButtonCreate = () => {
  return (
    <React.Fragment>
      <div>
        <Link to={"/activities"}>
          <button className="btn-create">Crear</button>
        </Link>
      </div>
    </React.Fragment>
  );
}

export default ButtonCreate;