import React, { Fragment } from 'react';

import './DoubleButton.css';

class DoubleButton extends React.Component {

    btnClick = (eo) => {
      console.log(eo.currentTarget.dataset.id);
        if(eo.currentTarget.dataset.id==="one") { this.props.cbPressed(1)}
        else {this.props.cbPressed(2)}
      };

  render() {
    let text=this.props.children;
    return <div className='first'>
                <input type="button" data-id="one" value={this.props.caption1} onClick={this.btnClick}/> <span>{text}</span> <input type="button" data-id="two" value={this.props.caption2} onClick={this.btnClick}/>
          </div>
    
  }

}

export default DoubleButton;
