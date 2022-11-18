import './navBar.css';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../searchBar/searchBar';
import Order from '../order/order';
import ResetButton from '../resetButton/resetButton';
import ButtonCreate from '../buttonCreate/buttonCreate';

export default class NavBar extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="navBar">
          <Link to={"/"}>
            <button className="btn-inicio">Inicio</button>
          </Link>
          <ButtonCreate />
          <ResetButton />
          <SearchBar />
          <Order />
        </div>
      </React.Fragment>
    );
  }
}