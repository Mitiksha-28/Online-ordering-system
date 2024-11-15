import React from "react";

import { ListGroup } from "reactstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cartUiActions } from "@client/store/shopping-cart/cartUiSlice";
import CartItem from "./CartItem";
import "../../../styles/shopping-cart.css";
import { CartItem as CartItemType } from "@client/vite-env";

const Carts = () => {
  const dispatch = useDispatch();
  const cartProducts = useSelector((state: { cart: { cartItems: CartItemType[] } }) => state.cart.cartItems);
  const totalAmount = useSelector((state: { cart: { totalAmount: number } }) => state.cart.totalAmount);

  const toggleCart = () => {
    dispatch(cartUiActions.toggle());
  };
  return (
    <div className="cart__container" onClick={toggleCart}>
      <ListGroup onClick={(event) => event.stopPropagation()} className="cart">
        <div className="cart__closeButton">
          <span onClick={toggleCart}>
            <i className="ri-close-fill"></i>
          </span>
        </div>

        <div className="cart__item-list">
          {cartProducts.length === 0 ? (
            <h6 className="text-center">No item added to the cart</h6>
          ) : (
            cartProducts.map((item: CartItemType, index: number) => (
              <CartItem item={item} key={index} onClose={toggleCart} />
            ))
          )}
        </div>

        <div className="cart__bottom d-flex align-items-center justify-content-between">
          <h6>
            Subtotal : <span>${totalAmount}</span>
          </h6>
          <button>
            <Link to="/checkout" onClick={toggleCart}>
              Checkout
            </Link>
          </button>
        </div>
      </ListGroup>
    </div>
  );
};

export default Carts;
