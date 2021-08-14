import React, { Component } from "react";
import "./style/About.css";
import {
  FaCopyright,
  FaFacebook,
  FaFlag,
  FaGithub,
  FaLinkedinIn,
  FaUniversity,
} from "react-icons/fa";

class AboutUs extends Component {
  render() {
    return (
      <div>
        {/* <header className="bg-dark py-2">
          <div className="container px-4 px-lg-5 my-5">
            <h1 className="display-3 fw-bolder">
              <img
                src={require("./Assets/cheers.png")}
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
                <a className="text-primary" href="//">
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
        </header> */}

        <div className="jumbotron">
          <div className="container px-lg-5 my-2">
            <h1 className="display-3 text-warning">
              <img
                src={require("./Assets/carrot.png")}
                alt="logo"
                width="100"
                height="100"
              />{" "}
              Jazara Debuggers {""}
              <FaCopyright />
            </h1>
            <p>
              <FaUniversity />
              {""} Information Technology Engineering.
            </p>
            <p>
              <FaUniversity />
              {""} Damascus University.
            </p>
            <p>
              <FaUniversity />
              {""} Fourth Year - Networking.
            </p>
          </div>
        </div>

        <hr />
        <h1 className="mx-5 px-lg-5">
          <FaFlag />
          {""} Our Team
        </h1>
        <hr />

        <div className="container">
          <ul className="hash-list cols-4 cols-1-xs pad-30-all align-center text-sm">
            <li className="bg-dark">
              <img
                src={require("./Assets/avatar1.png")}
                className="wpx-100 img-round mgb-20"
                title=""
                alt=""
                data-edit="false"
                data-editor="field"
                data-field="src[Image Path]; title[Image Title]; alt[Image Alternate Text]"
              />
              <p className="fs-110 font-cond-l" contenteditable="false">
                Damascus University
                <p>4th Year</p>
                <h4>Yassar Hammami</h4>
                <ul className="social-icons social-icons-colored social-icons-circle m-t-50">
                  <li>
                    <a
                      href="https://facebook.com/yassarooo"
                      className="bg-facebook"
                    >
                      <FaFacebook />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://facebook.com/yassarooo"
                      className="bg-github"
                    >
                      <FaGithub />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://linkedin.com/yassarooo"
                      className="bg-linkedin"
                    >
                      <FaLinkedinIn />
                    </a>
                  </li>
                </ul>
              </p>
              <small
                className="font-cond case-u lts-sm fs-80 fg-text-l"
                contenteditable="false"
              >
                IT Student - Damascus,Syria
              </small>
            </li>
            <li className="bg-dark">
              <img
                src={require("./Assets/avatar2.png")}
                className="wpx-100 img-round mgb-20"
                title=""
                alt=""
                data-edit="false"
                data-editor="field"
                data-field="src[Image Path]; title[Image Title]; alt[Image Alternate Text]"
              />
              <p className="fs-110 font-cond-l" contenteditable="false">
                Damascus University
                <p>4th Year</p>
                <h4>Carol Hakimeh</h4>
                <ul className="social-icons social-icons-colored social-icons-circle m-t-50">
                  <li>
                    <a
                      href="https://facebook.com/yassarooo"
                      className="bg-facebook"
                    >
                      <FaFacebook />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://facebook.com/yassarooo"
                      className="bg-github"
                    >
                      <FaGithub />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://linkedin.com/yassarooo"
                      className="bg-linkedin"
                    >
                      <FaLinkedinIn />
                    </a>
                  </li>
                </ul>
              </p>
              <small
                className="font-cond case-u lts-sm fs-80 fg-text-l"
                contenteditable="false"
              >
                IT Student - Damascus,Syria
              </small>
            </li>
            <li className="bg-dark">
              <img
                src={require("./Assets/avatar3.png")}
                className="wpx-100 img-round mgb-20"
                title=""
                alt=""
                data-edit="false"
                data-editor="field"
                data-field="src[Image Path]; title[Image Title]; alt[Image Alternate Text]"
              />
              <p className="fs-110 font-cond-l" contenteditable="false">
                Damascus University
                <p>4th Year</p>
                <h4>Rama Khazna</h4>
                <ul className="social-icons social-icons-colored social-icons-circle m-t-50">
                  <li>
                    <a
                      href="https://facebook.com/yassarooo"
                      className="bg-facebook"
                    >
                      <FaFacebook />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://facebook.com/yassarooo"
                      className="bg-github"
                    >
                      <FaGithub />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://linkedin.com/yassarooo"
                      className="bg-linkedin"
                    >
                      <FaLinkedinIn />
                    </a>
                  </li>
                </ul>
              </p>
              <small
                className="font-cond case-u lts-sm fs-80 fg-text-l"
                contenteditable="false"
              >
                IT Student - Damascus,Syria
              </small>
            </li>
            <li className="bg-dark">
              <img
                src={require("./Assets/avatar4.png")}
                className="wpx-100 img-round mgb-20"
                title=""
                alt=""
                data-edit="false"
                data-editor="field"
                data-field="src[Image Path]; title[Image Title]; alt[Image Alternate Text]"
              />
              <p className="fs-110 font-cond-l" contenteditable="false">
                Damascus University
                <p>4th Year</p>
                <h4>Abdullah Baker</h4>
                <ul className="social-icons social-icons-colored social-icons-circle m-t-50">
                  <li>
                    <a
                      href="https://facebook.com/yassarooo"
                      className="bg-facebook"
                    >
                      <FaFacebook />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://github.com/Yassarooo"
                      className="bg-github"
                    >
                      <FaGithub />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://linkedin.com/yassarooo"
                      className="bg-linkedin"
                    >
                      <FaLinkedinIn />
                    </a>
                  </li>
                </ul>
              </p>
              <small
                className="font-cond case-u lts-sm fs-80 fg-text-l"
                contenteditable="false"
              >
                IT Student - Damascus,Syria
              </small>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
export default AboutUs;
