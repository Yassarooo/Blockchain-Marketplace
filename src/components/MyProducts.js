import React, { Component } from "react";
import { Button, Table } from "react-bootstrap";

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
              <th scope="col"> Price </th> <th scope="col"> Owner </th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody id="productList">
            {this.props.products.map((product, key) => {
              return product.owner == this.props.account ? (
                <tr key={key}>
                  <th scope="row"> {product.id.toString()}</th>
                  <td>{product.name} </td>
                  <td>
                    {product.price.toString()}
                    {""} Eth
                  </td>
                  <td>{product.owner} </td>
                  <td>
                    <button
                      name={product.id}
                      value={product.price}
                      onClick={(event) => {}}
                    >
                      Edit
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
