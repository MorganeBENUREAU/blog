import './style.scss';

// import { useState, useEffect } from 'react';

import Accueil from '../Accueil';
import Page404 from '../Page404';


import { Routes, Route } from 'react-router-dom';


const App = () => {
  

  return (
  
    <div className="app">

        <Routes>

            <Route path='/' exact element={<Accueil />} />

            <Route path='*' element={<Page404 />} />

        </Routes>

    </div>
  )
};


export default App;
