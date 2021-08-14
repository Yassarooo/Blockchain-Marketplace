import React, { Component } from "react";
import { Table } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { GrView } from "react-icons/gr";
import { BsCheckCircle } from "react-icons/bs";
import "./MyProducts.css";

class MyProducts extends Component {
  render() {
    return (
      <div id="content" className="py-5 mr-5 ml-5 px-5">
        <h2 id="bloc1" className="pb-1">
          {" "}
          Your Products{" "}
        </h2>
        <h2 id="bloc2" className="float-right pb-1">
          Your Address: {""}
          <h2 id="bloc1" style={{ color: "orange" }}>
            {this.props.account}
          </h2>
        </h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th scope="col"> # </th> <th scope="col"> Name </th>
              <th scope="col"> Price </th> <th scope="col"> Purchased </th>
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
                  <td>{product.purchased ? <BsCheckCircle /> : null}</td>
                  <td>
                    <button type="button" className="btn btn-primary">
                      <GrView />
                    </button>{" "}
                    {""}
                    <button type="button" className="btn btn-success">
                      <FaEdit />
                    </button>{" "}
                    {""}
                    <button type="button" className="btn btn-danger">
                      <MdDelete />
                    </button>
                  </td>
                </tr>
              ) : null;
            })}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default MyProducts;
