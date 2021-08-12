import React, { Component } from "react";
import { Nav } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Navbar } from "react-bootstrap";
import { FaStore } from "react-icons/fa";

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
            <Nav.Link className="navlink" href="/">
              {" "}
              Home{" "}
            </Nav.Link>
            <Nav.Link href="/addproduct"> Sell Product </Nav.Link>
            <Nav.Link href="/myproducts"> My Products </Nav.Link>
            <Nav.Link href="/aboutus"> About us </Nav.Link>
            <Nav.Link href="/products"> Products </Nav.Link>
          </Nav>
        </Container>
        {this.props.loading ? (
          <div className="preloader">
            <div id="circle">
              <div className="loader">
                <div className="loader">
                  <div className="loader">
                    <div className="loader"> </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </Navbar>
    );
  }
}
export default MyNavbar;
