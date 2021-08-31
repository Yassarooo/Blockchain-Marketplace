import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import "./RegisterModal.css";

class RegisterModal extends Component {
  state = {
    name: "",
    disabled: true,
    error: "",
  };

  async registerCustomer() {
    this.props.handleLoading();
    if (this.state.name.length >= 5 && this.state.name.length < 15) {
      this.props.marketplace.methods
        .registerCustomer(this.props.account, this.state.name)
        .send({
          from: this.props.account,
        })
        .once("receipt", (receipt) => {
          toast.success("Customer Registered Successfully !", {
            position: "bottom-right",
            closeOnClick: true,
          });
          this.props.handleLoading();
          this.props.handleRegisterModal();
          this.props.loadBlockchainData();
        });
    } else {
      this.setState({
        error: "name must be betwen 5 to 15 characters",
      });
    }
  }

  handleChange = (e) => {
    e.target.value.length >= 5 && e.target.value.length < 15
      ? this.setState({
          [e.target.name]: e.target.value,
          disabled: false,
        })
      : this.setState({
          [e.target.name]: e.target.value,
          disabled: true,
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
          <form
            className="needs-validation"
            onSubmit={(e) => {
              e.preventDefault();
              this.registerCustomer();
            }}
          >
            <div className="form-group">
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
              <div
                className="text-danger"
                hidden={this.state.error === "" ? true : false}
              >
                {this.state.error}
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <div className="col-md-12 text-center">
            <Button
              size="lg"
              className="btn create btn-warning "
              onClick={() => {
                this.registerCustomer();
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
