import React, { Component } from "react";
import { Nav } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Navbar, NavDropdown } from "react-bootstrap";
import { FaStore } from "react-icons/fa";
import "./MyNavbar.css";

class MyNavbar extends Component {
  render() {
    return (
      <Navbar className="navbar navbar-inverse navbar-expand-lg navbar-dark bg-gradient-dark animate-navbar">
        <Container id="block_container">
          <Navbar.Brand id="bloc1" style={{ color: "orange" }} href="#home">
            <FaStore />
            {""} Jazara Marketplace
          </Navbar.Brand>

          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <NavDropdown title="Products" id="navbarScrollingDropdown">
              <NavDropdown.Item href="/addproduct">
                Sell Product
              </NavDropdown.Item>
              <NavDropdown.Item href="/products">
                Explore Products
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Most Sold Products
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="/aboutus"> About us </Nav.Link>
            <NavDropdown
              alignRight
              title={
                this.props.customer != null ? this.props.customer.name : "Me"
              }
              id="navbarScrollingDropdown"
            >
              <NavDropdown.Item href="/myaccount">My Account</NavDropdown.Item>
              <NavDropdown.Item href="/myproducts">
                My Products
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Container>
        {this.props.loading ? (
          <div className="preloader">
            <div id="circle">
              <div className="loader"></div>
            </div>
          </div>
        ) : null}
      </Navbar>
    );
  }
}
export default MyNavbar;
