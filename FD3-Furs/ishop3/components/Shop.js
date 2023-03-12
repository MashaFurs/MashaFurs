import React from 'react';
import PropTypes from 'prop-types';
import DOM from 'react-dom-factories';

import './Shop.css';

import Product from './Product';
import CardView from './CardView';
import CardEdit from './CardEdit';
import CardAddNew from './CardAddNew';

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

    btnDisabled:false,
    cardColor:false,
    cardColorEdit:false,

    currURL: null,
    currBrand: null,
    currModel: null,
    currPrice: null,
    currStorage: null,
    
    URLError: "", BrandtError: "", ModelError: "", priceError: "", storageError: "",
    valid: true,

    code:null,
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
    this.setState( {cardColorEdit: true});
    
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
    this.setState ( {cardMode: 0});
    this.setState( {btnDisabled: false});
    this.setState( {cardColor: false});
    this.setState( {cardColorEdit: false});
  };

  addNewCar=()=>{
    
    this.setState ( {cardMode: 3});
    this.validation ();
    this.maxCodeFunc ();
    this.setState( {btnDisabled: true});
    this.setState( {cardColor: true});
  };


  validation =()=> {
    
    let URLError="", BrandtError="", ModelError="", priceError="", storageError="", valid;

    if(this.state.currURL===null || this.state.currURL==="") {URLError="введите URL"};
    if(this.state.currBrand===null || this.state.currBrand==="") {BrandtError="введите марку авто"};
    if(this.state.currModel===null || this.state.currModel==="") {ModelError="введите модель авто"};
    if( isNaN(this.state.currPrice) || this.state.currPrice===null ) {priceError="введите цену"};
    if( isNaN(this.state.currStorage) || this.state.currStorage===null) {storageError="введите остаток"};

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


  maxCodeFunc =(eo) => {
    let arrCode= (this.state.products).reduce ( (prev, item) => { //Создаю массив из кодов продуктов
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
    return this.state.code = maxCode;
  };

  cbSaveNewCar =(changeItemArr) =>{
    this.setState({products: [...this.state.products, changeItemArr]});
    this.setState ( {cardMode: 0});
    this.setState( {btnDisabled: false});
    this.setState( {cardColor: false});

  };

  
  render() {
    const productsCode=this.state.products.map( p =>
      <Product key={p.key} code={p.key} brand={p.brandTitle} 
               model={p.modelTitle} img={p.imgUrl} price={p.price} 
               storage={p.storage} selecteItemCode={this.state.selecteItemCode} 
               cbSelected={this.cbProductSelected} cbDelete={this.cbProductDelete}
               cbRedact={this.cbProductRedact} btnDisabled={this.state.btnDisabled}
               cardColor={this.state.cardColor} cardColorEdit={this.state.cardColorEdit}/>);
               

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

        { this.state.cardMode===3 && <CardAddNew itemList={this.state.products}
                                                 currURL={this.state.currURL}
                                                 currBrand={this.state.currBrand}
                                                 currModel={this.state.currModel}
                                                 currPrice={this.state.currPrice}
                                                 currStorage={this.state.currStorage}
                                                 valid={this.state.valid}
                                                 URLError={this.state.URLError}
                                                 BrandtError={this.state.BrandtError}
                                                 ModelError={this.state.ModelError}
                                                 priceError={this.state.priceError}
                                                 storageError={this.state.storageError}
                                                 changeUrl={this.changeUrl}
                                                 changeBrand={this.changeBrand}
                                                 changeModel={this.changeModel}
                                                 changePrice={this.changePrice}
                                                 changeStorage={this.changeStorage}
                                                 cbCancel={this.cbCancel}
                                                 code={this.state.code}
                                                 cbSaveNewCar={this.cbSaveNewCar}
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
