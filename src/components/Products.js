import React, { Component } from "react";
import { Row, Col, Form, FormControl } from "react-bootstrap";
import { FaEthereum, FaSearch } from "react-icons/fa";

class Products extends Component {
  searchForProduct = function () {
    console.log("Searching...");
  };

  renderCards(product, index) {
    return product.purchased ? null : (
      <Col md="3" className="pt-5">
        <div className="card h-100 rounded card">
          <div
            className="badge bg-success text-white position-absolute"
            style={{ top: "0.5rem", right: "0.5rem" }}
          >
            {product.owner.toString().substring(0, 8)}
          </div>
          <img
            className="card-img-top centered-and-cropped"
            src={`https://ipfs.io/ipfs/${product.imgipfshash}`}
            alt="..."
          />
          <div className="card-body bg-dark pb-0 mb-0">
            <div className="text-center">
              <h2 href={`/product/${product.id}`}>{product.name}</h2>
              <h3
                className="text-warning"
                style={{ "white-space": "nowrap", overflow: "hidden" }}
              >
                <FaEthereum className="text-primary" />
                {""}{" "}
                {window.web3.utils.fromWei(product.price.toString(), "Ether")}{" "}
                Eth
              </h3>
            </div>
          </div>
          <div className="card-footer pb-4 pt-0 border-top-0 bg-dark">
            <div className="text-center ">
              <button
                className="btn btn-outline-light mt-2 stretched-link"
                name={product.id}
                value={product.price}
                onClick={(event) =>
                  (window.location.href = `/product/${product.id}`)
                }
              >
                More Details
              </button>
            </div>
          </div>
        </div>
      </Col>
    );
  }

  render() {
    return (
      <div>
        <div className="clearfix pt-5 mx-4">
          <span className="float-left">
            <h1>All Products ({this.props.products.length.toString()})</h1>
          </span>
          <span className="float-right">
            {" "}
            <Form
              style={{ color: "orange" }}
              inline
              //onSubmit={console.log("submitted search form")}
            >
              <FormControl
                onSubmit={(e) => this.searchForProduct()}
                type="text"
                name="seacrh"
                //onChange={(e) => setSearchKey(e.target.value)}
                placeholder="Search product..."
                className="mr-sm-2"
              />
              <FaSearch onClick={() => this.searchForProduct()} />
            </Form>
          </span>
        </div>
        <section className="pb-4 pl-4 pr-4">
          <Row>{this.props.products.map(this.renderCards, this)}</Row>
        </section>
      </div>
    );
  }
}
export default Products;
