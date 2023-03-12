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
    // currkey: this.props.itemInfo.key,
    URLError: this.props.URLError,
    BrandtError: this.props.BrandtError,
    ModelError: this.props.ModelError,
    priceError: this.props.priceError,
    storageError: this.props.storageError,
    
  };

  render() {

    let arrCode= (this.props.itemList).reduce ( (prev, item) => { //Создаю массив из кодов продуктов
        prev.push (item.code);
        return prev;
    }, []); 
    let maxCode=arrCode.reduce ((prev,item) =>{ //Нашла максимальное число в массиве (максимальное значение кода)
        if(item > prev) {
            prev=item
        }
        return prev;
    });
    maxCode+=1; //Увеличила максимальное значение кода в массиве на 1 для новой карточки
    

    return (
        <div className='cardWrapAdd'>
         
            <div className='cardAdd'>
                <p>Добавление товара</p>
                <div className='container'>
                    <div>
                        <span>ID</span><input type="text" defaultValue={maxCode} disabled/>
                        <span>URL:</span><div><input type="text" defaultValue={this.state.currURL} onChange={this.props.changeUrl} /><span>{this.props.URLError}</span></div>
                    </div>
                    <div>
                        <span>Марка:</span><div><input type="text" defaultValue={this.state.currBrand} onChange={this.props.changeBrand}/><span>{this.props.BrandtError}</span></div>
                        <span>Модель:</span><div><input type="text" defaultValue={this.state.currModel} onChange={this.props.changeModel} /><span>{this.props.ModelError}</span></div>
                    </div>
                    <div>
                        <span>Цена:</span><div><input type="number" defaultValue={this.state.currPrice} onChange={this.props.changePrice} /><span>{this.props.priceError}</span></div>
                        <span>На складе:</span><div><input type="number" defaultValue={this.state.currStorage} onChange={this.props.changeStorage} /><span>{this.props.storageError}</span></div>   
                    </div>
                </div>
                <div className='btnEdit'>
                <button className='btn' >добавить</button>
                <button className='btn' >отмена</button>
                </div>
            </div>
            
        </div>
      )
    }

  }


export default CardAddNew;
