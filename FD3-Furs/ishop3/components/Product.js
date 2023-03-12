import React from 'react';
import PropTypes from 'prop-types';
import DOM from 'react-dom-factories';

import './Product.css';

class Product extends React.Component {

  static propTypes = {
    // defaultProducts:PropTypes.arrayOf(
    //   PropTypes.shape({
    //     brandTitle: PropTypes.string.isRequired,
    //     modelTitle: PropTypes.string.isRequired,
    //     imgUrl: PropTypes.string.isRequired,
    //     price: PropTypes.number.isRequired,
    //     key: PropTypes.number.isRequired,
    //     code: PropTypes.number.isRequired,
    //     storage: PropTypes.number.isRequired,
    //     cbSelected: PropTypes.func.isRequired,
    //     cbDelete: PropTypes.func.isRequired,
          //  cbRedact: PropTypes.func.isRequired,
    //   })
    // ),
  };

  productClicked = (eo) => {
    if(!this.props.cardColor && !this.props.cardColorEdit) {this.props.cbSelected(this.props.code)};
  };

  delete = (eo) => { 
    eo.stopPropagation ();
    this.props.cbDelete(this.props.code);

  };

  redact= (eo) => {
    eo.stopPropagation ();
    this.props.cbRedact(this.props.code);
  }

  render() {

      return (
        <div className={(this.props.selecteItemCode === this.props.code&&(!this.props.cardColor))?"card one":"card two"} onClick={this.productClicked}>
          <img className='imgUrl' src={this.props.img}/>
          <p className='brandTitle'>Марка: {this.props.brand}</p>
          <p className='modelTitle'>Модель: {this.props.model}</p>
          <p className='price'>Цена: {this.props.price} $</p>
          <p className='storage'>Осталось на складе: {this.props.storage} шт.</p>
          <div className='del'>
            <button className='btn' disabled={this.props.btnDisabled} onClick= {this.redact}>изменить</button>
            <button className='btn' disabled={this.props.btnDisabled} onClick= {this.delete}>удалить</button>
          </div>
        </div>
      )
    }

  }


export default Product;
