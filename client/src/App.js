import './App.css';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
// IMPORT COMPONENTES
import Countries from './components/countries/countries.js';
import Inicio from './components/inicio/inicio.js';
import CreateActivity from './components/createActivity/createActivity.js';
import Detail from './components/detail/detail.js';
import Error404 from './components/error404/error404';

function App() {
  return (
    <React.Fragment>
      <div>
        <Switch>
          <Route exact path={"/"}>
            <Inicio />
          </Route>
          <Route exact path={"/countries"}>
            <Countries />
          </Route>
          <Route exact path={"/activities"}>
            <CreateActivity />
          </Route>
          <Route exact path={"/detail/:id"}>
            <Detail />
          </Route>
          <Route path={"*"}>
            <Error404 />
          </Route>
        </Switch>
      </div>
    </React.Fragment>
  );
};

export default App;
