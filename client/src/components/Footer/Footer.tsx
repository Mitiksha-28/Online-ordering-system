import React from "react";
import { ListGroup } from "reactstrap";

import logo from "../../assets/images/res-logo.png";
import "../../styles/footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__logo">
        <img src={logo} alt="logo" />
        <h5>Coffee Stop</h5>
        <p>The best fast-food in the city!</p>
      </div>
    </footer>
  );
};

export default Footer;
