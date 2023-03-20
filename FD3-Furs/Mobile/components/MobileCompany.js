import React from 'react';
// import PropTypes from 'prop-types';

import ButtonTopFilter from './ButtonTopFilter';
import MobileClient from './MobileClient';

import {voteEvents} from './events';

import './MobileCompany.css';

class MobileCompany extends React.PureComponent {


  state = {
    clients: this.props.clients,
    clientMode: 0,// 0-видны все, 1-активные, 2-заблокированные
  };

  componentDidMount = () => {
    voteEvents.addListener('clientDelete',this.clientDelete);

    voteEvents.addListener('clientsAll',this.clientsAll);
    voteEvents.addListener('clientsActive',this.clientsActive);
    voteEvents.addListener('clientsBlocked',this.clientsBlocked);

  }; 

  componentWillUnmount = () => {
    voteEvents.addListener('clientDelete',this.clientDelete);

    voteEvents.addListener('clientsAll',this.clientsAll);
    voteEvents.addListener('clientsActive',this.clientsActive);
    voteEvents.addListener('clientsBlocked',this.clientsBlocked);
  }

  clientDelete = (id) => {
    let newClients=[...this.state.clients]; // копия массива клиентов
    this.setState({ clients:newClients.filter(  s=> s.id!==id)});  
  };

  clientsAll= () =>{
    this.setState ( {clientMode: 0});
  }
  clientsActive= () =>{
    this.setState ( {clientMode: 1});
  }
  clientsBlocked= () =>{
    this.setState ( {clientMode: 2});
  }

  
  render() {

    console.log("MobileCompany render");

    let clientsMode=this.state.clients.filter( (client) => {
        if( this.state.clientMode===0) { return client};
        if( this.state.clientMode===1) { return client.balance >0};
        if( this.state.clientMode===2) { return client.balance <0};
        
    }) 

    const clientsCode=clientsMode.map( client => {
        return <MobileClient key={client.id} 
                             info={client} />;
      }
    );

    return (
      <div className='MobileCompany'>
        <ButtonTopFilter/>
        <table>
            <thead>
                <tr className='filterTR'>
                    <td>Фамилия</td>
                    <td>Имя</td>
                    <td>Отчество</td>
                    <td>Баланс</td>
                    <td>Статус</td>
                    <td>Редактировать</td>
                    <td>Удалить</td>
                </tr>
            </thead>
            <tbody>
                {clientsCode}
            </tbody>
        </table>
      </div>
    )
    ;

  }

}

export default MobileCompany;
