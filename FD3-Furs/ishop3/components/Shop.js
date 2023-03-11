import React from 'react';
import PropTypes from 'prop-types';
import DOM from 'react-dom-factories';

import './Shop.css';

import Product from './Product';
import CardView from './CardView';

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
    cardMode: 0// 0-нет, 1-просмотр, 2-редактирование, 3-добавление
  };

  cbProductSelected = (code) => {
    console.log('выбран ответ с кодом' + code);
    this.setState ( {selecteItemCode: code});
  };

  cbProductDelete = (code) => {
  
    this.setState({ products:this.state.products.filter(  s=> s.code!==code)});
  };

  
  render() {

    const productsCode=this.state.products.map( p =>
      <Product key={p.key} code={p.key} brand={p.brandTitle} 
               model={p.modelTitle} img={p.imgUrl} price={p.price} 
               storage={p.storage} selecteItemCode={this.state.selecteItemCode} 
               cbSelected={this.cbProductSelected} cbDelete={this.cbProductDelete}/>);

      let itemInfo = this.state.products.find( item => {
                if (item.code === this.state.selecteItemCode) return item
      });


    return  (
      <div className='Shop'>
        <h1 className='name'>{this.props.name}</h1>

        { (this.state.selecteItemCode) && <CardView itemInfo={itemInfo} />}

        <div className='products'>{productsCode}</div>
        <div className='addNew'>
          <button className='btnAddNew'>добавить продукт</button>
        </div>
      </div>
    )

  }

}

export default Shop;
