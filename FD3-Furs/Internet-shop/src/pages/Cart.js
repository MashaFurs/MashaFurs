import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {clearItems } from '../Redux/slices/cartSlice';


import CartProduct from '../components/CartProduct';

const Cart = () => {
  const dispatch = useDispatch();
  const items = useSelector ( state => state.cart.items);

  const totalCount = items.reduce ( (sum,item) => sum + item.count,0);

  const { totalPrice} = useSelector ( (state) => state.cart);

  const allDelete = () => {
    dispatch( clearItems());
  };
    return (
            <div className="cart">
            <div className="cart__top">
              <h2 className="content__title">
                <img src="img/basket.PNG" alt='cart'/>Корзина</h2>
              <div onClick={allDelete} className="cart__clear">
              
                <span>X Очистить корзину</span>
              </div>
            </div>
            <div className="itemsInCart">

             { items.map ( (item) => (
              <CartProduct key={item.id} {...item}/>
             ))}
              
 
 

            </div>
            <div className="cart__bottom">
              <div className="cart__bottom-details">
                <span> Всего товаров в корзине: <b>{totalCount} шт.</b> </span>
                <span> Сумма заказа: <b>{totalPrice} BYN</b> </span>
              </div>
              <div className="cart__bottom-buttons">
                <NavLink to="/" className="button button--outline button--add go-back-btn">

                  <span>Вернуться назад</span>
                </NavLink>
                <div className="button pay-btn">
                  <span>Оплатить сейчас</span>
                </div>
              </div>
            </div>
          </div>
        
            
    )
};

export default Cart;