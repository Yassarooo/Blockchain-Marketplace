import React, { Component } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import MetaTags from "react-meta-tags";
import { Col, Row } from "react-bootstrap";

class EditProduct extends Component {
  state = {
    id: this.props.product.id,
    name: this.props.product.name,
    description: this.props.product.description,
    price: window.web3.utils.fromWei(
      this.props.product.price.toString(),
      "Ether"
    ),
    cat: this.props.product.categorie,
    editsuccessmessage: "",
  };

  handleChange = (e) => {
    console.log(e.target.value);
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  editProduct(id, name, description, price, cat) {
    this.props.handleLoading();
    console.log("name:", name + "desc:", description + "price:", price);

    this.props.marketplace.methods
      .editProduct(id, name, description, price, cat)
      .send({
        from: this.props.account,
      })
      .once("receipt", (receipt) => {
        this.props.handleLoading();
        this.setState({
          editsuccessmessage: "Product Edited Successfully !",
        });
        toast.success("Product Edited Successfully !", {
          position: "bottom-right",
          closeOnClick: true,
        });
        this.props.loadBlockchainData();
      });
  }

  onSubmit = async (event) => {
    event.preventDefault();
    if (
      this.state.name.length > 20 &&
      (this.state.price.toString() > 999999) &
        (this.state.description.length > 120)
    ) {
      toast.error("please enter correct info", {
        position: "bottom-right",
        closeOnClick: true,
      });
    } else {
      this.editProduct(
        this.state.id,
        this.state.name,
        this.state.description,
        window.web3.utils.toWei(this.state.price.toString(), "Ether"),
        this.state.cat
      );
    }
  };

  handleSelect = (e) => {
    console.log(e.target.value);
    this.setState({
      cat: e.target.value,
    });
  };

  render() {
    return (
      <div className="container">
        <MetaTags>
          <title>Edit {this.props.product.name}</title>
          <meta name="description" content={this.props.product.description} />
          <meta property="og:title" content="Jazara Blockchain" />
          <meta
            property="og:image"
            content={`https://ipfs.io/ipfs/${this.props.product.imgipfshash}`}
          />
        </MetaTags>

        <Row>
          <Col md="2 py-5">
            <img
              src={`https://ipfs.io/ipfs/${this.props.product.imgipfshash}`}
              alt={this.props.product.name}
              className="img-fluid"
            />
          </Col>
          <Col md="8">
            <fieldset disabled={this.props.loading}>
              <Row>
                <Col md="8" className="m-auto">
                  <h1 className="display-4 text-center mt-4 text-warning">
                    Edit {this.props.product.name}
                  </h1>
                  <form className="needs-validation" onSubmit={this.onSubmit}>
                    <div className="form-group">
                      <label htmlFor="name">Product Name *</label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        defaultValue={this.props.product.name}
                        onChange={this.handleChange}
                        required
                      />
                      <div className="invalid-feedback">Name is required.</div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="description">Description *</label>
                      <textarea
                        className="form-control"
                        type="text"
                        id="description"
                        name="description"
                        defaultValue={this.props.product.description}
                        onChange={this.handleChange}
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
                        type="number"
                        step="any"
                        className="form-control"
                        id="price"
                        name="price"
                        defaultValue={window.web3.utils.fromWei(
                          this.props.product.price.toString(),
                          "Ether"
                        )}
                        onChange={this.handleChange}
                        required
                      />
                      <div className="invalid-feedback">Price is required.</div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="tags">Category *</label>
                      <select
                        defaultValue={this.props.product.categorie}
                        className="form-control"
                        name="city"
                        onChange={this.handleSelect}
                      >
                        <option value="0">Tech</option>
                        <option value="1">PC Games</option>
                        <option value="2">PS4 Games</option>
                        <option value="3">Xbox Games</option>
                        <option value="4">Movies</option>
                        <option value="5">Courses</option>
                        <option value="6">Books</option>
                        <option value="7">AudioBooks</option>
                        <option value="8">Images</option>
                        <option value="9"> Videos</option>
                        <option value="10"> Other</option>
                      </select>
                    </div>

                    <small className="d-block pb-3">* = required fields</small>

                    <div className="mb-3">
                      <Link to="/" className="btn btn-secondary mr-2">
                        Cancel
                      </Link>
                      <button type="submit" className="btn btn-warning">
                        Submit
                      </button>
                    </div>
                  </form>
                  {this.state.editsuccessmessage !== "" ? (
                    <div className="alert alert-info mt-5">
                      {this.state.editsuccessmessage}
                    </div>
                  ) : null}
                </Col>
              </Row>
            </fieldset>
          </Col>
        </Row>
      </div>
    );
  }
}
export default EditProduct;
