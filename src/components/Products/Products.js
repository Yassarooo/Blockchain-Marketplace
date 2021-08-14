import React, { Component } from "react";
import { Row, Col, Form, FormControl, Pagination } from "react-bootstrap";
import { FaEthereum, FaSearch } from "react-icons/fa";

class Products extends Component {
  constructor() {
    super();
    this.state = {
      currentPage: 1,
      productsPerPage: 12,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id),
    });
  }

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
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  fontWeight: "700",
                  fontSize: "x-large",
                  lineHeight: "50px",
                }}
              >
                <FaEthereum className="text-primary pl-0 pr-2" />
                {window.web3.utils.fromWei(
                  product.price.toString(),
                  "Ether"
                )}{" "}
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
    const indexOfLastProduct =
      this.state.currentPage * this.state.productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - this.state.productsPerPage;
    const currentProducts = this.props.products.slice(
      indexOfFirstProduct,
      indexOfLastProduct
    );

    const pageNumbers = [];
    for (
      let i = 1;
      i <= Math.ceil(this.props.products.length / this.state.productsPerPage);
      i++
    ) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map((number) => {
      return (
        <Pagination.Item
          id={number}
          key={number}
          active={number === this.state.currentPage}
          onClick={this.handleClick}
        >
          {number}
        </Pagination.Item>
      );
    });

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
          <Row>{currentProducts.map(this.renderCards, this)}</Row>
          <Pagination id="page-numbers" className="py-4">
            {renderPageNumbers}
          </Pagination>
        </section>
      </div>
    );
  }
}
export default Products;
