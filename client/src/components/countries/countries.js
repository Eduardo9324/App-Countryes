import './countries.css';
import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCountries } from '../../Redux/actions';
// IMPORT COMPONENTES
import CountryCard from '../countryCard/countryCard.js';
import NavBar from '../navBar/navBar';
import Paginated from '../paginado/paginated';
import { Link } from 'react-router-dom';
/* import Detail from '../detail/detail'; */

const Countries = () => {
  const countries = useSelector((state) => state.allCountries);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCountries())
  }, [dispatch])

  /* console.log(countries) */
  // ESTADOS LOCALES (PAGINADO)
  const [countryPage, setCountryPage] = useState(1); //PAGINA ACTUAL
  const [countryesForPage, setCountryesForPage] = useState(10); // ELEMENTOS POR PAGINA
  const indexOfLastCountry = countryPage * countryesForPage
  const indexOfFirstCountry = indexOfLastCountry - countryesForPage
  const correntCountryes = countries.slice(indexOfFirstCountry, indexOfLastCountry)

  const pages = (numberPage) => {
    setCountryPage(numberPage)
  }
  return (
    <React.Fragment>
      <div className="countries">
        <div className="fullNav">
          <NavBar />
        </div>
        <Paginated
          countryesForPage={countryesForPage}
          countries={countries.length}
          pages={pages}
        />
        <div className='renderCard'>
          {correntCountryes.map((e) => {
            return (
              <Link key={e.id} to={"/detail/" + e.id}>
                <CountryCard
                  key={e.id}
                  id={e.id}
                  name={e.name}
                  image={e.image}
                  continent={e.continent}
                  capital={e.capital}
                  population={e.population}
                />
              </Link>
            )
          })}
        </div>
      </div>
    </React.Fragment>
  );
}

export default Countries;