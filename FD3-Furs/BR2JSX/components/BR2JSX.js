import React, { Fragment } from 'react';

import './BR2JSX.css';

class BR2JSX extends React.Component {

  render() {

    let words=this.props.text.split(/<br\s?\/?>/);
    let result=[];
    for( let i=0; i<words.length; i++) {
      if (i>0)  {result.push (<br/>);}
      result.push(words[i]);
    }
    return <Fragment>{result}</Fragment>;
    
  }

}

export default BR2JSX;
