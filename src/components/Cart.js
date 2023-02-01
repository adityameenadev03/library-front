import React from "react";
import { Link } from "react-router-dom";
import EmptyCart from "../assets/empty_cart.svg";

import { useBooksContext } from "../Hooks/useBooksContext";

export const Cart = ({numberOfItems}) => {
const {cartItems,dispatch} =  useBooksContext()

function updateCart(item, newQuantity) {
  dispatch({type: 'UPDATE_CART_ITEM', payload: {item,newQuantity} })
}

function removeItem(item) {
  dispatch({type: 'REMOVE_CART_ITEM', payload: item })
}

function totals() {
  let total = 0;
  cartItems.forEach((item) => {
    total += (item.salePrice || item.originalPrice) * item.quantity;
  });
  return {
    subtotal: total * 0.9,
    tax: total * 0.1,
    total,
  };
}

  return (
    <div id="books__body">
      <main id="books__main">
        <div className="books__container">
          <div className="row">
            <div className="book__selected--top">
              <h2 className="cart__title">Cart</h2>
            </div>
            <div className="cart">
              <div className="cart__header">
                <span className="cart__book">Book</span>
                <span className="cart__quantity">Quantity</span>
                <span className="cart__total">Price</span>
              </div>
              <div className="cart__body">
                
                {cartItems.map((item) => {
                  const itemPrice = item.salePrice || item.originalPrice;
                  return (
                    <div className="cart__item" key={item.id}>
                      <div className="cart__book">
                        <img
                          className="cart__book--img"
                          src={item.url}
                          alt=""
                        />
                        <div className="cart__book--info">
                          <span className="cart__book--title">
                            {item.title}
                          </span>
                          <span className="cart__book--price">
                            ${itemPrice?.toFixed(2)}
                          </span>
                          <button
                            className="cart__book--remove"
                            onClick={() => removeItem(item)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                      <div className="cart__quantity">
                        <input
                          type="number"
                          className="cart__input"
                          min={0}
                          max={99}
                          value={item.quantity}
                          onChange={(event) =>
                            updateCart(item, event.target.value)
                          }
                        />
                      </div>
                      <div className="cart__total">
                        ${(itemPrice * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  );
                })}
                {/* {(!cart || !cart.length) && <img src={EmptyCart}/>} */}
                {(!cartItems || !cartItems.length) && (
                  <div className="cart__empty">
                    <img className="cart__empty--img" src={EmptyCart} alt="" />
                    <h2>You don't have any books in your cart!</h2>
                    <Link to="/books">
                      <button className="btn">Browse books</button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
            {(cartItems && cartItems.length > 0) && (
              <div className="total">
                <div className="total__item total__quantity">
                  <span>Total Quantity</span>
                  <span>{numberOfItems}</span>
                </div>
                <div className="total__item total__sub-total">
                  <span>Subtotal</span>
                  <span>${totals().subtotal.toFixed(2)}</span>
                </div>
                <div className="total__item total__tax">
                  <span>Tax</span>
                  <span>${totals().tax.toFixed(2)}</span>
                </div>
                <div className="total__item total__price">
                  <span>Total</span>
                  <span>${totals().total.toFixed(2)}</span>
                </div>
                <button className="btn btn__checkout no-cursor" onClick={() => alert(`Haven't got around to doing this :(`)}>
                  Proceed to checkout
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

