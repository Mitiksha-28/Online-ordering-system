import { useSelector } from "react-redux";
import "../styles/checkout.css";
import { AiFillCheckCircle } from "react-icons/ai";
import { useEffect } from "react";
import axios from "axios";

const Checkout = () => {
  const cartItems = useSelector((state: any) => state.cart.cartItems);
  const totalAmount = useSelector((state: any) => state.cart.totalAmount);

  useEffect(() => {
    axios.post(
      "/api/orders",
      {
        name: cartItems[0].title,
        price: cartItems[0].price,
        quantity: cartItems[0].quantity,
        total: totalAmount,
      },
      { withCredentials: true },
    );

    setTimeout(() => {
      window.location.href = "/orders";
    }, 3000);
  }, []);

  return (
    <>
      <div className="checkoutMessage">
        <div className="checkoutTitleContainer">
          <AiFillCheckCircle className="checkoutIcon" />
          <h3>Thank you for your order!</h3>
        </div>
        <span>Your order is being processed and will be delivered as fast as possible.</span>
      </div>
    </>
  );
};

export default Checkout;
