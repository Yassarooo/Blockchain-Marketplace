import React, { Component } from "react";
import { Nav } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Navbar } from "react-bootstrap";
import "font-awesome/css/font-awesome.min.css";

class MyNavbar extends Component {
  render() {
    return (
      <Navbar className="navbar navbar-expand-lg navbar-dark bg-gradient-dark">
        <Container>
          <Navbar.Brand href="#home"> Navbar </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/"> Home </Nav.Link>
            <Nav.Link href="/addproduct"> Sell Product </Nav.Link>
            <Nav.Link href="/dashboard"> My Products </Nav.Link>
            <Nav.Link href="/about"> About us </Nav.Link>
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
