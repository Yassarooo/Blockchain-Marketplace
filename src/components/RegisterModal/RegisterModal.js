import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import "./RegisterModal.css";

class RegisterModal extends Component {
  state = {
    name: "",
    disabled: true,
  };

  registerCustomer(name) {
    this.props.handleLoading();
    this.props.handleRegisterModal();
    this.props.marketplace.methods
      .registerCustomer(this.props.account, name)
      .send({
        from: this.props.account,
      })
      .once("receipt", (receipt) => {
        toast.success("Customer Registered Successfully !", {
          position: "bottom-right",
          closeOnClick: true,
        });

        this.props.handleLoading();
        this.props.loadBlockchainData();
      });
  }

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
        onHide={() => this.props.handleRegisterModal()}
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            <img
              src={require("../Assets/cheers.png")}
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
                this.registerCustomer(this.state.name);
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

export default RegisterModal;
