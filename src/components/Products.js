import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import { FaEthereum } from "react-icons/fa";

class Products extends Component {
  renderCards(product, index) {
    return product.purchased ? null : (
      <Col md="3" className="pt-5">
        <div className="card h-100 rounded  animate__animated animate__fadeInUp card">
          <div
            class="badge bg-success text-white position-absolute"
            style={{ top: "0.5rem", right: "0.5rem" }}
          >
            {product.owner.toString().substring(0, 8)}
          </div>
          <img
            className="card-img-top centered-and-cropped"
            src={`https://ipfs.io/ipfs/${product.imgipfshash}`}
            alt="..."
          />

          <div className="card-body bg-dark">
            <div className="text-center">
              <h2 className="fw-bolder">{product.name}</h2>
              <h5 className="fw-bolder text-success">
                {product.price.toString()} Eth
                <FaEthereum className="text-primary" />
              </h5>
            </div>
          </div>

          <div className="card-footer p-4 pt-0 border-top-0 bg-dark">
            <div className="text-center ">
              <a className="btn btn-outline-light mt-2" href="#">
                Add to card
              </a>
            </div>
          </div>
        </div>
      </Col>
    );
  }

  render() {
    return (
      <div>
        <header className="bg-dark py-2">
          <div className="container px-4 px-lg-5 my-5">
            <h1 class="display-3 fw-bolder">
              <img src={require("./cheers.png")} width="100" height="100" />{" "}
              Welcome,{" "}
              <a className="text-primary">
                {this.props.account.substring(0, 9)}
              </a>
            </h1>
            <div class="css-typing text-white">
              <p>
                This is a web marketplace project based on Blockchain technology
                & smart contracts which are implemented by Ethereum .
              </p>
              <p>
                Created By
                <a className="text-primary"> Jazara Debuggers Team © </a>
                ,Have a look at the sections below, feel free to contact us at :{" "}
                <a className="text-success">jazaradebuggers@gmail.com</a>
              </p>
            </div>
          </div>
        </header>

        <section className="py-5 px-4">
          <Row>{this.props.products.map(this.renderCards)}</Row>
        </section>
      </div>
    );
  }
}
export default Products;
