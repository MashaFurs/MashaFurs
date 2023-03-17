import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';

import DoubleButton from './components/DoubleButton';
import { withRainbowFrame } from './components/withRainbowFrame';


let colors=['red','orange', 'yellow','green', '#00BFFF', 'blue', 'purple'];
let FramedDoubleButton=withRainbowFrame(colors)(DoubleButton);

ReactDOM.render(
  
  <Fragment>
      <DoubleButton caption1="однажды" caption2="пору" cbPressed={num => alert(num)} > в студенную зимнюю </DoubleButton>

      <FramedDoubleButton caption1="я из лесу" caption2="мороз" cbPressed={ num => alert(num) }>вышел, был сильный</FramedDoubleButton>
      
  </Fragment>
  

  , document.getElementById('container') 
);
