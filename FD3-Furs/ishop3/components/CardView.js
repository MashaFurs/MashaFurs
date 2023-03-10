import React from 'react';
import PropTypes from 'prop-types';
import DOM from 'react-dom-factories';

import './CardView.css';

class CardView extends React.Component {

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

  render() {
      return (
        <div className='cardWrap'>
            <div className='cardView'>
                <p>{this.props.itemInfo.brandTitle}</p>
                <p>Цена: {this.props.itemInfo.price} $. На складе осталось: {this.props.itemInfo.storage} шт.</p>
            </div>
        </div>
      )
    }

  }


export default CardView;
