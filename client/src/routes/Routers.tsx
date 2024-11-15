import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/Home";
import Menu from "../pages/Pizzas";
import MenuItemDetails from "../pages/PizzaDetails";
import Checkout from "../pages/Checkout";
import Login from "@client/pages/Login";
import Orders from "@client/pages/Orders";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/login" element={<Login />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/menu/:id" element={<MenuItemDetails />} />
    </Routes>
  );
};

export default Routers;
