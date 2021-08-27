import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import Rating from "react-rating";

class ReviewModal extends Component {
  state = {
    rate: this.props.initRate,
    review: "",
    score: 0,
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      disabled: e.target.value.length >= 5 ? false : true,
    });
  };

  async onSubmit() {
    console.log(this.state.review);
    const score = await this.props.generateScore(this.state.review);
    var scr = parseInt(score * 100);
    console.log(score, ":", scr);
    await this.props.marketplace.methods
      .reviewProduct(
        this.props.product.id,
        this.state.rate,
        scr,
        this.state.review
      )
      .send({
        from: this.props.account,
      })
      .once("receipt", (receipt) => {
        this.loadBlockchainData();
      });
    this.setState({ score: score });
  }

  render() {
    return (
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={this.props.showReviewModal}
        onHide={() => this.props.handleReviewModal()}
      >
        <Modal.Header id="contained-modal-title-vcenter">
          <h4>Rate this product Score: {this.state.score}</h4>
        </Modal.Header>
        <Modal.Body>
          <Rating
            className="mb-4"
            emptySymbol="fa fa-star-o fa-2x"
            fullSymbol="fa fa-star fa-2x text-warning"
            fractions={2}
            initialRating={this.state.rate}
            onChange={(rate) => this.setState({ rate: rate })}
          />
          <textarea
            type="text"
            className="form-control mb-10"
            placeholder="What would you like to say about this product"
            value={this.state.review}
            onChange={(event) => this.setState({ review: event.target.value })}
          ></textarea>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn btn-out btn-warning btn-square"
            onClick={(e) =>
              //this.props.reviewProduct(this.state.rate, this.state.review)
              this.onSubmit(e)
            }
          >
            Post Review
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default ReviewModal;
