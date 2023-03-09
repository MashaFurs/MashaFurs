import React from 'react';
import ReactDOM from 'react-dom';

import Shop from './components/Shop';

let storeName= "av.by";
let products=require('./products.json');


ReactDOM.render(
  React.createElement(Shop,{name: storeName,defaultProducts:products}), 
  document.getElementById('container') 

  
);

