import React from 'react';
import PropTypes from 'prop-types';
import DOM from 'react-dom-factories';

import './CardEdit.css';

class CardEdit extends React.Component {

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
    //   })
    // ),
  };

  state = {
    currURL: this.props.itemInfo.imgUrl,
    currBrand: this.props.itemInfo.brandTitle,
    currModel: this.props.itemInfo.modelTitle,
    currPrice: this.props.itemInfo.price,
    currStorage: this.props.itemInfo.storage,
    currkey: this.props.itemInfo.key,
    URLError: "", BrandtError: "", ModelError: "", priceError: "", storageError: "",
    valid: true,
  };

  validation =()=> {
    let URLError="", BrandtError="", ModelError="", priceError="", storageError="", valid;

    if(this.state.currURL.length===0) {URLError="введите URL"};
    if(this.state.currBrand.length===0) {BrandtError="введите марку авто"};
    if(this.state.currModel.length===0) {ModelError="введите модель авто"};
    if( isNaN(this.state.currPrice)) {priceError="введите цену"};
    if( isNaN(this.state.currStorage)) {storageError="введите остаток"};

    valid= (!URLError)&&(!BrandtError)&&(!ModelError)&&(!priceError)&&(!storageError);

    this.setState({ URLError, BrandtError, ModelError, priceError, storageError, valid})
    
  };

  changeUrl =(eo)=> {
    this.setState( {currURL: eo.target.value},this.validation)
  };
  changeBrand =(eo)=> {
    this.setState( {currBrand: eo.target.value},this.validation)
  };
  changeModel =(eo)=> {
    this.setState( {currModel: eo.target.value},this.validation)
  };
  changePrice =(eo)=> {
    this.setState( {currPrice: parseInt(eo.target.value)},this.validation)
  };
  changeStorage =(eo)=> {
    this.setState( {currStorage: parseInt(eo.target.value)},this.validation)
  };


  save =(eo)=> {
    let changeItem= {imgUrl:this.state.currURL,
                     brandTitle:this.state.currBrand,
                     modelTitle: this.state.currModel, 
                     price:this.state.currPrice,
                     storage: this.state.currStorage,
                     key: this.state.currkey};

    this.props.cbSave( this.props.itemInfo.code, changeItem)
  };

  cancel =(eo)=> {
    this.props.cbCancel();
  }

  
  render() {
    this.validation;
      return (
        <div className='cardWrapEdit'>
          {
            (this.props.itemInfo) && 
            <div className='cardEdit'>
                <p>Редактирование товара</p>
                <div className='container'>
                    <div>

                        <span>URL:</span><div><input type="text" value={this.state.currURL} onChange={this.changeUrl}/><span>{this.state.URLError}</span></div>
                        <span>Марка:</span><div><input type="text" value={this.state.currBrand} onChange={this.changeBrand}/><span>{this.state.BrandtError}</span></div>
                    </div>
                    <div>

                        <span>Модель:</span><div><input type="text" value={this.state.currModel} onChange={this.changeModel}/><span>{this.state.ModelError}</span></div>
                        <span>Цена:</span><div><input type="number" value={this.state.currPrice} onChange={this.changePrice}/><span>{this.state.priceError}</span></div>
                    </div>
                    <div>
                      
                        <span>На складе:</span><div><input type="number" value={this.state.currStorage} onChange={this.changeStorage}/><span>{this.state.storageError}</span></div>   
                    </div>
                </div>
                <div className='btnEdit'>
                <button className='btn' disabled={!this.state.valid} onClick= {this.save}>сохранить</button>
                <button className='btn' onClick= {this.cancel}>отмена</button>
                </div>
            </div>
          }
            
        </div>
      )
    }

  }


export default CardEdit;
