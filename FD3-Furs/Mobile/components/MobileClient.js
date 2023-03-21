import React from 'react';

import {voteEvents} from './events';

import './MobileClient.css';

class MobileClient extends React.PureComponent {


  state = {
    info: this.props.info,
  };


  componentDidUpdate = (oldProps, oldState) => {
    console.log("MobileClient id="+this.props.info.id+" componentDidUpdate");
    if ( this.props.info.fam!==this.state.info.fam ||
         this.props.info.im!==this.state.info.im ||
         this.props.info.otch!==this.state.info.otch ||
         this.props.info.balance!==this.state.info.balance)
      this.setState({info:this.props.info});
  };

  clientDelete = (eo) => {
    voteEvents.emit('clientDelete',this.state.info.id);
  };


  clientEdit=(eo) => {
    voteEvents.emit('clientEdit',this.state.info);
  }

  
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
        <td><button onClick={this.clientEdit}>Редактировать</button></td>
        <td><button onClick={this.clientDelete}>Удалить</button></td>
     </tr>
    );

  }

}

export default MobileClient;
