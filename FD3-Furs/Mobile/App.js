import React from 'react';
import ReactDOM from 'react-dom';

import MobileCompany from './components/MobileCompany';

let clientArr=[
  {id:101, fam:"Иванов", im:"Иван", otch:"Иванович", balance:"200"},
  {id:102, fam:"Сидоров", im:"Сидор", otch:"Сидорович", balance:"250"},
  {id:103, fam:"Петров", im:"Петр", otch:"Петрович", balance:"180"},
  {id:104, fam:"Григорьев", im:"Григорий", otch:"Григорьевич", balance:"-220"}
]

ReactDOM.render(
  <MobileCompany 
    clients={clientArr}
  />
  , document.getElementById('container') 
);

