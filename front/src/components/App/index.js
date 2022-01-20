import './style.scss';

// import { useState, useEffect } from 'react';

import Accueil from '../Accueil';
import Page404 from '../Page404';


import { Routes, Route } from 'react-router-dom';


const App = () => {
  

  return (
  
    <div className="app">

        <Routes>

            <Route path='/' exact >
                <Accueil/>
            </Route>

            <Route>
                <Page404 />
            </Route>

        </Routes>

    </div>
  )
};


export default App;
