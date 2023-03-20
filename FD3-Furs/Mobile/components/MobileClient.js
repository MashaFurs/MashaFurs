import React from 'react';

import {voteEvents} from './events';

import './MobileClient.css';

class MobileClient extends React.PureComponent {


  state = {
    info: this.props.info,
  };

clientDelete = (eo) => {
    voteEvents.emit('clientDelete',this.state.info.id);
  };

  

  render() {

    console.log("MobileClient id="+this.state.info.id+" render");

    const isActive=this.state.info.balance>0;
    
    return (
     <tr>
        <td>{this.state.info.fam}</td>
        <td>{this.state.info.im}</td>
        <td>{this.state.info.otch}</td>
        <td>{this.state.info.balance}</td>
        <td className={isActive?"active":"blocked"}>{isActive?"active":"blocked"}</td>
        <td><button>Редактировать</button></td>
        <td><button onClick={this.clientDelete}>Удалить</button></td>
     </tr>
    );

  }

}

export default MobileClient;
