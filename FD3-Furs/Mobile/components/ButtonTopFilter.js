import React from 'react';

import {voteEvents} from './events';
import './ButtonTopFilter.css';

class ButtonTopFilter extends React.PureComponent {


  render() {
    console.log("ButtonTopFilter render");
    
    return (
      <div className='ButtonTopFilter'>
        <button onClick={ () => { voteEvents.emit('clientsAll');}}>Все</button>
        <button onClick={ () => { voteEvents.emit('clientsActive');}}>Активные</button>
        <button onClick={ () => { voteEvents.emit('clientsBlocked');}}>Заблокированные</button>
      </div>
    );

  }

}

export default ButtonTopFilter;
