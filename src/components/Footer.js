import React, { Component } from "react";
import { FaHeart } from "react-icons/fa";

class MyFooter extends Component {
  render() {
    return (
      <footer className="text-center pb-3 pt-5 fixed-bottom">
        Copyright &copy;2021 | Designed With{" "}
        <FaHeart style={{ color: "red" }}></FaHeart> by{" "}
        <a className="text-warning" href="#/aboutus">
          Jazara Debuggers
        </a>
      </footer>
    );
  }
}
export default MyFooter;