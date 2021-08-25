import React, { Component } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./404.css";

class GenericNotFound extends Component {
  render() {
    return (
      <div class="page-wrap d-flex flex-row align-items-center">
        <Container class="py-5 my-5">
          <Row class="justify-content-center">
            <Col class="md-12 text-center">
              <span class="display-1 d-block text-warning text-larger fw-bloder">
                404
              </span>
              <div class="mb-4 lead text-large">
                The page you are looking for was not found.
              </div>
              <Link to="/" class="btn btn-link text-large">
                Back to Home
              </Link>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
export default GenericNotFound;
