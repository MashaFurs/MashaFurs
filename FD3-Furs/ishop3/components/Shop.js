import React from 'react';
import PropTypes from 'prop-types';
import DOM from 'react-dom-factories';

import './Shop.css';

import Product from './Product';
import CardView from './CardView';
import CardEdit from './CardEdit';

class Shop extends React.Component {

  static propTypes = {
    // name: PropTypes.string.isRequired,
    // defaultProducts:PropTypes.arrayOf(
    //   PropTypes.shape({
    //     brandTitle: PropTypes.string.isRequired,
    //     modelTitle: PropTypes.string.isRequired,
    //     imgUrl: PropTypes.string.isRequired,
    //     price: PropTypes.number.isRequired,
    //     key: PropTypes.number.isRequired,
    //     storage: PropTypes.number.isRequired,
    //   })
    // ),
  };

  state = {
    selecteItemCode: null,
    products: this.props.defaultProducts,
    cardMode: 0,// 0-нет, 1-просмотр, 2-редактирование, 3-добавление

    btnDisabled:false
  };

  cbProductSelected = (code) => {
    
    this.setState ( {selecteItemCode: code});
    this.setState ( {cardMode: 1});
    this.setState( {btnDisabled: false});
  };

  cbProductDelete = (code) => {
  
    this.setState({ products:this.state.products.filter(  s=> s.code!==code)});
  };

  cbProductRedact =(code) => {
    this.setState ( {selecteItemCode: code});
    this.setState ( {cardMode: 2});
    this.setState( {btnDisabled: true});
  };

  cbSave =(code, changeItem) => {
   this.setState ( {products: this.state.products.map ( item => {
    if (item.code === code) {
      
      item.brandTitle=changeItem.brandTitle;
      item.modelTitle=changeItem.modelTitle;
      item.imgUrl=changeItem.imgUrl;
      item.price=changeItem.price;
      item.storage=changeItem.storage;
      item.code=code;
      item.key=code;
      
      return item;  
              
    } else {
      return item
    }
   })})
  };

  cbCancel= ()=>{
    this.setState ( {cardMode: 1});
    this.setState( {btnDisabled: false});
  };

  addNewCar=()=>{
    console.log("ураа")
  };

  
  render() {

    const productsCode=this.state.products.map( p =>
      <Product key={p.key} code={p.key} brand={p.brandTitle} 
               model={p.modelTitle} img={p.imgUrl} price={p.price} 
               storage={p.storage} selecteItemCode={this.state.selecteItemCode} 
               cbSelected={this.cbProductSelected} cbDelete={this.cbProductDelete}
               cbRedact={this.cbProductRedact} btnDisabled={this.state.btnDisabled}/>);
               

      let itemInfo = this.state.products.find( item => {
                if (item.code === this.state.selecteItemCode) return item
      });


    return  (
      <div className='Shop'>
        <h1 className='name'>{this.props.name}</h1>

        { this.state.cardMode===1 && this.state.selecteItemCode && <CardView itemInfo={itemInfo} />}

        { this.state.cardMode===2 && this.state.selecteItemCode && <CardEdit key={this.state.selecteItemCode} 
                                                                             itemInfo={itemInfo} 
                                                                             cbSave={this.cbSave} 
                                                                             cbCancel={this.cbCancel} 
                                                                             />}

        <div className='products'>{productsCode}</div>
        <div className='addNew'>
          <button className='btnAddNew' disabled={this.state.btnDisabled} onClick= {this.addNewCar}>добавить авто</button>
        </div>
      </div>
    )

  }

}

export default Shop;
