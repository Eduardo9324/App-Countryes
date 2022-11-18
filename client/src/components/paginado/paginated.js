import './paginated.css';
import React from "react";

const Paginated = ({ countryesForPage, countries, pages }) => {
  const numberPages = [];

  for (let i = 0; i < Math.ceil(countries / countryesForPage); i++) {
    numberPages.push(i + 1);
  }

  return (
    <React.Fragment>
      <nav className='paginacion'>
        <ul className="ul">
          {numberPages &&
            numberPages.map((number) => (
              <li className='li' key={number}>
                <a className='a' onClick={() => pages(number)}>{number}</a>
              </li>
            ))}
        </ul>
      </nav>
    </React.Fragment>
  );
};

export default Paginated;