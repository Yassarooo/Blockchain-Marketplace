import React, { Component } from "react";
import "./style/App.css";
import "./style/Modal.css";
import Web3 from "web3";
import Marketplace from "../abis/Marketplace.json";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MyNavbar from "./MyNavbar";
import MyModal from "./MyModal";
import MyFooter from "./Footer";
import Main from "./Main";
import Products from "./Products";
import AddProduct from "./AddProduct";
import AboutUs from "./AboutUs";
import MyProducts from "./MyProducts";
import ProductDetails from "./ProductDetails";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

class App extends Component {
  constructor(props) {
    super(props);
    this.createProduct = this.createProduct.bind(this);
    this.purchaseProduct = this.purchaseProduct.bind(this);
    this.registerCustomer = this.registerCustomer.bind(this);
    this.handleModal = this.handleModal.bind(this);
    this.state = {
      showModal: false,
      account: "",
      customer: null,
      productCount: 0,
      customerCount: 0,
      products: [],
      addressLUT: [],
      customers: [],
      loading: true,
      successmessage: "",
    };
  }

  handleModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  registerCustomer(name) {
    this.handleModal();
    this.setState({
      loading: true,
    });
    this.state.marketplace.methods
      .registerCustomer(this.state.account, name)
      .send({
        from: this.state.account,
      })
      .once("receipt", (receipt) => {
        toast.success("Customer Registered Successfully !", {
          position: "bottom-right",
          closeOnClick: true,
        });
        this.setState({
          loading: false,
        });
      });
  }

  async componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  }

  async loadBlockchainData() {
    this.state.products = [];
    this.state.customers = [];
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    this.setState({
      account: accounts[0],
    });
    const networkId = await web3.eth.net.getId();
    const networkData = Marketplace.networks[networkId];
    if (networkData) {
      const marketplace = new web3.eth.Contract(
        Marketplace.abi,
        networkData.address
      );
      this.setState({
        marketplace,
      });
      const productCount = await marketplace.methods.productCount().call();
      this.setState({
        productCount,
      });
      const customerCount = await marketplace.methods.customerCount().call();
      this.setState({
        customerCount,
      });
      // Load products
      for (var i = 1; i <= productCount; i++) {
        const product = await marketplace.methods.products(i).call();
        this.setState({
          products: [...this.state.products, product],
        });
      }
      if (customerCount > 0) {
        for (var j = 1; j <= customerCount; j++) {
          const adr = await marketplace.methods.addressLUT(j).call();
          this.setState({
            addressLUT: [...this.state.addressLUT, adr],
          });
        }
        for (var k = 0; k < customerCount; k++) {
          const cust = await marketplace.methods
            .customers(this.state.addressLUT[k])
            .call();
          this.setState({
            customers: [...this.state.customers, cust],
          });
        }
      }
      if (
        this.state.addressLUT.find((element) => {
          return element === this.state.account;
        })
      ) {
        this.state.customer = await marketplace.methods
          .customers(this.state.account)
          .call();
      } else {
        this.handleModal();
      }
      this.setState({
        loading: false,
      });
    } else {
      window.alert("Marketplace contract not deployed to detected network.");
    }
  }

  createProduct(name, description, price, imgipfsHash, fileipfsHash) {
    this.setState({
      loading: true,
    });
    console.log(
      "name:",
      name + "desc:",
      description + "price:",
      price + "imgipfshash:",
      imgipfsHash + "fileipfshash:",
      fileipfsHash
    );
    this.state.marketplace.methods
      .createProduct(name, description, price, imgipfsHash, fileipfsHash)
      .send({
        from: this.state.account,
      })
      .once("receipt", (receipt) => {
        this.setState({
          loading: false,
          successmessage: "Product Added Successfully !",
        });
        toast.success("Product Added Successfully !", {
          position: "bottom-right",
          closeOnClick: true,
        });
        this.loadBlockchainData();
      });
  }

  purchaseProduct(id, price) {
    this.setState({
      loading: true,
    });
    this.state.marketplace.methods
      .purchaseProduct(id)
      .send({
        from: this.state.account,
        value: price,
      })
      .once("receipt", (receipt) => {
        this.setState({
          loading: false,
        });
        toast.success("Product Purchased Successfully !", {
          position: "bottom-right",
          closeOnClick: true,
        });
        window.location.reload();
      });
  }

  ProductRoutesGenerator = () => {
    return this.state.products.map((product) => {
      return (
        <Route
          exact
          path={`/product/${product.id}`}
          key={product.id}
          children={
            <ProductDetails
              product={product}
              account={this.state.account}
              products={this.state.products}
              purchaseProduct={this.purchaseProduct}
            />
          }
        />
      );
    });
  };

  render() {
    return (
      <Router>
        <MyNavbar
          loading={this.state.loading}
          account={this.state.account}
          products={this.state.products}
          createProduct={this.state.createProduct}
          purchaseProduct={this.state.purchaseProduct}
        />
        <MyModal
          showModal={this.state.showModal}
          handleModal={this.handleModal}
          registerCustomer={this.registerCustomer}
        />
        <Switch>
          <Route exact path="/">
            <Main
              account={this.state.account}
              products={this.state.products}
              createProduct={this.createProduct}
              purchaseProduct={this.purchaseProduct}
              customer={this.state.customer}
            />
          </Route>
          <Route path="/aboutus">
            <AboutUs
              account={this.state.account}
              customer={this.state.customer}
            />
          </Route>
          <Route path="/myproducts">
            <MyProducts
              account={this.state.account}
              products={this.state.products}
            />
          </Route>
          <Route path="/products">
            <Products
              account={this.state.account}
              products={this.state.products}
              purchaseProduct={this.purchaseProduct}
              history={this.state.history}
            />
          </Route>
          <Route path="/addproduct">
            <AddProduct
              createProduct={this.createProduct}
              successmessage={this.state.successmessage}
            />
          </Route>
          {this.ProductRoutesGenerator()}
        </Switch>

        <MyFooter />
      </Router>
    );
  }
}

export default App;
