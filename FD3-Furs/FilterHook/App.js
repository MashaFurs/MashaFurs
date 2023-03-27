import React from 'react';
import ReactDOM from 'react-dom';

import Filter from './components/Filter';

let wordList= ['california', 'everything', 'aboveboard', 'washington', 'basketball', 'weathering', 'characters', 'literature', 'contraband', 'appreciate'];

ReactDOM.render(
  <Filter 
      words={wordList}
  />
  , document.getElementById('container') 
);

