import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Card, CardBody, CardTitle, CardText } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import "../styles/cart-page.css";
import type { Order } from "@server/database";

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("/api/orders");
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <Helmet title="My Orders">
      <Container>
        <Row>
          {orders.map((order) => (
            <Col lg="4" md="6" sm="12" key={order.id} className="mb-4">
              <Card>
                <CardBody>
                  <CardTitle tag="h5">{order.name}</CardTitle>
                  <CardText>
                    <strong>Price:</strong> ${order.price} <br />
                    <strong>Quantity:</strong> {order.quantity} <br />
                    <strong>Total:</strong> ${order.total} <br />
                    <strong>Order Date:</strong> {new Date(order.createdAt).toLocaleDateString()} <br />
                    <strong>Last Updated:</strong> {new Date(order.updatedAt).toLocaleDateString()}
                  </CardText>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </Helmet>
  );
};

export default Orders;
