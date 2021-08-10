import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

class AddProduct extends Component {
  render() {
    return (
      <div className="container">
        <fieldset disabled={this.props.loading}>
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center mt-4">Sell a Product</h1>
              <p className="lead text-center">
                Let's get some information about your Product
              </p>
              <form
                className="needs-validation"
                onSubmit={(event) => {
                  event.preventDefault();
                  const name = this.productName.value;
                  const image = this.productImage.value;
                  const description = this.productDescription.value;
                  const price = window.web3.utils.toWei(
                    this.productPrice.value.toString(),
                    "Ether"
                  );
                  this.props.createProduct(name, image, description, price);
                }}
              >
                <div className="form-group">
                  <label htmlFor="title">Title *</label>
                  <input
                    type="text"
                    className="form-control"
                    id="productName"
                    placeholder="Title"
                    ref={(input) => {
                      this.productName = input;
                    }}
                    required
                  />
                  <div className="invalid-feedback">Title is required.</div>
                </div>
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <textarea
                    className="form-control"
                    id="description"
                    placeholder="Description"
                    ref={(input) => {
                      this.productDescription = input;
                    }}
                    rows="3"
                    required
                  />
                  <div className="invalid-feedback">
                    Description is required.
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="tags">Price *</label>
                  <input
                    type="text"
                    className="form-control"
                    id="ProductPrice"
                    ref={(input) => {
                      this.productPrice = input;
                    }}
                    placeholder="Product Price in Ethereum"
                    required
                  />
                  <div className="invalid-feedback">Price is required.</div>
                </div>
                <div className="form-group">
                  <label htmlFor="tags">Image *</label>
                  <input
                    type="text"
                    className="form-control"
                    id="ProductImage"
                    ref={(input) => {
                      this.productImage = input;
                    }}
                    placeholder="Product Image Link"
                    required
                  />
                  <div className="invalid-feedback">Image is required.</div>
                </div>
                <div className="form-group">
                  <label htmlFor="file">Image</label>
                  <input
                    type="file"
                    className="form-control-file"
                    id="file"
                    onChange={this.captureFile}
                  />
                </div>
                <small className="d-block pb-3">* = required fields</small>
                <small className="d-block pb-3">
                  Uploading the same file multiple times will result in the same
                  file with the same hash being uploaded.
                </small>
                <div className="mb-3">
                  <Link to="/" className="btn btn-secondary mr-2">
                    Cancel
                  </Link>
                  <button type="submit" className="btn btn-primary">
                    Add
                  </button>
                </div>
              </form>
              {this.props.successmessage != "" ? (
                <div class="alert alert-info mt-5">
                  {this.props.successmessage}
                </div>
              ) : null}
            </div>
          </div>
        </fieldset>
      </div>
    );
  }
}

export default AddProduct;
