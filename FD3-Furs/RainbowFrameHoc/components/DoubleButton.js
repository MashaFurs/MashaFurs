import React, { Fragment } from 'react';

import './DoubleButton.css';

class DoubleButton extends React.Component {

    btnClick = (eo) => {
        if(eo.currentTarget.value===this.props.caption1) { this.props.cbPressed(1)}
        else {this.props.cbPressed(2)}
      };

  render() {
    let text=this.props.children;
    return <div className='first'>
                <input type="button" value={this.props.caption1} onClick={this.btnClick}/> <span>{text}</span> <input type="button" value={this.props.caption2} onClick={this.btnClick}/>
          </div>
    
  }

}

export default DoubleButton;
