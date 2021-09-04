import React, { Component } from "react";
import { Col, Row } from "react-bootstrap";
import MetaTags from "react-meta-tags";
import {
  FaBalanceScale,
  FaEthereum,
  FaEye,
  FaLock,
  FaSearchPlus,
  FaStore,
  FaTachometerAlt,
} from "react-icons/fa";
import { IoSpeedometerSharp } from "react-icons/io5";
import { GiBreakingChain, GiGroupedDrops } from "react-icons/gi";
import "./Home.css";
import { Link } from "react-router-dom";

class Home extends Component {
  render() {
    return (
      <section className="pt-3 mx-5">
        <MetaTags>
          <title>Jazara Blockchain Marketplace</title>
          <meta property="og:title" content="Jazara Blockchain Marketplace" />
        </MetaTags>
        <header className="bg-dark py-2">
          <div className="container px-4 px-lg-5 my-5">
            <h1 className="display-3 fw-bolder">
              <img
                src={require("../Assets/cheers.png")}
                alt=""
                width="100"
                height="100"
              />{" "}
              Welcome,{" "}
              <a href="//" className="text-primary">
                {this.props.customer !== null ? this.props.customer.name : ""}
              </a>
            </h1>
            <div className="css-typing text-white">
              <p>
                This is a web marketplace project based on Blockchain technology
                & smart contracts which are implemented by Ethereum .
              </p>
              <p>
                Created By
                <a className="text-warning" href="//">
                  {" "}
                  Jazara Debuggers Team ©{" "}
                </a>
                ,Have a look at the sections below, feel free to contact us at :{" "}
                <a className="text-warning" href="//">
                  {" "}
                  jazaradebuggers@gmail.com
                </a>
              </p>
            </div>
          </div>
        </header>{" "}
        <hr />
        <Row className="pt-5 text-center ">
          <Col md="3">
            <h2 className="text-warning">
              <FaStore className="pr-1" />
              Sell Product
            </h2>
            <p>
              You can sell your digital product and do not worry,Your data will
              be totaly safe with <a href="https://ipfs.io/">IPFS</a> blockchain
              server .
            </p>
            <p>
              <Link
                to="/addproduct"
                className="btn btn-warning"
                ui-sref="params"
                role="button"
              >
                Sell Product »
              </Link>
            </p>
          </Col>
          <Col md="3">
            <h2 className="text-warning">
              <FaEthereum className="pr-1" />
              Buy Product
            </h2>
            <p>
              Buying product process is totally secure and safe through Ethereum
              & smart contracts.
            </p>
            <p>
              <Link
                to="/products"
                className="btn btn-warning"
                ui-sref="cars"
                role="button"
              >
                Explore Products »
              </Link>
            </p>
          </Col>
          <Col md="3">
            <h2 className="text-warning">
              <FaEye className="pr-1" />
              View Uploaded Products
            </h2>
            <p>
              You can view,edit,remove your uploaded products and see some
              statistics about them (number of purchases,owners...)
            </p>
            <p>
              <Link
                to="/myproducts"
                className="btn btn-warning"
                ui-sref="sellcar"
                role="button"
              >
                My Products »
              </Link>
            </p>
          </Col>
          <div className="col-md-3">
            <h2 className="text-warning">
              <FaSearchPlus className="pr-1" />
              Explore More !
            </h2>
            <p>
              Start exploring our website by taking a tour among sections and
              tabs !
            </p>
            <p>
              <Link
                to="/products"
                className="btn btn-warning"
                ui-sref="MQ"
                role="button"
              >
                Start Exploring »
              </Link>
            </p>
          </div>
          <Col sm="12" md="12" lg="12" className="text-center pt-5">
            <hr />
            <h3>Total Security</h3>
            <h3
              style={{
                fontSize: "60px",
                lineHeight: "60px",
                marginBottom: "20px",
                fontWeight: "900",
              }}
            >
              With {""}
              <span className="highlight text-primary">Smart Contracts</span>
            </h3>
            <p>All the features you need to create a safe website.</p>
          </Col>
          <Col sm="12" md="12" lg="12">
            <div className="features-list">
              <div className="row">
                <div className="col-md-4">
                  <div
                    className="feature-block bootdey"
                    style={{ visibility: "visible" }}
                  >
                    <div className="ico">
                      <FaBalanceScale />
                    </div>
                    <div className="name">Immutability</div>
                    <div className="text col-md-12">
                      Every node on the system has a copy of the digital
                      ledger,This promotes transparency and makes it
                      corruption-proof.
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div
                    className="feature-block bootdey"
                    style={{ visibility: "visible" }}
                  >
                    <div className="ico">
                      <FaLock />
                    </div>
                    <div className="name">Enhanced Security</div>
                    <div className="text col-md-12">
                      No one can change any characteristics of the network for
                      their benefit. Using encryption ensures another layer of
                      security for the system.
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div
                    className="feature-block bootdey"
                    style={{ visibility: "visible" }}
                  >
                    <div className="ico">
                      <IoSpeedometerSharp />
                    </div>
                    <div className="name">Faster Settlement</div>
                    <div className="text col-md-12">
                      Blockchain offers a faster settlement compared to
                      traditional systems. This way a user can transfer money
                      relatively faster, which saves a lot of time.
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div
                    className="feature-block bootdey"
                    style={{ visibility: "visible" }}
                  >
                    <div className="ico">
                      <FaTachometerAlt />
                    </div>
                    <div className="name">Transparency</div>
                    <div className="text col-md-12">
                      Every change on the blockchain is viewable and makes it
                      more concrete.
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div
                    className="feature-block bootdey"
                    style={{ visibility: "visible" }}
                  >
                    <div className="ico">
                      <GiBreakingChain />
                    </div>
                    <div className="name">Decentralized</div>
                    <div className="text col-md-12">
                      The network is decentralized meaning it doesn’t have any
                      governing authority or a single person looking after the
                      framework. Rather a group of nodes maintains the network
                      making it decentralized.
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div
                    className="feature-block bootdey"
                    style={{ visibility: "visible" }}
                  >
                    <div className="ico">
                      <GiGroupedDrops />
                    </div>
                    <div className="name">No Third-Party</div>
                    <div className="text col-md-12">
                      Doesn’t rely on third-party companies; No third-party, no
                      added risk.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </section>
    );
  }
}

export default Home;
