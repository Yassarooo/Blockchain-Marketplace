import React, { Component } from "react";
import { FaEthereum, FaEye } from "react-icons/fa";
import { BsPersonFill } from "react-icons/bs";
import { AiOutlineCloudDownload, AiOutlineInfoCircle } from "react-icons/ai";
import { toast } from "react-toastify";
import MetaTags from "react-meta-tags";
import "./ProductDetails.css";
import { Categories, Colors } from "../Categories";
import { Row, Col, Button } from "react-bootstrap";
import Rating from "react-rating";
import ReviewModal from "../ReviewModal/ReviewModal";
import { Link } from "react-router-dom";

class ProductDetails extends Component {
  constructor() {
    super();
    this.handleReviewModal = this.handleReviewModal.bind(this);
    this.reviewProduct = this.reviewProduct.bind(this);
    this.calcPercentage = this.calcPercentage.bind(this);
    this.renderCard = this.renderCard.bind(this);
    this.state = {
      showReviewModal: false,
      initRate: 0,
      revs: [],
      rev: "",
    };
  }

  renderCard(product, index) {
    return (
      <Col md="2" className="pt-1" key={index}>
        <div className="card card h-100 rounded card ">
          <div
            className="badge text-white position-absolute"
            style={{
              top: "0.5rem",
              right: "0.5rem",
              fontSize: "15px",
              backgroundColor: Colors[product.categorie],
            }}
          >
            {/*product.owner.toString().substring(0, 8)*/}
            {Categories[product.categorie]}
          </div>
          <img
            className="card-img-top centered-and-cropped"
            src={`https://ipfs.io/ipfs/${product.imgipfshash}`}
            style={{ height: "20vh" }}
            alt="..."
          />
          <div className="card-body bg-dark pb-0 mb-0">
            <div className="text-center">
              <Rating
                //className="position-absolute"
                style={{
                  fontSize: "15px",
                  paddingBottom: "5px",
                }}
                emptySymbol="fa fa-star-o"
                fullSymbol="fa fa-star text-warning"
                fractions={2}
                readonly={true}
                initialRating={product.rate}
              />
              <h2 href={`/product/${product.id}`}>{product.name}</h2>
              <h2 className="text-warning" style={{ fontSize: "larger" }}>
                <FaEthereum className="text-primary pl-0 pr-2" />
                {window.web3.utils
                  .fromWei(product.price.toString(), "Ether")
                  .substring(0, 6)}{" "}
                Eth
              </h2>
            </div>
          </div>
          <div className="card-footer pb-3 pt-0 border-top-0 bg-dark">
            <div className="text-center ">
              <Link to={"/product/" + product.id}>
                <Button
                  className="btn btn-sm btn-outline-light stretched-link"
                  name={product.id}
                  value={product.price}
                >
                  More Details {""}
                  <FaEye />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Col>
    );
  }

  async purchaseProduct(id, price) {
    console.log("id= ", id, price);
    this.props.handleLoading();
    await this.props.marketplace.methods
      .purchaseProduct(id)
      .send({
        from: this.props.account,
        value: price,
      })
      .once("receipt", (receipt) => {
        this.props.handleLoading();
        toast.success("Product Purchased Successfully !", {
          position: "bottom-right",
          closeOnClick: true,
        });
        this.props.loadBlockchainData();
      });
  }

  async reviewProduct(rate, score, review) {
    this.props.handleLoading();
    await this.props.marketplace.methods
      .reviewProduct(this.props.product.id, rate, score, review)
      .send({
        from: this.props.account,
      })
      .once("receipt", (receipt) => {
        toast.success("Review Posted Successfully !", {
          position: "bottom-right",
          closeOnClick: true,
        });
      });
    await this.getReviews();
    await this.getproductUserReview();
    await this.props.loadBlockchainData();
  }

  handleReviewModal(rate) {
    this.setState({
      showReviewModal: !this.state.showReviewModal,
      initRate: rate,
    });
  }

  async getReviews() {
    const reviews = await this.props.marketplace.methods
      .getProductReviews(this.props.product.id)
      .call({ from: this.state.account });
    this.setState({
      revs: reviews,
    });
  }
  async report() {
    const hasreported = await this.props.marketplace.methods
      .hasReported(this.props.product.id)
      .call({
        from: this.props.account,
      });
    if (hasreported) {
      toast.error("You can only report once !", {
        position: "bottom-right",
        closeOnClick: true,
      });
    } else {
      await this.props.marketplace.methods
        .report(this.props.product.id)
        .send({
          from: this.props.account,
        })
        .once("receipt", (receipt) => {
          toast.success("Product Reported !", {
            position: "bottom-right",
            closeOnClick: true,
          });
        });
    }
  }
  async getproductUserReview() {
    const review = this.state.revs.find((rev) => {
      return rev.adr === this.props.account;
    });
    this.setState({
      rev: review,
    });
  }

  async componentDidMount() {
    await this.getReviews();
    await this.getproductUserReview();
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
  calcPercentage(stars) {
    if (stars.length === 0) return 0;
    else {
      return ((1 / (this.state.revs.length / stars.length)) * 100).toFixed(0);
    }
  }

  render() {
    const onestar = this.state.revs.filter((r) => {
      return r.rate === 1;
    });
    const twostars = this.state.revs.filter((r) => {
      return r.rate <= 2 && r.rate > 1;
    });
    const threestars = this.state.revs.filter((r) => {
      return r.rate > 2 && r.rate <= 3;
    });
    const fourstars = this.state.revs.filter((r) => {
      return r.rate > 3 && r.rate <= 4;
    });
    const fivestars = this.state.revs.filter((r) => {
      return r.rate > 4;
    });
    const cat = this.props.product.categorie;
    const id = this.props.product.id;
    const catproducts = this.props.products.filter(function (prod) {
      return prod.categorie === cat && prod.id !== id;
    });

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
                  <Rating
                    emptySymbol="fa fa-star-o"
                    fullSymbol="fa fa-star text-warning"
                    fractions={2}
                    readonly={true}
                    initialRating={this.props.product.rate}
                  />
                  <span> {this.props.product.reviewsCount} reviews</span>
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
              <button
                className="btn btn-sm btn-secondary"
                onClick={(event) => {
                  this.report();
                }}
                hidden={this.props.product.owner === this.props.account}
              >
                <AiOutlineInfoCircle />
                <span className="pl-2">Report Abuse</span>
              </button>
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
                this.props.checkProductPurchase(this.props.product.id) ? (
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
                      onClick={async (event) => {
                        this.purchaseProduct(
                          this.props.product.id,
                          this.props.product.price
                        );
                        this.props.checkProductPurchase(this.props.product.id);
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
          <Col md="6" className="custom-shining">
            <header className="m-2 pt-2 pb-2">
              <h2>REVIEWS({this.props.product.reviewsCount})</h2>
            </header>
            <div className="list-group list-group-flush">
              {this.state.revs.map((rev, key) => {
                return (
                  <div className="list-group-item" key={key}>
                    <strong>{rev.name}</strong>
                    <div className="rating">
                      <Rating
                        emptySymbol="fa fa-star-o"
                        fullSymbol="fa fa-star text-warning"
                        readonly={true}
                        fractions={2}
                        initialRating={rev.rate}
                        //onChange={(rate) => this.handleReviewModal(rate)}
                      />
                    </div>
                    <p>
                      {Intl.DateTimeFormat("en-US", {
                        year: "numeric",
                        day: "2-digit",
                        month: "2-digit",
                      }).format(rev.timeStamp * 1000)}
                    </p>
                    <p>{rev.reviewDescription}</p>
                  </div>
                );
              })}
            </div>
          </Col>
          <Col md="6">
            <div className="bg-dark custom-shining rounded shadow-sm p-4 ml-3 mb-4 clearfix graph-star-rating">
              <h5 className="mb-4">Ratings and Reviews</h5>
              <div className="graph-star-rating-header">
                <div className="star-rating">
                  <Rating
                    emptySymbol="fa fa-star-o fa-2x"
                    fullSymbol="fa fa-star fa-2x text-warning"
                    fractions={10}
                    readonly={true}
                    initialRating={this.props.product.rate}
                  />
                  <b className="ml-2" style={{ fontSize: "25px" }}>
                    {this.props.product.reviewsCount}
                  </b>
                </div>
                <p className="mb-4 mt-2">
                  Rated {this.props.product.rate} out of 5
                </p>
              </div>
              <div className="graph-star-rating-body">
                <div className="rating-list">
                  <div className="rating-list-left">5 Star</div>
                  <div className="rating-list-center">
                    <div className="progress">
                      <div
                        style={{
                          width: this.calcPercentage(fivestars) + "%",
                        }}
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
                  <div className="rating-list-right">
                    {this.calcPercentage(fivestars)}%
                  </div>
                </div>
                <div className="rating-list">
                  <div className="rating-list-left">4 Star</div>
                  <div className="rating-list-center">
                    <div className="progress">
                      <div
                        style={{
                          width: this.calcPercentage(fourstars) + "%",
                        }}
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
                  <div className="rating-list-right">
                    {this.calcPercentage(fourstars)}%
                  </div>
                </div>
                <div className="rating-list">
                  <div className="rating-list-left ">3 Star</div>
                  <div className="rating-list-center">
                    <div className="progress">
                      <div
                        style={{
                          width: this.calcPercentage(threestars) + "%",
                        }}
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
                  <div className="rating-list-right">
                    {this.calcPercentage(threestars)}%
                  </div>
                </div>
                <div className="rating-list">
                  <div className="rating-list-left">2 Star</div>
                  <div className="rating-list-center">
                    <div className="progress">
                      <div
                        style={{
                          width:
                            (this.state.revs.length / twostars.length) * 10 +
                            "%",
                        }}
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
                  <div className="rating-list-right">
                    {this.calcPercentage(twostars)}%
                  </div>
                </div>
                <div className="rating-list">
                  <div className="rating-list-left">1 Star</div>
                  <div className="rating-list-center">
                    <div className="progress">
                      <div
                        style={{
                          width:
                            (this.state.revs.length / onestar.length) * 10 +
                            "%",
                        }}
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
                  <div className="rating-list-right">
                    {this.calcPercentage(onestar)}%
                  </div>
                </div>
              </div>

              <div
                hidden={
                  this.props.checkProductPurchase(this.props.product.id) ||
                  this.props.account === this.props.product.owner
                }
                className="graph-star-rating-footer text-center mt-3 mb-3"
              >
                <h5 className="mb-4">Buy This Product to Review</h5>
              </div>
              <div
                hidden={
                  !this.props.checkProductPurchase(this.props.product.id) ||
                  this.state.rev !== undefined
                }
                className="graph-star-rating-footer text-center mt-3 mb-3"
              >
                <h5 className="mb-4">Rate This Product</h5>
                <Rating
                  emptySymbol="fa fa-star-o fa-2x"
                  fullSymbol="fa fa-star fa-2x text-warning"
                  onChange={(rate) => this.handleReviewModal(rate)}
                />
              </div>
            </div>
          </Col>
        </Row>
        <Row className="pt-4">
          <header className="border-bottom mb-2 pb-3">
            <div className="form-inline">
              <span className="mr-md-auto">Similar Products</span>
            </div>
          </header>
        </Row>

        <Row>{catproducts.slice(0, 6).map(this.renderCard)}</Row>
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
