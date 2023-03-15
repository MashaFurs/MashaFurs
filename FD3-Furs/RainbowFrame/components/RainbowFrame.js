import React from 'react';

import './RainbowFrame.css';

class RainbowFrame extends React.Component {

  render() {

    let code=this.props.children;
    for( let color of this.props.colors) {
      code=<div className={color} style={ { border:`solid 10px ${color}`}}>{code}</div>
    }
    return code;
    
  }

}

export default RainbowFrame;
