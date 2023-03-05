var Block = React.createClass({

  displayName: 'Block',

  propTypes: {
    
  },

  getInitialState: function() {
    return {
        isSort: false,
        filterStr: "",
        currWordList: this.props.wordList,
    };
},

  sortClicked:function (eo) {
    this.setState ({isSort: eo.target.checked}, this.processList);
  },

  filterChanged:function (eo) {
    this.setState ({filterStr: eo.target.value},  this.processList);
  },

  reset:function() {
    this.setState ({isSort: false, filterStr:""}, this.processList);
  },

  processList() {
    let list=this.props.wordList.slice();

    if(this.state.filterStr) {
      list=list.filter( s=> s.includes (this.state.filterStr));
    }

    if(this.state.isSort) {
      list.sort();
    }
    this.setState ({currWordList: list});
  },



  render: function() {

    return React.DOM.div( {className:'Block'}, 
      React.DOM.input( {type: "checkbox", checked: this.state.isSort, onChange: this.sortClicked}, ),
      React.DOM.input( {type: "text", value: this.state.filterStr, onChange: this.filterChanged}, ),
      React.DOM.input( {type: "button", value: "сбросить",  onClick: this.reset}, ),
      React.DOM.div( {className:'words'},this.state.currWordList.join("\n")),
    );
  },

});