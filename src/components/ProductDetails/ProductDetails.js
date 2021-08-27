import React, { Component } from "react";
import { FaStar, FaEthereum } from "react-icons/fa";
import { BsPersonFill, BsFillStarFill } from "react-icons/bs";
import { AiOutlineCloudDownload } from "react-icons/ai";
import MetaTags from "react-meta-tags";
import "./ProductDetails.css";
import { Categories, Colors } from "../Categories";
import { Row, Col } from "react-bootstrap";
import Rating from "react-rating";
import ReviewModal from "../ReviewModal/ReviewModal";

class ProductDetails extends Component {
  constructor() {
    super();
    this.handleReviewModal = this.handleReviewModal.bind(this);
    this.reviewProduct = this.reviewProduct.bind(this);
    this.checkProductPurchase = this.checkProductPurchase.bind(this);
    this.state = {
      showReviewModal: false,
      purchased: false,
      initRate: 0,
    };
  }

  reviewProduct(rate, review) {
    this.props.reviewProduct(this.props.product.id, rate, review);
  }

  handleReviewModal(rate) {
    this.setState({
      showReviewModal: !this.state.showReviewModal,
      initRate: rate,
    });
  }

  checkProductPurchase() {
    if (
      this.props.purchasedProducts.find((prod) => {
        return prod.id === this.props.product.id;
      })
    )
      return true;
    else return false;
  }

  async downloadFile() {
    this.props.handleLoading();
    const hash = await this.props.marketplace.methods
      .getProductfile(this.props.product.id)
      .call({ from: this.state.account });
    console.log(hash);
    window.open(`https://ipfs.io/ipfs/${hash}`, "_blank");
    this.props.handleLoading();
    //window.location.href = `https://ipfs.io/ipfs/${hash}`;
  }

  render() {
    return (
      <div id="content" className="pt-5 mr-5 ml-5 px-5">
        <MetaTags>
          <title>{this.props.product.name}</title>
          <meta name="description" content={this.props.product.description} />
          <meta property="og:title" content="Jazara Blockchain" />
          <meta
            property="og:image"
            content={`https://ipfs.io/ipfs/${this.props.product.imgipfshash}`}
          />
        </MetaTags>

        <Row>
          <Col md="4">
            <img
              src={`https://ipfs.io/ipfs/${this.props.product.imgipfshash}`}
              alt={this.props.product.name}
              className="img-fluid"
            />
          </Col>
          <Col md="4">
            <div className="list-group list-group-flush">
              <div className="list-group-item">
                <h3 id="bloc1" className="pr-2" style={{ fontSize: "larger" }}>
                  {this.props.product.name}
                </h3>
                <div
                  id="bloc2"
                  className="badge text-white"
                  style={{
                    fontSize: "15px",
                    backgroundColor: Colors[this.props.product.categorie],
                  }}
                >
                  {Categories[this.props.product.categorie]}
                </div>
              </div>
              <div className="list-group-item">
                <span className="text-warning pr-3">
                  <BsPersonFill />
                </span>
                {this.props.product.totalSold}
              </div>
              <div className="list-group-item">
                <div className="rating">
                  <span>
                    <i
                      style={{ color: "rgb(248, 232, 37)" }}
                      className="fa fa-star"
                    ></i>
                  </span>
                  <span>
                    <i
                      style={{ color: "rgb(248, 232, 37)" }}
                      className="fa fa-star"
                    ></i>
                  </span>
                  <span>
                    <i
                      style={{ color: "rgb(248, 232, 37)" }}
                      className="fa fa-star"
                    ></i>
                  </span>
                  <span>
                    <i
                      style={{ color: "rgb(248, 232, 37)" }}
                      className="fa fa-star"
                    ></i>
                  </span>
                  <span>
                    <i
                      style={{ color: "rgb(248, 232, 37)" }}
                      className="fa fa-star"
                    ></i>
                  </span>
                  <span> 4 reviews</span>
                </div>
              </div>
              <div className="list-group-item">
                <span className="text-warning">Price: </span>
                <FaEthereum className="text-primary" />
                {""}
                {window.web3.utils.fromWei(
                  this.props.product.price.toString(),
                  "Ether"
                )}{" "}
                Eth
              </div>

              <div className="list-group-item">
                <span className="text-warning">Description: </span>
                {this.props.product.description}
              </div>

              <div className="list-group-item">
                <span className="text-warning">Owner: </span>
                <span className="text-success pl-2">
                  {this.props.product.owner.substring(0, 25)}
                </span>
              </div>
            </div>
          </Col>
          <Col md="4">
            <div className="card">
              <div className="list-group list-group-flush">
                <div className="list-group-item">
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>
                        <FaEthereum className="text-primary" />
                        {window.web3.utils.fromWei(
                          this.props.product.price.toString(),
                          "Ether"
                        )}{" "}
                        Eth
                      </strong>
                    </Col>
                  </Row>
                </div>
                <div className="list-group-item">
                  <Row>
                    <Col>Uploaded On:</Col>
                    <Col>
                      {Intl.DateTimeFormat("en-US", {
                        year: "numeric",
                        day: "2-digit",
                        month: "2-digit",
                      }).format(this.props.product.uploadedOn * 1000)}
                    </Col>
                  </Row>
                </div>
                <div className="list-group-item">
                  <Row>
                    <Col>Image IPFS Hash:</Col>
                    <Col className="text-warning">
                      {this.props.product.imgipfshash}
                    </Col>
                  </Row>
                </div>
                {this.props.product.owner === this.props.account ||
                this.checkProductPurchase() ? (
                  <div className="list-group-item">
                    <button
                      className="btn btn-lg btn-block btn-success"
                      disabled
                    >
                      <span>Owned</span>
                    </button>
                    <button
                      className="btn btn-lg btn-block btn-warning"
                      onClick={(event) => {
                        this.downloadFile();
                        //window.location.href = `https://ipfs.io/ipfs/${this.props.product.fileipfshash}`;
                      }}
                    >
                      <AiOutlineCloudDownload />
                      <span className="pl-2">Download File</span>
                    </button>
                  </div>
                ) : (
                  <div className="list-group-item">
                    <button
                      className="btn btn-lg btn-block btn-success"
                      onClick={(event) => {
                        this.props.purchaseProduct(
                          this.props.product.id,
                          this.props.product.price
                        );
                      }}
                    >
                      <span>Buy Product</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </Col>
        </Row>
        <Row className="py-4">
          <Col md="6" className="bg-dark">
            <header className="m-2 pt-2 pb-2">
              <h2>REVIEWS(7)</h2>
            </header>
            <div className="list-group list-group-flush">
              <div className="list-group-item">
                <strong>Rajesh Khadka</strong>
                <div className="rating">
                  <span>
                    <i
                      style={{ color: "rgb(248, 232, 37)" }}
                      className="fa fa-star"
                    ></i>
                  </span>
                  <span>
                    <i
                      style={{ color: "rgb(248, 232, 37)" }}
                      className="fa fa-star"
                    ></i>
                  </span>
                  <span>
                    <i
                      style={{ color: "rgb(248, 232, 37)" }}
                      className="fa fa-star"
                    ></i>
                  </span>
                  <span>
                    <i
                      style={{ color: "rgb(248, 232, 37)" }}
                      className="fa fa-star"
                    ></i>
                  </span>
                  <span>
                    <i
                      style={{ color: "rgb(248, 232, 37)" }}
                      className="fa fa-star"
                    ></i>
                  </span>
                  <span></span>
                </div>
                <p>2020-10-30</p>
                <p>This is a amazing site</p>
              </div>
              <div className="list-group-item">
                <strong>yan</strong>
                <div className="rating">
                  <span>
                    <i
                      style={{ color: "rgb(248, 232, 37)" }}
                      className="fa fa-star"
                    ></i>
                  </span>
                  <span>
                    <i
                      style={{ color: "rgb(248, 232, 37)" }}
                      className="fa fa-star"
                    ></i>
                  </span>
                  <span>
                    <i
                      style={{ color: "rgb(248, 232, 37)" }}
                      className="fa fa-star"
                    ></i>
                  </span>
                  <span>
                    <i
                      style={{ color: "rgb(248, 232, 37)" }}
                      className="fa fa-star"
                    ></i>
                  </span>
                  <span>
                    <i
                      style={{ color: "rgb(248, 232, 37)" }}
                      className="fa fa-star"
                    ></i>
                  </span>
                  <span></span>
                </div>
                <p>2020-10-30</p>
                <p>yfgyfy</p>
              </div>
              <div className="list-group-item">
                <strong>Umer</strong>
                <div className="rating">
                  <span>
                    <i
                      style={{ color: "rgb(248, 232, 37)" }}
                      className="fa fa-star"
                    ></i>
                  </span>
                  <span>
                    <i
                      style={{ color: "rgb(248, 232, 37)" }}
                      className="fa fa-star"
                    ></i>
                  </span>
                  <span>
                    <i
                      style={{ color: "rgb(248, 232, 37)" }}
                      className="fa fa-star"
                    ></i>
                  </span>
                  <span>
                    <i
                      style={{ color: "rgb(248, 232, 37)" }}
                      className="fa fa-star-o"
                    ></i>
                  </span>
                  <span>
                    <i
                      style={{ color: "rgb(248, 232, 37)" }}
                      className="fa fa-star-o"
                    ></i>
                  </span>
                  <span></span>
                </div>
                <p>2020-11-07</p>
                <p>s</p>
              </div>
              <div className="list-group-item">
                <strong>tfs123</strong>
                <div className="rating">
                  <span>
                    <i
                      style={{ color: "rgb(248, 232, 37)" }}
                      className="fa fa-star"
                    ></i>
                  </span>
                  <span>
                    <i
                      style={{ color: "rgb(248, 232, 37)" }}
                      className="fa fa-star-o"
                    ></i>
                  </span>
                  <span>
                    <i
                      style={{ color: "rgb(248, 232, 37)" }}
                      className="fa fa-star-o"
                    ></i>
                  </span>
                  <span>
                    <i
                      style={{ color: "rgb(248, 232, 37)" }}
                      className="fa fa-star-o"
                    ></i>
                  </span>
                  <span>
                    <i
                      style={{ color: "rgb(248, 232, 37)" }}
                      className="fa fa-star-o"
                    ></i>
                  </span>
                  <span></span>
                </div>
                <p>2020-12-14</p>
                <p>ghh</p>
              </div>
              <div className="list-group-item">
                <strong>test</strong>
                <div className="rating">
                  <span>
                    <i
                      style={{ color: "rgb(248, 232, 37)" }}
                      className="fa fa-star"
                    ></i>
                  </span>
                  <span>
                    <i
                      style={{ color: "rgb(248, 232, 37)" }}
                      className="fa fa-star"
                    ></i>
                  </span>
                  <span>
                    <i
                      style={{ color: "rgb(248, 232, 37)" }}
                      className="fa fa-star"
                    ></i>
                  </span>
                  <span>
                    <i
                      style={{ color: "rgb(248, 232, 37)" }}
                      className="fa fa-star"
                    ></i>
                  </span>
                  <span>
                    <i
                      style={{ color: "rgb(248, 232, 37)" }}
                      className="fa fa-star-o"
                    ></i>
                  </span>
                  <span></span>
                </div>
                <p>2021-03-04</p>
                <p>jhhhkhkh</p>
              </div>
              <div className="list-group-item">
                <strong>hassan</strong>
                <div className="rating">
                  <span>
                    <i
                      style={{ color: "rgb(248, 232, 37)" }}
                      className="fa fa-star"
                    ></i>
                  </span>
                  <span>
                    <i
                      style={{ color: "rgb(248, 232, 37)" }}
                      className="fa fa-star"
                    ></i>
                  </span>
                  <span>
                    <i
                      style={{ color: "rgb(248, 232, 37)" }}
                      className="fa fa-star"
                    ></i>
                  </span>
                  <span>
                    <i
                      style={{ color: "rgb(248, 232, 37)" }}
                      className="fa fa-star"
                    ></i>
                  </span>
                  <span>
                    <i
                      style={{ color: "rgb(248, 232, 37)" }}
                      className="fa fa-star"
                    ></i>
                  </span>
                  <span></span>
                </div>
                <p>2021-03-26</p>
                <p>assasd</p>
              </div>
              <div className="list-group-item">
                <strong>Waleed Saifi</strong>
                <div className="rating">
                  <span>
                    <i
                      style={{ color: "rgb(248, 232, 37)" }}
                      className="fa fa-star"
                    ></i>
                  </span>
                  <span>
                    <i
                      style={{ color: "rgb(248, 232, 37)" }}
                      className="fa fa-star"
                    ></i>
                  </span>
                  <span>
                    <i
                      style={{ color: "rgb(248, 232, 37)" }}
                      className="fa fa-star"
                    ></i>
                  </span>
                  <span>
                    <i
                      style={{ color: "rgb(248, 232, 37)" }}
                      className="fa fa-star"
                    ></i>
                  </span>
                  <span>
                    <i
                      style={{ color: "rgb(248, 232, 37)" }}
                      className="fa fa-star"
                    ></i>
                  </span>
                  <span></span>
                </div>
                <p>2021-06-28</p>
                <p>Great</p>
              </div>
            </div>
          </Col>
          <Col md="6">
            <div className="bg-dark rounded shadow-sm p-4 mb-4 clearfix graph-star-rating">
              <h5 className="mb-4">Ratings and Reviews</h5>
              <div className="graph-star-rating-header">
                <div className="star-rating">
                  <BsFillStarFill className="text-warning" />
                  <BsFillStarFill className="text-warning" />
                  <BsFillStarFill className="text-warning" />
                  <BsFillStarFill className="text-warning" />
                  <BsFillStarFill />
                  <b className="ml-2">334</b>
                </div>
                <p className="mb-4 mt-2">Rated 3.5 out of 5</p>
              </div>
              <div className="graph-star-rating-body">
                <div className="rating-list">
                  <div className="rating-list-left">5 Star</div>
                  <div className="rating-list-center">
                    <div className="progress">
                      <div
                        style={{ width: "56%" }}
                        aria-valuemax="5"
                        aria-valuemin="0"
                        aria-valuenow="5"
                        role="progressbar"
                        className="progress-bar bg-warning"
                      >
                        <span className="sr-only">80% Complete (danger)</span>
                      </div>
                    </div>
                  </div>
                  <div className="rating-list-right">56%</div>
                </div>
                <div className="rating-list">
                  <div className="rating-list-left">4 Star</div>
                  <div className="rating-list-center">
                    <div className="progress">
                      <div
                        style={{ width: "23%" }}
                        aria-valuemax="5"
                        aria-valuemin="0"
                        aria-valuenow="5"
                        role="progressbar"
                        className="progress-bar bg-warning"
                      >
                        <span className="sr-only">80% Complete (danger)</span>
                      </div>
                    </div>
                  </div>
                  <div className="rating-list-right">23%</div>
                </div>
                <div className="rating-list">
                  <div className="rating-list-left ">3 Star</div>
                  <div className="rating-list-center">
                    <div className="progress">
                      <div
                        style={{ width: "11%" }}
                        aria-valuemax="5"
                        aria-valuemin="0"
                        aria-valuenow="5"
                        role="progressbar"
                        className="progress-bar bg-warning"
                      >
                        <span className="sr-only">80% Complete (danger)</span>
                      </div>
                    </div>
                  </div>
                  <div className="rating-list-right">11%</div>
                </div>
                <div className="rating-list">
                  <div className="rating-list-left">2 Star</div>
                  <div className="rating-list-center">
                    <div className="progress">
                      <div
                        style={{ width: "2%" }}
                        aria-valuemax="5"
                        aria-valuemin="0"
                        aria-valuenow="5"
                        role="progressbar"
                        className="progress-bar bg-warning"
                      >
                        <span className="sr-only">80% Complete (danger)</span>
                      </div>
                    </div>
                  </div>
                  <div className="rating-list-right">02%</div>
                </div>
              </div>
              <div className="graph-star-rating-footer text-center mt-3 mb-3">
                <h5 className="mb-4">Rate This Product</h5>
                <Rating
                  emptySymbol="fa fa-star-o fa-2x"
                  fullSymbol="fa fa-star fa-2x text-warning"
                  fractions={2}
                  onChange={(rate) => this.handleReviewModal(rate)}
                />
              </div>
            </div>
          </Col>
        </Row>
        {this.state.showReviewModal ? (
          <ReviewModal
            showReviewModal={this.state.showReviewModal}
            handleReviewModal={this.handleReviewModal}
            reviewProduct={this.reviewProduct}
            generateScore={this.props.generateScore}
            initRate={this.state.initRate}
          />
        ) : null}
      </div>
    );
  }
}

export default ProductDetails;
