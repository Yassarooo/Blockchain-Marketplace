import React, { Component } from "react";
import { Jumbotron, Button, Table } from "react-bootstrap";

class Main extends Component {
  render() {
    return (
      <div id="content">
        <Jumbotron>
          <h1 class="display-3">
            <img src={require("./cheers.png")} width="75" height="75" />
            Welcome, {this.props.account.substring(0, 5)}
          </h1>
          <div class="css-typing">
            <p> This is a project for a Blockchain based marketplace. </p>
            <p>
              Created By Jazara Debuggers Team.Have a look at the sections
              below.
            </p>
          </div>
        </Jumbotron>
        <h1> Add Product</h1>
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
          <div className="form-group mr-sm-2">
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
          <div className="form-group mr-sm-2">
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
          <div className="form-group mr-sm-2">
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
          <button type="submit" className="btn btn-primary">
            Add Product
          </button>
        </form>
        <p></p>
        <h2> My Products </h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th scope="col"> # </th> <th scope="col"> Name </th>
              <th scope="col"> Price </th> <th scope="col"> Owner </th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody id="productList">
            {this.props.products.map((product, key) => {
              return (
                <tr key={key}>
                  <th scope="row"> {product.id.toString()}</th>
                  <td>{product.name} </td>
                  <td>
                    {window.web3.utils.fromWei(
                      product.price.toString(),
                      "Ether"
                    )}
                    Eth
                  </td>
                  <td>{product.owner} </td>
                  <td>
                    {!product.purchased ? (
                      <button
                        name={product.id}
                        value={product.price}
                        onClick={(event) => {
                          this.props.purchaseProduct(
                            event.target.name,
                            event.target.value
                          );
                        }}
                      >
                        Buy
                      </button>
                    ) : null}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default Main;
