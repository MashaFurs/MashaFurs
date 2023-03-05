var Shop = React.createClass({

    displayName: 'Shop',
  
    propTypes: {
      name: React.PropTypes.string.isRequired, 
      defaultProducts:React.PropTypes.arrayOf(
        React.PropTypes.shape({
          brandTitle: React.PropTypes.string.isRequired,
          modelTitle: React.PropTypes.string.isRequired,
          imgUrl: React.PropTypes.string.isRequired,
          price: React.PropTypes.number.isRequired,
          key: React.PropTypes.number.isRequired,
          storage: React.PropTypes.number.isRequired,
        })
      )  
    },

    getInitialState: function() {
      return {
          selecteItemCode: null,
          products: this.props.defaultProducts,
      };
  },


    cbProductSelected: function (code) {
      console.log('выбран ответ с кодом' + code);
      this.setState ( {selecteItemCode: code});
  },

    cbProductDelete: function (code) {
      this.setState({ products:this.state.products.filter(  s=> s.code!==code)})

    },
  

    render: function() {
  
        var productsCode= this.state.products.map( p =>
            React.createElement(Product, {
                key:p.key,
                code:p.key, 
                brand:p.brandTitle,
                model:p.modelTitle,
                img:p.imgUrl,
                price:p.price,
                storage:p.storage,
                selecteItemCode: this.state.selecteItemCode,
                cbSelected:this.cbProductSelected,
                cbDelete:this.cbProductDelete,
    
            })
          );

      return React.DOM.div( {className:'Shop'}, 
        React.DOM.h1( {className:'name'}, this.props.name ),
        React.DOM.div( { className:"products"}, productsCode )
      );
    },
  
  });