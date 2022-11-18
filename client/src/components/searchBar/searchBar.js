import './searchBar.css';
import React from 'react';
import { useState } from 'react';
import { searchCountry } from '../../Redux/actions/index.js';
import { useDispatch } from 'react-redux';

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(searchCountry(search)); 
  }

  const onInputChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value)
  }

  return (
    <React.Fragment>
      <div>
        {/* <div className="title">
          <h1>Countries of the world.</h1>
        </div> */}
        <form className="searchBar" onSubmit={onSubmit}>
          <input
            type="text"
            onChange={onInputChange}
            value={search}
            placeholder="search by name"
          />
          <input type="submit" value="Buscar" />
        </form>
      </div>
    </React.Fragment>
  );
}

export default SearchBar;