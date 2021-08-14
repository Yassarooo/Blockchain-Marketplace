import React, { Component } from "react";
import { FaStar, FaEthereum } from "react-icons/fa";
import { BsPersonFill } from "react-icons/bs";
import { AiOutlineCloudDownload } from "react-icons/ai";
import "./ProductDetails.css";

class ProductDetails extends Component {
  render() {
    return (
      <div id="content" className="py-5 mr-5 ml-5 px-5">
        <div className="row">
          <div className="col-md-4">
            <img
              src={`https://ipfs.io/ipfs/${this.props.product.imgipfshash}`}
              alt={this.props.product.name}
              className="img-fluid"
            />
          </div>
          <div className="col-md-4">
            <div className="list-group list-group-flush">
              <div className="list-group-item">
                <h3>{this.props.product.name}</h3>
              </div>
              <div className="list-group-item">
                <div className="rating">
                  <span>
                    <FaStar style={{ color: "rgb(248, 232, 37)" }}></FaStar>
                  </span>
                  <span>
                    <FaStar style={{ color: "rgb(248, 232, 37)" }}></FaStar>
                  </span>
                  <span>
                    <FaStar style={{ color: "rgb(248, 232, 37)" }}></FaStar>
                  </span>
                  <span>
                    <FaStar style={{ color: "rgb(248, 232, 37)" }}></FaStar>
                  </span>
                  <span>
                    <FaStar style={{ color: "rgb(248, 232, 37)" }}></FaStar>
                  </span>
                  <span> 4 reviews</span>
                </div>
              </div>
              <div className="list-group-item">
                Price: <FaEthereum className="text-primary" />
                {""}
                {window.web3.utils.fromWei(
                  this.props.product.price.toString(),
                  "Ether"
                )}{" "}
                Eth
              </div>
              <div className="list-group-item">
                Description: {this.props.product.description}
              </div>
              <div className="list-group-item">
                <BsPersonFill />
                <span className="text-warning pl-2">
                  {this.props.product.owner.substring(0, 15)}
                </span>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="list-group list-group-flush">
                <div className="list-group-item">
                  <div className="row">
                    <div className="col">Price:</div>
                    <div className="col">
                      <strong>
                        <FaEthereum className="text-primary" />
                        {""}{" "}
                        {window.web3.utils.fromWei(
                          this.props.product.price.toString(),
                          "Ether"
                        )}{" "}
                        Eth
                      </strong>
                    </div>
                  </div>
                </div>
                <div className="list-group-item">
                  <div className="row">
                    <div className="col">Date:</div>
                    <div className="col">17/4/2021</div>
                  </div>
                </div>
                {this.props.product.owner === this.props.account ? (
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
                        window.location.href = `https://ipfs.io/ipfs/${this.props.product.fileipfshash}`;
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
                      name={this.props.product.id}
                      value={this.props.product.price}
                      onClick={(event) => {
                        this.props.purchaseProduct(
                          event.target.name,
                          event.target.value
                        );
                      }}
                    >
                      <span>Buy Product</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="row py-4">
          <div className="col-md-6">
            <h2>REVIEWS(7)</h2>
            <div className="list-group list-group-flush">
              <div className="list-group-item">
                <strong>Rajesh Khadka</strong>
                <div className="rating">
                  <span>
                    <FaStar style={{ color: "rgb(248, 232, 37)" }}></FaStar>
                  </span>
                  <span>
                    <FaStar style={{ color: "rgb(248, 232, 37)" }}></FaStar>
                  </span>
                  <span>
                    <FaStar style={{ color: "rgb(248, 232, 37)" }}></FaStar>
                  </span>
                  <span>
                    <FaStar style={{ color: "rgb(248, 232, 37)" }}></FaStar>
                  </span>
                  <span>
                    <FaStar style={{ color: "rgb(248, 232, 37)" }}></FaStar>
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
                    <FaStar style={{ color: "rgb(248, 232, 37)" }}></FaStar>
                  </span>
                  <span>
                    <FaStar style={{ color: "rgb(248, 232, 37)" }}></FaStar>
                  </span>
                  <span>
                    <FaStar style={{ color: "rgb(248, 232, 37)" }}></FaStar>
                  </span>
                  <span>
                    <FaStar style={{ color: "rgb(248, 232, 37)" }}></FaStar>
                  </span>
                  <span>
                    <FaStar style={{ color: "rgb(248, 232, 37)" }}></FaStar>
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
                    <FaStar style={{ color: "rgb(248, 232, 37)" }}></FaStar>
                  </span>
                  <span>
                    <FaStar style={{ color: "rgb(248, 232, 37)" }}></FaStar>
                  </span>
                  <span>
                    <FaStar style={{ color: "rgb(248, 232, 37)" }}></FaStar>
                  </span>
                  <span>
                    <i
                      style={{ color: "rgb(248, 232, 37)" }}
                      className="far fa-star"
                    ></i>
                  </span>
                  <span>
                    <i
                      style={{ color: "rgb(248, 232, 37)" }}
                      className="far fa-star"
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
                    <FaStar style={{ color: "rgb(248, 232, 37)" }}></FaStar>
                  </span>
                  <span>
                    <i
                      style={{ color: "rgb(248, 232, 37)" }}
                      className="far fa-star"
                    ></i>
                  </span>
                  <span>
                    <i
                      style={{ color: "rgb(248, 232, 37)" }}
                      className="far fa-star"
                    ></i>
                  </span>
                  <span>
                    <i
                      style={{ color: "rgb(248, 232, 37)" }}
                      className="far fa-star"
                    ></i>
                  </span>
                  <span>
                    <i
                      style={{ color: "rgb(248, 232, 37)" }}
                      className="far fa-star"
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
                    <FaStar style={{ color: "rgb(248, 232, 37)" }}></FaStar>
                  </span>
                  <span>
                    <FaStar style={{ color: "rgb(248, 232, 37)" }}></FaStar>
                  </span>
                  <span>
                    <FaStar style={{ color: "rgb(248, 232, 37)" }}></FaStar>
                  </span>
                  <span>
                    <FaStar style={{ color: "rgb(248, 232, 37)" }}></FaStar>
                  </span>
                  <span>
                    <i
                      style={{ color: "rgb(248, 232, 37)" }}
                      className="far fa-star"
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
                    <FaStar style={{ color: "rgb(248, 232, 37)" }}></FaStar>
                  </span>
                  <span>
                    <FaStar style={{ color: "rgb(248, 232, 37)" }}></FaStar>
                  </span>
                  <span>
                    <FaStar style={{ color: "rgb(248, 232, 37)" }}></FaStar>
                  </span>
                  <span>
                    <FaStar style={{ color: "rgb(248, 232, 37)" }}></FaStar>
                  </span>
                  <span>
                    <FaStar style={{ color: "rgb(248, 232, 37)" }}></FaStar>
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
                    <FaStar style={{ color: "rgb(248, 232, 37)" }}></FaStar>
                  </span>
                  <span>
                    <FaStar style={{ color: "rgb(248, 232, 37)" }}></FaStar>
                  </span>
                  <span>
                    <FaStar style={{ color: "rgb(248, 232, 37)" }}></FaStar>
                  </span>
                  <span>
                    <FaStar style={{ color: "rgb(248, 232, 37)" }}></FaStar>
                  </span>
                  <span>
                    <FaStar style={{ color: "rgb(248, 232, 37)" }}></FaStar>
                  </span>
                  <span></span>
                </div>
                <p>2021-06-28</p>
                <p>Great</p>
              </div>
              <div className="list-group-item">
                <h2>Write a Customer Review</h2>Please{" "}
                <a href="/login">sign in</a> to write a review{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductDetails;
