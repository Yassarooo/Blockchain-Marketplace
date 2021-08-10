import React, { Component, useState } from "react";
import { Link } from "react-router-dom";

import { create } from "ipfs-http-client";
const client = create("https://ipfs.infura.io:5001/api/v0");

class UploadImage extends Component {
  state = {
    title: "",
    description: "",
    tags: "",
    buffer: null,
    file: null,
  };

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  captureFile = (event) => {
    const file = event.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      this.setState({
        buffer: Buffer(reader.result),
        file: file,
      });
    };
  };

  handleUploadImage = async (event) => {
    try {
      const added = await client.add(this.state.file);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      console.log("uploaded successfully" + url);
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  };

  render() {
    return (
      <div className="container">
        <fieldset disabled={this.props.loading}>
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center mt-4">Upload an image</h1>
              <p className="lead text-center">
                Let's get some information before uploading your image to IPFS
                and the Blockchain
              </p>
              <form
                className="needs-validation"
                onSubmit={this.handleUploadImage}
              >
                <div className="form-group">
                  <label htmlFor="title">Title *</label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    placeholder="Title"
                    value={this.state.title}
                    onChange={this.handleChange}
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
                    rows="3"
                    value={this.state.description}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="tags">Tags *</label>
                  <input
                    type="text"
                    className="form-control"
                    id="tags"
                    placeholder="Tags"
                    value={this.state.tags}
                    onChange={this.handleChange}
                    required
                  />
                  <small id="tagsHelpBlock" className="form-text text-muted">
                    Comma-delimited e.g Baseball, Softball, Soccer.
                  </small>
                  <div className="invalid-feedback">Tags are required.</div>
                </div>
                <div className="form-group">
                  <label htmlFor="file">Image *</label>
                  <input
                    type="file"
                    className="form-control-file"
                    id="file"
                    onChange={this.captureFile}
                    required
                  />
                  <div className="invalid-feedback">Image required.</div>
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
                    Upload
                  </button>
                </div>
              </form>
              {this.state.file && (
                <div className="text-center mt-3 mb-3">
                  <img
                    src={this.state.file}
                    className="img-thumbnail"
                    alt="Preview"
                  />
                </div>
              )}
            </div>
          </div>
        </fieldset>
      </div>
    );
  }
}
export default UploadImage;
