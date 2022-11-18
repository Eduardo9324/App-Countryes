import './resetButton.css';
import React from 'react';
import { useDispatch } from 'react-redux';
/* import { getAllCountries } from "../../Redux/actions"; */



const ResetButton = () => {
  const dispatch = useDispatch();

  const handleClick = (e) => {
    e.preventDefault();
    /* dispatch(getAllCountries()); */
    dispatch(window.location.reload()); 
  };

  return (
    <React.Fragment>
      <div>
        <button className="btn-reset" onClick={handleClick}>
          Reset
        </button>
      </div>
    </React.Fragment>
  );
}


export default ResetButton;