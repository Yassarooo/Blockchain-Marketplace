import React, { Component } from "react";
import { Link } from "react-router-dom";
import ipfs from "./ipfs";
import { toast } from "react-toastify";
import Compressor from "compressorjs";

class AddProduct extends Component {
  state = {
    name: "",
    description: "",
    price: "",
    cat: "",
    imgipfshash: "",
    fileipfshash: "",
    imgbuffer: null,
    filebuffer: null,
    validFile: false,
    fileErrorMessage: "",
    addsuccessmessage: "",
    caterror: "",
  };

  createProduct(name, description, price, cat, imgipfshash, fileipfshash) {
    this.props.handleLoading();
    console.log(
      "name:",
      name + "desc:",
      description + "price:",
      price + "imgipfshash:",
      imgipfshash + "fileipfshash:",
      fileipfshash
    );
    this.props.marketplace.methods
      .createProduct(name, description, price, imgipfshash, fileipfshash, cat)
      .send({
        from: this.props.account,
      })
      .once("receipt", (receipt) => {
        this.setState({
          addsuccessmessage: "Product Added Successfully !",
        });
        toast.success("Product Added Successfully !", {
          position: "bottom-right",
          closeOnClick: true,
        });
        this.props.loadBlockchainData();
      });
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  captureImage = async (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    if (file.type.match("image/*")) {
      new Compressor(file, {
        quality: 0.8, // 0.6 can also be used, but its not recommended to go below.
        success: (compressed) => {
          const reader = new window.FileReader();
          reader.readAsArrayBuffer(compressed);
          reader.onloadend = () => {
            this.setState({
              imgbuffer: Buffer(reader.result),
            });
          };
        },
      });
    } else {
      toast.error("Choose valid image file ", {
        position: "bottom-right",
        closeOnClick: true,
      });
    }
  };

  captureFile = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      this.setState({
        filebuffer: Buffer(reader.result),
      });
    };
  };

  CheckIPFS() {
    if (this.props.products.length === 0) {
      this.setState({
        validFile: true,
      });
    } else {
      for (var i = 0; i < this.props.products.length; i++) {
        if (this.props.products[i].fileipfshash === this.state.fileipfshash) {
          this.setState({
            validFile: false,
          });
        } else {
          this.setState({
            validFile: true,
          });
        }
      }
    }
  }

  onSubmit = async (event) => {
    event.preventDefault();
    this.props.handleLoading();
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
      toast.info("Uploading Image...", {
        position: "bottom-right",
        closeOnClick: true,
      });
      ipfs.files.add(this.state.imgbuffer, (error, result) => {
        if (error) {
          toast.error(error, {
            position: "bottom-right",
            closeOnClick: true,
          });
          return;
        }
        this.setState({ imgipfshash: result[0].hash });
        toast.success("Image Uploaded Successfully", {
          position: "bottom-right",
          closeOnClick: true,
        });
        console.log("image ipfshash:", this.state.imgipfshash.toString());

        toast.info("Uploading File...", {
          position: "bottom-right",
          closeOnClick: true,
        });
        ipfs.files.add(this.state.filebuffer, (error, result) => {
          if (error) {
            toast.error(error, {
              position: "bottom-right",
              closeOnClick: true,
            });
            return;
          }
          this.setState({ fileipfshash: result[0].hash });
          toast.success("File Uploaded Successfully", {
            position: "bottom-right",
            closeOnClick: true,
          });
          toast.info("Checking File...", {
            position: "bottom-right",
            closeOnClick: true,
          });
          this.CheckIPFS();
          if (this.state.validFile) {
            this.createProduct(
              this.state.name,
              this.state.description,
              window.web3.utils.toWei(this.state.price.toString(), "Ether"),
              this.state.cat,
              this.state.imgipfshash.toString(),
              this.state.fileipfshash.toString()
            );
          } else {
            toast.error("File Privacy Violence Detected !", {
              position: "bottom-right",
              closeOnClick: true,
            });
            this.props.handleLoading();
            this.setState({
              fileErrorMessage: "Please Choose Another File",
            });
          }
        });
      });
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
        <fieldset disabled={this.props.loading}>
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center mt-4 text-warning">
                Sell a Product
              </h1>
              <p className="lead text-center">
                Let's get some information about your Product
              </p>
              <form className="needs-validation" onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Product Name *</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    placeholder="Ex: The Last Of Us II, GTA V..."
                    value={this.state.name}
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
                    placeholder="Description"
                    value={this.state.description}
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
                    className="form-control"
                    id="price"
                    name="price"
                    value={this.state.price}
                    onChange={this.handleChange}
                    placeholder="Price in Ethereum"
                    required
                  />
                  <div className="invalid-feedback">Price is required.</div>
                </div>

                <div className="form-group">
                  <label htmlFor="tags">Category *</label>
                  <select
                    className="form-control"
                    name="city"
                    onChange={this.handleSelect}
                    defaultValue="10"
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

                  <div
                    className="text-danger"
                    hidden={this.state.caterror === "" ? true : false}
                  >
                    {this.state.caterror}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="file">Image *</label>
                  <input
                    type="file"
                    accept="image/*"
                    className="form-control-file"
                    id="file"
                    onChange={this.captureImage}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="file">File *</label>
                  <input
                    type="file"
                    className="form-control-file"
                    id="file"
                    onChange={this.captureFile}
                  />
                  <div
                    className="text-danger"
                    hidden={this.state.fileErrorMessage === "" ? true : false}
                  >
                    {this.state.fileErrorMessage}
                  </div>
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
                  <button type="submit" className="btn btn-warning">
                    Add
                  </button>
                </div>
              </form>
              {this.state.addsuccessmessage !== "" ? (
                <div className="alert alert-info mt-5">
                  {this.state.addsuccessmessage}
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
