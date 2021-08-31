import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import { FaEdit, FaRedo } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { GrView } from "react-icons/gr";
import Rating from "react-rating";
import { toast } from "react-toastify";
import "./MyProducts.css";

class MyProducts extends Component {
  removeProduct(id) {
    this.props.handleLoading();
    this.props.marketplace.methods
      .removeProduct(id)
      .send({
        from: this.props.account,
      })
      .once("receipt", (receipt) => {
        this.props.handleLoading();
        toast.success("Product removed Successfully !", {
          position: "bottom-right",
          closeOnClick: true,
        });
        this.props.loadBlockchainData();
      });
  }
  restoreProduct(id) {
    this.props.handleLoading();
    this.props.marketplace.methods
      .restoreProduct(id)
      .send({
        from: this.props.account,
      })
      .once("receipt", (receipt) => {
        this.props.handleLoading();
        toast.success("Product restored Successfully !", {
          position: "bottom-right",
          closeOnClick: true,
        });
        this.props.loadBlockchainData();
      });
  }

  render() {
    return (
      <div id="content" className="py-5 mr-5 ml-5 px-5">
        <h2 id="bloc1" className="pb-1 text-success">
          Your Products
        </h2>
        <h2 id="bloc2" className="float-right pb-1 pr-2 text-success">
          Your Address:
          <span id="bloc1" style={{ color: "orange" }}>
            {this.props.account}
          </span>
        </h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th scope="col"> # </th>
              <th scope="col"> Name </th>
              <th scope="col"> Price </th>
              <th scope="col"> Sold </th>
              <th scope="col"> Uploaded On</th>
              <th scope="col"> Rate </th>
              <th scope="col"> Actions</th>
            </tr>
          </thead>
          <tbody id="productList">
            {this.props.products.map((product, key) => {
              return product.owner === this.props.account ? (
                <tr key={key}>
                  <th scope="row"> {product.id.toString()}</th>
                  <td>{product.name} </td>
                  <td>
                    {window.web3.utils.fromWei(
                      product.price.toString(),
                      "Ether"
                    )}
                    {""} Eth
                  </td>
                  <td>{product.totalSold}</td>
                  <td>
                    {Intl.DateTimeFormat("en-US", {
                      year: "numeric",
                      day: "2-digit",
                      month: "2-digit",
                    }).format(product.uploadedOn * 1000)}
                  </td>
                  <td>
                    <Rating
                      emptySymbol="fa fa-star-o"
                      fullSymbol="fa fa-star text-warning"
                      readonly={true}
                      fractions={2}
                      initialRating={product.rate}
                      //onChange={(rate) => this.handleReviewModal(rate)}
                    />
                  </td>
                  <td>
                    <Link to={"/product/" + product.id} className="px-2">
                      <button
                        type="button"
                        className="btn btn-primary"
                        data-toggle="tooltip"
                        title="View product"
                      >
                        <GrView />
                      </button>
                    </Link>
                    <Link to={"/product/edit/" + product.id} className="px-2">
                      <button
                        type="button"
                        className="btn btn-success"
                        data-toggle="tooltip"
                        title="Edit product"
                      >
                        <FaEdit />
                      </button>
                    </Link>
                    {product.removed === "1" ? (
                      <button
                        type="button"
                        className="btn btn-warning"
                        data-toggle="tooltip"
                        title="ٌRestore product"
                        onClick={(e) => {
                          e.preventDefault();
                          this.restoreProduct(product.id);
                        }}
                      >
                        <FaRedo />
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="btn btn-danger"
                        data-toggle="tooltip"
                        title="Delete product"
                        onClick={(e) => {
                          e.preventDefault();
                          this.removeProduct(product.id);
                        }}
                      >
                        <MdDelete />
                      </button>
                    )}
                  </td>
                </tr>
              ) : null;
            })}
          </tbody>
        </Table>
        <h2 className="pb-1 text-success">Purchased Products</h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th scope="col"> ID </th>
              <th scope="col"> Name </th>
              <th scope="col"> Price </th>
              <th scope="col"> Actions</th>
            </tr>
          </thead>
          <tbody id="productList">
            {this.props.purchasedProducts.map((product, key) => {
              return (
                <tr key={key}>
                  <th scope="row"> {product.id.toString()}</th>
                  <td>{product.name} </td>
                  <td>
                    {window.web3.utils.fromWei(
                      product.price.toString(),
                      "Ether"
                    )}
                    {""} Eth
                  </td>
                  <td>
                    <Link to={"/product/" + product.id} className="px-2">
                      <button
                        type="button"
                        className="btn btn-primary"
                        data-toggle="tooltip"
                        title="View product"
                      >
                        <GrView />
                      </button>
                    </Link>
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

export default MyProducts;
