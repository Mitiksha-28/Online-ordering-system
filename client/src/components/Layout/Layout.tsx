import React from "react";

import Header from "../Header/Header.js";
import Footer from "../Footer/Footer.js";
import Routes from "../../routes/Routers.js";
import Carts from "../UI/cart/Carts.js";

import { useSelector } from "react-redux";

const Layout = () => {
  const showCart = useSelector((state: { cartUi: { cartIsVisible: boolean } }) => state.cartUi.cartIsVisible);

  return (
    <div className="d-flex flex-column vh-100 justify-content-between">
      <Header />
      {showCart && <Carts />}
      <div>
        <Routes />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
