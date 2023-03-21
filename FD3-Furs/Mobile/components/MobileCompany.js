import React from 'react';


import ButtonTopFilter from './ButtonTopFilter';
import MobileClient from './MobileClient';
import CardEdit from './CardEdit';

import {voteEvents} from './events';

import './MobileCompany.css';

class MobileCompany extends React.PureComponent {


  state = {
    clients: this.props.clients,
    clientMode: 0,// 0-видны все, 1-активные, 2-заблокированные
    isRedact:0, //0-карточка редактирования отключена,1-включена
    editClient: "",

  };

  componentDidMount = () => {
    voteEvents.addListener('clientDelete',this.clientDelete);

    voteEvents.addListener('clientsAll',this.clientsAll);
    voteEvents.addListener('clientsActive',this.clientsActive);
    voteEvents.addListener('clientsBlocked',this.clientsBlocked);

    voteEvents.addListener('clientEdit',this.clientEdit);
    voteEvents.addListener('SaveClient',this.SaveClient);
    voteEvents.addListener('CancelClient',this.CancelClient);

  }; 

  componentWillUnmount = () => {
    voteEvents.addListener('clientDelete',this.clientDelete);

    voteEvents.addListener('clientsAll',this.clientsAll);
    voteEvents.addListener('clientsActive',this.clientsActive);
    voteEvents.addListener('clientsBlocked',this.clientsBlocked);

    voteEvents.addListener('clientEdit',this.clientEdit);
    voteEvents.addListener('SaveClient',this.SaveClient);
    voteEvents.addListener('CancelClient',this.CancelClient);
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

  clientEdit=(info) =>{
    this.setState ( {isRedact: 1,
                     editClient:info});
  }

  SaveClient=(client) =>{
    this.setState({ isRedact: 0 });

    let newClientss=[...this.state.clients]; // копия массива клиентов

    newClientss.forEach ( (c,i) => {
      if( c.id==client.id) {
        let newClient= {...c};
        newClient.fam=client.fam;
        newClient.im=client.im;
        newClient.otch=client.otch;
        newClient.balance=client.balance;

        newClientss[i]=newClient;
      } 
    });
    this.setState ( {clients:newClientss});
    }

    CancelClient=()=> {
      this.setState({ isRedact: 0 });
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

        { this.state.isRedact===1 &&<CardEdit itemInfo={this.state.editClient}
                                              isRedact={this.state.isRedact} />}
      </div>
    )
    ;

  }

}

export default MobileCompany;
