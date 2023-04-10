import React from 'react';
import './scss/app.scss';
import { Routes, Route } from 'react-router-dom';

import Header from '../src/components/Header';
import Home from '../src/pages/Home';
import Cart from '../src/pages/Cart';
import NotFound from '../src/pages/NotFound';


function  App ()  {

  return(
    <div className="wrapper">
    <Header/>
    <div className="content">
      <div className="container">
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
      </div>
    </div>
  </div>
  )
}
export default App;
