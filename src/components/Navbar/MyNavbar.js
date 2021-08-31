import React, { Component } from "react";
import { Nav } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Navbar, NavDropdown } from "react-bootstrap";
import { FaStore } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./MyNavbar.css";

class MyNavbar extends Component {
  render() {
    return (
      <Navbar className="navbar navbar-expand">
        <Container id="block_container">
          <Navbar.Brand id="bloc1" style={{ color: "orange" }} href="#home">
            <FaStore />
            {""} Jazara Marketplace
          </Navbar.Brand>

          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <NavDropdown title="Products" id="navbarScrollingDropdown">
              <NavDropdown.Item as={Link} to="/products">
                Explore Products
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/addproduct">
                Sell Product
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={Link} to="/aboutus">
              About us
            </Nav.Link>
            <NavDropdown
              alignRight
              title={
                this.props.customer != null ? this.props.customer.name : "Me"
              }
              id="navbarScrollingDropdown"
            >
              <NavDropdown.Item as={Link} to="/myproducts">
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
