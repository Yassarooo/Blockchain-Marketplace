import React, { Component } from "react";

class AboutUs extends Component {
  render() {
    return (
      <div>
        <header className="bg-dark py-2">
          <div className="container px-4 px-lg-5 my-5">
            <h1 className="display-3 fw-bolder">
              <img
                src={require("./cheers.png")}
                alt=""
                width="100"
                height="100"
              />{" "}
              Welcome,{" "}
              <li className="text-primary">
                {this.props.account.substring(0, 9)}
              </li>
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
                <a className="text-success" href="//">
                  {" "}
                  jazaradebuggers@gmail.com
                </a>
              </p>
            </div>
          </div>
        </header>
      </div>
    );
  }
}
export default AboutUs;
