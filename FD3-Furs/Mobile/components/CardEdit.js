import React from 'react';
import {voteEvents} from './events';

import './CardEdit.css';

class CardEdit extends React.PureComponent {

    constructor(props) {
        super(props);
        this.famRef = React.createRef();
        this.imRef = React.createRef();
        this.otchRef = React.createRef();
        this.balanceRef = React.createRef();
    }


    save = (eo) => {
        const element = {
            id: this.props.itemInfo.id,

            fam: this.famRef.current ? this.famRef.current.value : this.props.itemInfo.fam,
            im: this.imRef.current ? this.imRef.current.value : this.props.itemInfo.im,
            otch: this.otchRef.current ? this.otchRef.current.value : this.props.itemInfo.otch,
            balance: this.balanceRef.current ? +this.balanceRef.current.value : this.props.itemInfo.balance,
        }

        voteEvents.emit('SaveClient', element);
    }

    cancel =(eo) => {
        voteEvents.emit('CancelClient'); 
    }

  render() {
    
    console.log('MobileForm render')

    return (
     <div className='cardEdit'>
        <div className='input'>
            <div><span>Фамилия:</span><input type="text" defaultValue={this.props.itemInfo.fam} ref={this.famRef}/></div>
            <div><span>Имя:</span><input type="text" defaultValue={this.props.itemInfo.im} ref={this.imRef}/></div>
            <div><span>Отчество:</span><input type="text" defaultValue={this.props.itemInfo.otch} ref={this.otchRef}/></div>
            <div><span>Баланс:</span><input type="text" defaultValue={this.props.itemInfo.balance} ref={this.balanceRef}/></div>
        </div>
        <div className='btn'>
            <button className='save' onClick={this.save}>сохранить</button>
            <button className='save' onClick={this.cancel}>отменить</button>
        </div>
     </div>
    );

  }

}

export default CardEdit;
