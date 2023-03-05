var Product = React.createClass({

    displayName: 'Product',
  
    propTypes: {
    products:React.PropTypes.arrayOf(
        React.PropTypes.shape({
          brandTitle: React.PropTypes.string.isRequired,
          modelTitle: React.PropTypes.string.isRequired,
          imgUrl: React.PropTypes.string.isRequired,
          price: React.PropTypes.number.isRequired,
          key: React.PropTypes.number.isRequired,
          storage: React.PropTypes.number.isRequired,
          code: React.PropTypes.number.isRequired,
          cbSelected: React.PropTypes.func.isRequired,
          cbDelete: React.PropTypes.func.isRequired,

        })
      )  
    },
  

    productClicked: function(eo) {
        this.props.cbSelected(this.props.code);
    },

    delete: function(eo) {
        eo.stopPropagation ();
        this.props.cbDelete(this.props.code);
        console.log(this.props.code)
    },

    render: function() {
  
        return React.DOM.div( {className:(this.props.selecteItemCode === this.props.code)?"card one":"card two", onClick: this.productClicked }, 
                React.DOM.img({className:'imgUrl', src: this.props.img}),
                React.DOM.p({className:'brandTitle'},`Марка: ${this.props.brand}`),
                React.DOM.p({className:'modelTitle'},`Модель: ${this.props.model}`),
                React.DOM.p({className:'price'},`Цена: ${this.props.price} $`),
                React.DOM.p({className:'storage'},`Осталось на складе: ${this.props.storage} шт.`),
                React.DOM.div( {className: 'del'}, React.DOM.button({className:'btn', onClick: this.delete},"удалить"),)
            )
    },
  
  });