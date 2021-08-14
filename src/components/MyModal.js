import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";

class MyModal extends Component {
  state = {
    name: "",
    disabled: true,
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      disabled: e.target.value.length >= 5 ? false : true,
    });
  };

  render() {
    return (
      <Modal
        backdrop="static"
        keyboard={false}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={this.props.showModal}
        onHide={() => this.props.handleModal()}
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            <img
              src={require("./Assets/cheers.png")}
              alt=""
              width="50"
              height="50"
            />
            {""} Welcome To{" "}
            <a className="text-warning" href="//">
              Jazara Marketplace
            </a>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Enter Your Nickname.</h4>
          <div className="css-typing">
            <p>
              Please enter a name for your account, your name will be diplayed
              instead of your account address.
            </p>
          </div>

          <input
            type="text"
            id="name"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
            className="border-2 mb-2"
            placeholder="Enter your name"
            autoFocus
            required
          />
        </Modal.Body>
        <Modal.Footer>
          <div className="col-md-12 text-center">
            <Button
              size="lg"
              className="btn create "
              onClick={() => {
                this.props.registerCustomer(this.state.name);
              }}
              disabled={this.state.disabled}
            >
              Submit
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default MyModal;
