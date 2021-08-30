import React, { Component } from "react";
import { FaHeart } from "react-icons/fa";
import "./MyFooter.css";

class MyFooter extends Component {
  render() {
    return (
      <footer className="text-center pb-3 pt-0 mt-5">
        Copyright &copy;2021 | Designed With{" "}
        <FaHeart style={{ color: "red" }}></FaHeart> by{" "}
        <a className="text-warning" href="/aboutus">
          Jazara Debuggers
        </a>
      </footer>
    );
  }
}
export default MyFooter;
