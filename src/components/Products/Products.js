import React, { Component } from "react";
import "./Products.css";
import { Row, Col, Pagination, Button } from "react-bootstrap";
import { FaEthereum, FaChevronDown, FaSearch, FaEye } from "react-icons/fa";
import { Categories, Colors } from "../Categories";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import { Link } from "react-router-dom";

class Products extends Component {
  constructor() {
    super();
    this.state = {
      currentPage: 1,
      productsPerPage: 8,
      currentCats: [],
      searchText: "",
      max: 20,
      cheapest: false,
      latest: true,
    };
    this.rangeSelector = this.rangeSelector.bind(this);
    this.handleMaxChange = this.handleMaxChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  rangeSelector = (event, newValue) => {
    console.log(newValue);
    this.setState({ max: newValue });
  };

  handleMaxChange(event) {
    console.log("change", event.target.value);
    this.setState({ max: Number(event.target.value) });
  }

  handleClick(event) {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    if (event.target.id === "prev") {
      this.setState({
        currentPage: Number(this.state.currentPage - 1),
      });
    }
    if (event.target.id === "next") {
      this.setState({
        currentPage: Number(this.state.currentPage + 1),
      });
    } else {
      this.setState({
        currentPage: Number(event.target.id),
      });
    }
  }

  handleChange(event) {
    console.log("change", event.target.value);
    this.setState({ searchText: event.target.value });
  }

  handleCheck(event) {
    if (event.target.checked) {
      this.setState({
        currentCats: [...this.state.currentCats, event.target.name],
        currentPage: 1,
      });
    } else {
      this.setState({
        currentCats: this.state.currentCats.filter(function (cat) {
          return cat !== event.target.name;
        }),
        currentPage: 1,
      });
    }
  }

  handleSearch(event) {
    event.preventDefault();
    console.log("Searching...");
  }

  handleSelect(event) {
    event.preventDefault();
    console.log("Selected...", event.target.name);
  }

  renderCards(product, index) {
    return (
      <Col md="3" className="pt-3" key={index}>
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
            alt="..."
          />
          <div className="card-body bg-dark pb-0 mb-0">
            <div className="text-center">
              <h2 href={`/product/${product.id}`}>{product.name}</h2>
              <h3 className="text-warning">
                <FaEthereum className="text-primary pl-0 pr-2" />
                {window.web3.utils.fromWei(
                  product.price.toString(),
                  "Ether"
                )}{" "}
                Eth
              </h3>
            </div>
          </div>
          <div className="card-footer pb-3 pt-0 border-top-0 bg-dark">
            <div className="text-center ">
              <Link to={"/product/" + product.id}>
                <Button
                  className="btn btn-outline-light btn-dark stretched-link"
                  name={product.id}
                  value={product.price}
                >
                  More Details {""}
                  <FaEye className="text-warning" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Col>
    );
  }

  render() {
    const indexOfLastProduct =
      this.state.currentPage * this.state.productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - this.state.productsPerPage;
    const filteredProducts = this.props.products
      .filter((product) =>
        this.state.currentCats.length !== 0
          ? this.state.currentCats.includes(product.categorie)
          : true
      )
      .filter((product) =>
        this.state.searchText !== ""
          ? product.name
              .toLowerCase()
              .includes(this.state.searchText.toLowerCase()) ||
            product.description
              .toLowerCase()
              .includes(this.state.searchText.toLowerCase())
          : true
      )
      .filter(
        (product) =>
          Number(window.web3.utils.fromWei(product.price.toString(), "Ether")) <
          Number(this.state.max)
      )
      .reverse();

    const currentProducts = filteredProducts.slice(
      indexOfFirstProduct,
      indexOfLastProduct
    );

    const pageNumbers = [];
    for (
      let i = 1;
      i <= Math.ceil(filteredProducts.length / this.state.productsPerPage);
      i++
    ) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map((number) => {
      return (
        <Pagination.Item
          id={number}
          key={number}
          active={number === this.state.currentPage}
          onClick={this.handleClick}
        >
          {number}
        </Pagination.Item>
      );
    });

    return (
      <div>
        <section className="section-content pt-4 px-3">
          <div className="row">
            <aside className="col-md-3">
              <div className="card bg-dark">
                <article className="filter-group">
                  <header className="card-header">
                    <span
                      href="#"
                      data-toggle="collapse"
                      data-target="#collapse_1"
                      aria-expanded="true"
                      className=""
                    >
                      <FaChevronDown className="float-right text-warning"></FaChevronDown>
                      <h6 className="title text-warning">Product type</h6>
                    </span>
                  </header>
                  <div className="filter-content collapse show" id="collapse_1">
                    <div className="card-body">
                      <form className="pb-3" onSubmit={this.handleSearch}>
                        <div className="input-group">
                          <input
                            type="text"
                            className="form-control"
                            onChange={this.handleChange}
                            placeholder="Search"
                          />
                          <div className="input-group-append">
                            <Button
                              className="btn btn-warning"
                              type="button"
                              onClick={this.onSearch}
                            >
                              <FaSearch />
                            </Button>
                          </div>
                        </div>
                      </form>

                      <ul className="list-menu text-white">
                        <li>
                          <a href="##">Tech </a>
                        </li>
                        <li>
                          <a href="//">Games</a>
                        </li>
                        <ul>
                          <li>
                            <a href="##">PC Games </a>
                          </li>
                          <li>
                            <a href="##">PS4 Games </a>
                          </li>
                          <li>
                            <a href="##">Xbox Games </a>
                          </li>
                        </ul>
                        <li>
                          <a href="##">Books & PDF </a>
                        </li>
                        <li>
                          <a href="##">Movies </a>
                        </li>
                        <li>
                          <a href="##">Courses </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </article>
                <article className="filter-group">
                  <header className="card-header">
                    <a
                      href="##"
                      data-toggle="collapse"
                      data-target="#collapse_2"
                      aria-expanded="true"
                      className=""
                    >
                      <FaChevronDown className="float-right text-warning"></FaChevronDown>
                      <h6 className="title text-warning">Categories </h6>
                    </a>
                  </header>
                  <div className="filter-content collapse show" id="collapse_2">
                    <div className="card-body">
                      <label className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          name="0"
                          onChange={this.handleCheck}
                          className="custom-control-input"
                        />
                        <div className="custom-control-label">
                          Tech
                          <b className="badge badge-pill badge-light float-right">
                            120
                          </b>{" "}
                        </div>
                      </label>
                      <label className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          name="1"
                          onChange={this.handleCheck}
                          className="custom-control-input"
                        />
                        <div className="custom-control-label">
                          PC
                          <b className="badge badge-pill badge-light float-right">
                            15
                          </b>{" "}
                        </div>
                      </label>
                      <label className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          name="2"
                          onChange={this.handleCheck}
                          className="custom-control-input"
                        />
                        <div className="custom-control-label">
                          PS4 Games
                          <b className="badge badge-pill badge-light float-right">
                            35
                          </b>{" "}
                        </div>
                      </label>
                      <label className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          name="3"
                          onChange={this.handleCheck}
                          className="custom-control-input"
                        />
                        <div className="custom-control-label">
                          Xbox Games
                          <b className="badge badge-pill badge-light float-right">
                            89
                          </b>{" "}
                        </div>
                      </label>
                      <label className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          name="4"
                          onChange={this.handleCheck}
                          className="custom-control-input"
                        />
                        <div className="custom-control-label">
                          Movies
                          <b className="badge badge-pill badge-light float-right">
                            30
                          </b>{" "}
                        </div>
                      </label>
                      <label className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          name="5"
                          onChange={this.handleCheck}
                          className="custom-control-input"
                        />
                        <div className="custom-control-label">
                          Courses
                          <b className="badge badge-pill badge-light float-right">
                            30
                          </b>{" "}
                        </div>
                      </label>
                      <label className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          name="6"
                          onChange={this.handleCheck}
                          className="custom-control-input"
                        />
                        <div className="custom-control-label">
                          Books
                          <b className="badge badge-pill badge-light float-right">
                            30
                          </b>{" "}
                        </div>
                      </label>
                      <label className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          name="7"
                          onChange={this.handleCheck}
                          className="custom-control-input"
                        />
                        <div className="custom-control-label">
                          Audio Books
                          <b className="badge badge-pill badge-light float-right">
                            30
                          </b>{" "}
                        </div>
                      </label>
                      <label className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          name="8"
                          onChange={this.handleCheck}
                          className="custom-control-input"
                        />
                        <div className="custom-control-label">
                          Images
                          <b className="badge badge-pill badge-light float-right">
                            30
                          </b>{" "}
                        </div>
                      </label>
                      <label className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          name="9"
                          onChange={this.handleCheck}
                          className="custom-control-input"
                        />
                        <div className="custom-control-label">
                          Videos
                          <b className="badge badge-pill badge-light float-right">
                            30
                          </b>{" "}
                        </div>
                      </label>
                      <label className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          name="10"
                          onChange={this.handleCheck}
                          className="custom-control-input"
                        />
                        <div className="custom-control-label">
                          Other
                          <b className="badge badge-pill badge-light float-right">
                            30
                          </b>{" "}
                        </div>
                      </label>
                    </div>
                  </div>
                </article>
                <article className="filter-group">
                  <header className="card-header">
                    <a
                      href="##"
                      data-toggle="collapse"
                      data-target="#collapse_3"
                      aria-expanded="true"
                      className=""
                    >
                      <FaChevronDown className="float-right text-warning"></FaChevronDown>
                      <h6 className="title text-warning">Price range </h6>
                    </a>
                  </header>
                  <div className="filter-content collapse show" id="collapse_3">
                    <div className="card-body">
                      <Typography id="range-slider" gutterBottom>
                        Select Max Price:
                      </Typography>
                      <Slider
                        value={this.state.max}
                        onChange={this.rangeSelector}
                        step={0.01}
                        max={20}
                        valueLabelDisplay="auto"
                        aria-labelledby="range-slider"
                      />
                      <div className="form-row">
                        <div className="form-group col-md-6">
                          <input
                            value={this.state.max}
                            onChange={this.handleMaxChange}
                            className="form-control"
                            placeholder="1,0000 Eth"
                            type="number"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            </aside>
            <main className="col-md-9 pr-4">
              <header className="border-bottom mb-2 pb-3">
                <div className="form-inline">
                  <span className="mr-md-auto">
                    {filteredProducts.length.toString()} Items found{" "}
                  </span>
                  <select className="mr-0 form-control bg-dark">
                    <option name="latest" onSelect={this.handleSelect}>
                      Latest items
                    </option>
                    <option>Trending</option>
                    <option>Most Popular</option>
                    <option>Cheapest</option>
                  </select>
                </div>
              </header>

              <Row>{currentProducts.map(this.renderCards)}</Row>
              <Pagination id="page-numbers" className="pt-4">
                <Pagination.Item
                  id="prev"
                  key="prev"
                  onClick={this.handleClick}
                  disabled={this.state.currentPage === 1}
                >
                  prev
                </Pagination.Item>
                {renderPageNumbers}
                <Pagination.Item
                  id="next"
                  key="next"
                  onClick={this.handleClick}
                  disabled={this.state.currentPage === pageNumbers.length}
                >
                  next
                </Pagination.Item>
              </Pagination>
            </main>
          </div>
        </section>
      </div>
    );
  }
}
export default Products;
