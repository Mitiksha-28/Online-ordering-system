import Helmet from "../components/Helmet/Helmet";
import { Container, Row, Col } from "reactstrap";
import axios from "axios";

import guyImg from "../assets/images/delivery-guy.png";
import "../styles/hero-section.css";
import { useEffect, useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loginOrRegister, setLoginOrRegister] = useState("login");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    axios.post(`/api/auth/${loginOrRegister}`, { email, password }).then((res) => {
      // Set the session cookie sent in response
      window.location.href = "/menu";
    });
  };

  useEffect(() => {
    // if user has session cookie, redirect to /orders
    axios.get("/api/auth/check").then((res) => {
      if (res.data.authenticated) {
        window.location.href = "/orders";
      }
    });
  });

  return (
    <Helmet title="Home">
      <section>
        <Container>
          <Row>
            <Col lg="6" md="6">
              {loginOrRegister === "login" && (
                <div className="d-flex flex-column justify-content-center align-items-center">
                  <form className="d-flex flex-column justify-content-center align-items-center" onSubmit={handleLogin}>
                    <input
                      type="email"
                      placeholder="Email"
                      className="border-1 rounded mb-2 p-1"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                      type="password"
                      placeholder="Password"
                      className="border-1 rounded mb-2 p-1"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit" className="w-50 rounded p-1 border-light mb-4 bg-dark text-white">
                      Login
                    </button>
                  </form>
                  <p
                    className="text-uppercase"
                    style={{ fontSize: "0.8rem" }}
                    onClick={() => {
                      setLoginOrRegister("register");
                    }}
                  >
                    <u>New here? Register instead!</u>
                  </p>
                </div>
              )}
              {loginOrRegister === "register" && (
                <div className="d-flex flex-column justify-content-center align-items-center">
                  <form className="d-flex flex-column justify-content-center align-items-center" onSubmit={handleLogin}>
                    <input
                      type="email"
                      placeholder="Email"
                      className="border-1 rounded mb-2 p-1"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                      type="password"
                      placeholder="Password"
                      className="border-1 rounded mb-2 p-1"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit" className="w-50 rounded p-1 border-light mb-4 bg-dark text-white">
                      Register
                    </button>
                  </form>
                  <p
                    className="text-uppercase"
                    style={{ fontSize: "0.8rem" }}
                    onClick={() => {
                      setLoginOrRegister("login");
                    }}
                  >
                    <u>Already have an account? Login instead!</u>
                  </p>
                </div>
              )}
            </Col>

            <Col lg="6" md="6">
              <div className="hero__img">
                <img src={guyImg} alt="delivery-guy" className="w-100" />
              </div>
              <h1 className="mb-4 hero__title">
                <span>Enjoy</span> your favorite snack from the comfort of your hostel!
              </h1>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Login;
