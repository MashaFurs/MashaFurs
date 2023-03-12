import React from 'react';
import PropTypes from 'prop-types';
import DOM from 'react-dom-factories';

import './CardAddNew.css';

class CardAddNew extends React.Component {

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

  state = {
    currURL: this.props.currURL,
    currBrand: this.props.currBrand,
    currModel: this.props.currModel,
    currPrice: this.props.currPrice,
    currStorage: this.props.currStorage,
    URLError: this.props.URLError,
    BrandtError: this.props.BrandtError,
    ModelError: this.props.ModelError,
    priceError: this.props.priceError,
    storageError: this.props.storageError,
    
  };

  cancel =(eo)=> {
    this.props.cbCancel();
  };

  addNewCar= (eo) =>{
    
    let changeItemArr= {
        imgUrl:this.props.currURL,
        brandTitle:this.props.currBrand,
        modelTitle: this.props.currModel, 
        price:this.props.currPrice,
        storage: this.props.currStorage,
        key: this.props.code,
        code: this.props.code
    };
    this.props.cbSaveNewCar( changeItemArr);
  };


 

  render() {

    return (
        <div className='cardWrapAdd'>
         
            <div className='cardAdd'>
                <p>Добавление товара</p>
                <div className='container'>
                    <div> 
                        <span>URL:</span><div><input type="text" defaultValue={this.state.currURL} onChange={this.props.changeUrl} /><span>{this.props.URLError}</span></div>
                        <span>Марка:</span><div><input type="text" defaultValue={this.state.currBrand} onChange={this.props.changeBrand}/><span>{this.props.BrandtError}</span></div>
                    </div>
                    <div>
                        <span>Модель:</span><div><input type="text" defaultValue={this.state.currModel} onChange={this.props.changeModel} /><span>{this.props.ModelError}</span></div>
                        <span>Цена:</span><div><input type="number" defaultValue={this.state.currPrice} onChange={this.props.changePrice} /><span>{this.props.priceError}</span></div>
                    </div>
                    <div>
                        <span>На складе:</span><div><input type="number" defaultValue={this.state.currStorage} onChange={this.props.changeStorage} /><span>{this.props.storageError}</span></div>   
                    </div>
                </div>
                <div className='btnEdit'>
                <button className='btn' disabled={!this.props.valid} onClick={this.addNewCar}>добавить</button>
                <button className='btn' onClick= {this.cancel}>отмена</button>
                </div>
            </div>
            
        </div>
      )
    }

  }


export default CardAddNew;
