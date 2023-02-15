var Ishop = React.createClass({

    displayName: 'Ishop',
  
    propTypes: {
      name: React.PropTypes.string.isRequired, 
      products:React.PropTypes.arrayOf(
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
  
    render: function() {
  
        var productsCode= this.props.products.map( p =>
            React.DOM.div({key:p.key,className:'card'},
              React.DOM.img({className:'imgUrl', src: p.imgUrl}),
              React.DOM.p({className:'brandTitle'},`Марка: ${p.brandTitle}`),
              React.DOM.p({className:'modelTitle'},`Модель: ${p.modelTitle}`),
              React.DOM.p({className:'price'},`Цена: ${p.price} $`),
              React.DOM.p({className:'storage'},`Осталось на складе: ${p.storage} шт.`),
            )
          );

      return React.DOM.div( {className:'Ishop'}, 
        React.DOM.h1( {className:'name'}, this.props.name ),
        React.DOM.div( {className:'products'}, productsCode ),
      );
    },
  
  });