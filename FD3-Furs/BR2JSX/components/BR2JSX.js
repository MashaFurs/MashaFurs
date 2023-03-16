import React, { Fragment } from 'react';

import './BR2JSX.css';

class BR2JSX extends React.Component {

  render() {

    let words=this.props.text.split(/<br\s?\/?>/);
    
    const result = words.map((el, i) => {
      return (
          <Fragment key={i}>
              {i>0 && <br />} 
              {el}
          </Fragment>
      )
  })
      
    return <div className='wrap'>{result}</div>;
 
  }

}

export default BR2JSX;
