import React, { useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Container } from "reactstrap";
import logo from "../../assets/images/res-logo.png";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { cartUiActions } from "@client/store/shopping-cart/cartUiSlice";

import "../../styles/header.css";

const nav__links = [
  {
    display: "Home",
    path: "/home",
  },
  {
    display: "Menu",
    path: "/menu",
  },
  // {
  //   display: "Cart",
  //   path: "/cart",
  // },
];

const Header = () => {
  const menuRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const totalQuantity = useSelector((state: { cart: { totalQuantity: number } }) => state.cart.totalQuantity);
  const dispatch = useDispatch();

  const toggleMenu = () => {
    if (menuRef.current) {
      menuRef.current.classList.toggle("show__menu");
    }
  };
  let navigate = useNavigate();

  const toggleCart = () => {
    dispatch(cartUiActions.toggle());
  };

  console.log(menuRef?.current?.classList.value);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        headerRef.current?.classList.add("header__shrink");
      } else {
        headerRef.current?.classList.remove("header__shrink");
      }
    });

    return () =>
      window.removeEventListener("scroll", () => {
        if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
          headerRef.current?.classList.add("header__shrink");
        } else {
          headerRef.current?.classList.remove("header__shrink");
        }
      });
  }, []);

  return (
    <header className="header" ref={headerRef}>
      <Container>
        <div className="nav__wrapper d-flex align-items-center justify-content-between">
          <div className="logo" onClick={() => navigate("/home")}>
            <img src={logo} alt="logo" />
            <h5>Coffee Stop</h5>
          </div>
          {/* ======= menu ======= */}
          <div className="navigation" ref={menuRef} onClick={toggleMenu}>
            <div className="menu d-flex align-items-center gap-5" onClick={(event) => event.stopPropagation()}>
              <div className="header__closeButton">
                <span onClick={toggleMenu}>
                  <i className="ri-close-fill"></i>
                </span>
              </div>
              {nav__links.map((item, index) => (
                <NavLink
                  to={item.path}
                  key={index}
                  className={(navClass) => (navClass.isActive ? "active__menu" : "")}
                  onClick={toggleMenu}
                >
                  {item.display}
                </NavLink>
              ))}
            </div>
          </div>

          {/* ======== nav right icons ========= */}
          <div className="nav__right d-flex align-items-center gap-4">
            <span className="cart__icon" onClick={toggleCart}>
              <i className="ri-shopping-basket-line"></i>
              <span className="cart__badge">{totalQuantity}</span>
            </span>
            <Link to={"/login"}>
              <span className="user__icon">
                <i className="ri-user-line"></i>
              </span>
            </Link>

            <span className="mobile__menu" onClick={toggleMenu}>
              <i className="ri-menu-line"></i>
            </span>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
