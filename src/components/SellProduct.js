import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { Container } from "react-bootstrap";

class SellProduct extends Component {
  render() {
    return (
      <Container className="col-lg-5 py-5">
        <h1 className="text-center p-4"> Sell Product</h1>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            const name = this.productName.value;
            const image = this.productImage.value;
            const price = window.web3.utils.toWei(
              this.productPrice.value.toString(),
              "Ether"
            );
            this.props.createProduct(name, image, price);
          }}
        >
          <div className="form-group mr-5">
            <input
              id="productName"
              type="text"
              ref={(input) => {
                this.productName = input;
              }}
              className="form-control"
              placeholder="Product Name"
              required
            />
          </div>
          <div className="form-group mr-5">
            <input
              id="productPrice"
              type="text"
              ref={(input) => {
                this.productPrice = input;
              }}
              className="form-control"
              placeholder="Product Price"
              required
            />
          </div>
          <div className="form-group mr-5">
            <input
              id="productImage"
              type="text"
              ref={(input) => {
                this.productImage = input;
              }}
              className="form-control"
              placeholder="Product Image Link"
              required
            />
          </div>
          <Button type="submit" className="btn btn-primary">
            Add Product
          </Button>
          {this.props.successmessage != "" ? (
            <div class="alert alert-info mt-5">{this.props.successmessage}</div>
          ) : null}
        </form>
      </Container>
    );
  }
}

export default SellProduct;
