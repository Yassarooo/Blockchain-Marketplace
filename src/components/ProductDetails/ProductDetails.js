import React, { Component } from "react";
import { FaStar, FaEthereum } from "react-icons/fa";
import { BsPersonFill } from "react-icons/bs";
import { AiOutlineCloudDownload } from "react-icons/ai";
import MetaTags from "react-meta-tags";
import "./ProductDetails.css";
import { Categories, Colors } from "../Categories";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import { MdExpandMore } from "react-icons/md";

class ProductDetails extends Component {
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
                <h3 id="bloc1" className="pr-2">
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
                  {/*product.owner.toString().substring(0, 8)*/}
                  {Categories[this.props.product.categorie]}
                </div>
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
                <Accordion>
                  <AccordionSummary
                    expandIcon={<MdExpandMore />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>Description</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>{this.props.product.description}</Typography>
                  </AccordionDetails>
                </Accordion>
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
                    <div className="col">Uploaded On:</div>
                    <div className="col">
                      {Intl.DateTimeFormat("en-US", {
                        year: "numeric",
                        day: "2-digit",
                        month: "2-digit",
                      }).format(this.props.product.uploadedOn * 1000)}
                    </div>
                  </div>
                </div>
                <div className="list-group-item">
                  <div className="row">
                    <div className="col">Image IPFS Hash:</div>
                    <div className="col text-warning">
                      {this.props.product.imgipfshash}
                    </div>
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
