import React, { Component } from "react";
import "./App.css";
import Web3 from "web3";
import Marketplace from "../abis/Marketplace.json";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MyNavbar from "./Navbar/MyNavbar";
import MyFooter from "./Footer/MyFooter";
import Products from "./Products/Products";
import AddProduct from "./AddProduct/AddProduct";
import EditProduct from "./EditProduct/EditProduct";
import AboutUs from "./AboutUs/AboutUs";
import MyProducts from "./MyProducts/MyProducts";
import TestPage from "./Products/Products";
import ProductDetails from "./ProductDetails/ProductDetails";
import RegisterModal from "./RegisterModal/RegisterModal";
import Home from "./Home/Home";
import GenericNotFound from "./404/404";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "font-awesome/css/font-awesome.min.css";
import * as tf from "@tensorflow/tfjs";
toast.configure();

//Model and metadata URL
const url = {
  model:
    "https://storage.googleapis.com/tfjs-models/tfjs/sentiment_cnn_v1/model.json",
  metadata:
    "https://storage.googleapis.com/tfjs-models/tfjs/sentiment_cnn_v1/metadata.json",
};

class App extends Component {
  constructor(props) {
    super(props);
    this.loadBlockchainData = this.loadBlockchainData.bind(this);
    this.handleRegisterModal = this.handleRegisterModal.bind(this);
    this.handleLoading = this.handleLoading.bind(this);
    this.handleSection = this.handleSection.bind(this);
    this.checkProductPurchase = this.checkProductPurchase.bind(this);
    this.generateRecommended = this.generateRecommended.bind(this);
    this.loadModel = this.loadModel.bind(this);
    this.loadMetadata = this.loadMetadata.bind(this);
    this.generateScore = this.generateScore.bind(this);
    this.state = {
      model: null,
      metadata: null,
      showModal: false,
      account: "",
      customer: null,
      productCount: 0,
      customerCount: 0,
      products: [],
      filteredProducts: [],
      recommendedProducts: [],
      purchasedProducts: [],
      customerReviews: [],
      loading: true,
      section: "bestseller",
    };
  }

  async loadModel(url) {
    try {
      const model = await tf.loadLayersModel(url.model);
      this.setState({
        model: model,
      });
    } catch (err) {
      console.log(err);
    }
  }

  async loadMetadata(url) {
    try {
      const metadataJson = await fetch(url.metadata);
      const metadata = await metadataJson.json();
      this.setState({
        metadata: metadata,
      });
    } catch (err) {
      console.log(err);
    }
  }
  handleLoading() {
    this.setState({
      loading: !this.state.loading,
    });
  }
  handleRegisterModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  handleSection(value) {
    this.setState({
      section: value,
    });
    if (value === "latest") {
      this.setState({
        filteredProducts: this.state.products.filter(
          (product) => product.removed === "0"
        ),
      });
    } else if (value === "cheapest") {
      this.setState({
        filteredProducts: this.state.filteredProducts.sort((a, b) =>
          b.price > a.price ? 1 : -1
        ),
      });
    } else if (value === "bestseller") {
      this.setState({
        filteredProducts: this.state.filteredProducts.sort((a, b) =>
          a.totalSold > b.totalSold ? 1 : -1
        ),
      });
    } else if (value === "trending") {
      this.setState({
        filteredProducts: this.state.filteredProducts.sort((a, b) =>
          a.reviewsCount > b.reviewsCount ? 1 : -1
        ),
      });
    } else if (value === "popular") {
      this.setState({
        filteredProducts: this.state.filteredProducts.sort((a, b) =>
          a.rate > b.rate ? 1 : -1
        ),
      });
    }
  }

  checkProductPurchase(id) {
    if (
      this.state.purchasedProducts.find((prod) => {
        return prod.id === id;
      })
    ) {
      return true;
    } else {
      return false;
    }
  }

  async generateScore(review) {
    const inputText = review
      .trim()
      .toLowerCase()
      .replace(/(\.|\,|\!)/g, "")
      .split(" ");
    const OOV_INDEX = 2;
    const sequence = inputText.map((word) => {
      let wordIndex =
        this.state.metadata.word_index[word] + this.state.metadata.index_from;
      if (wordIndex > this.state.metadata.vocabulary_size) {
        wordIndex = OOV_INDEX;
      }
      return wordIndex;
    });

    //Fix the sequence into fix length (truncation and padding) via a padSequences function
    const PAD_INDEX = 0;
    const padSequences = (
      sequences,
      maxLen,
      padding = "pre",
      truncating = "pre",
      value = PAD_INDEX
    ) => {
      return sequences.map((seq) => {
        if (seq.length > maxLen) {
          if (truncating === "pre") {
            seq.splice(0, seq.length - maxLen);
          } else {
            seq.splice(maxLen, seq.length - maxLen);
          }
        }
        if (seq.length < maxLen) {
          const pad = [];
          for (let i = 0; i < maxLen - seq.length; ++i) {
            pad.push(value);
          }
          if (padding === "pre") {
            seq = pad.concat(seq);
          } else {
            seq = seq.concat(pad);
          }
        }
        return seq;
      });
    };
    const paddedSequence = padSequences(
      [sequence],
      this.state.metadata.max_len
    );

    //Lastly, convert the paddedSequence into our tensor2D matrix
    const input = tf.tensor2d(paddedSequence, [1, this.state.metadata.max_len]);

    const predictOut = this.state.model.predict(input);
    const score = predictOut.dataSync()[0];
    predictOut.dispose();

    return score;
  }

  generateRecommended() {
    const sorted = this.state.customerReviews.sort((a, b) =>
      a.score > b.score ? 1 : -1
    );

    sorted.forEach((e) => {
      const cat = this.state.filteredProducts.find((product) => {
        return product.id === e.pid;
      }).categorie;

      this.state.filteredProducts
        .filter((product) => {
          return product.categorie === cat && product.id !== e.pid;
        })
        .slice(0, 4)
        .forEach((el) => {
          this.setState({
            recommendedProducts: [...this.state.recommendedProducts, el],
          });
        });
    });
    console.log(this.state.recommendedProducts.length);
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
    this.setState({
      loading: true,
    });
    tf.ready().then(() => {
      this.loadModel(url);
      this.loadMetadata(url);
    });
    this.state.products = [];
    this.state.recommendedProducts = [];
    this.state.purchasedProducts = [];
    this.state.customerReviews = [];
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
      this.setState({
        filteredProducts: this.state.products.filter(
          (product) => product.removed === "0"
        ),
      });
      this.handleSection(this.state.section);
      const hasregistered = await marketplace.methods
        .hasRegistered(accounts[0])
        .call();
      if (hasregistered) {
        console.log("registered");
        this.setState({
          customer: await marketplace.methods
            .customers(this.state.account)
            .call(),
        });

        //load purchased products
        const purchased = await marketplace.methods
          .getPurchasedProducts(this.state.account)
          .call();
        purchased.forEach((e) => {
          const prod = this.state.products.find((product) => {
            return product.id === e;
          });
          this.setState({
            purchasedProducts: [...this.state.purchasedProducts, prod],
          });
        });

        //load all customer reviews
        const customerReviews = await marketplace.methods
          .getUserReviews(this.state.account)
          .call();
        customerReviews.forEach((e) => {
          this.setState({
            customerReviews: [...this.state.customerReviews, e],
          });
        });

        //generate recommended products
        this.generateRecommended();
      } else {
        console.log("unregistered");
        this.handleRegisterModal();
      }
      this.setState({
        loading: false,
      });
    } else {
      window.alert("Marketplace contract not deployed to detected network.");
    }
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
              products={this.state.products.filter(
                (product) => product.removed !== "2"
              )}
              account={this.state.account}
              reviewProduct={this.reviewProduct}
              generateScore={this.generateScore}
              checkProductPurchase={this.checkProductPurchase}
              marketplace={this.state.marketplace}
              handleLoading={this.handleLoading}
              loadBlockchainData={this.loadBlockchainData}
            />
          }
        />
      );
    });
  };

  EditProductRoutesGenerator = () => {
    return this.state.products.map((product) => {
      return (
        <Route
          exact
          path={`/product/edit/${product.id}`}
          key={product.id}
          children={
            <EditProduct
              product={product}
              account={this.state.account}
              handleLoading={this.handleLoading}
              marketplace={this.state.marketplace}
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
          customer={this.state.customer}
        />
        <RegisterModal
          showModal={this.state.showModal}
          handleRegisterModal={this.handleRegisterModal}
          marketplace={this.state.marketplace}
          account={this.state.account}
          handleLoading={this.handleLoading}
          loadBlockchainData={this.loadBlockchainData}
        />
        <Switch>
          <Route exact path="/">
            <Home account={this.state.account} customer={this.state.customer} />
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
              products={this.state.products.filter(
                (product) => product.removed !== "2"
              )}
              marketplace={this.state.marketplace}
              purchasedProducts={this.state.purchasedProducts}
              handleLoading={this.handleLoading}
              loadBlockchainData={this.loadBlockchainData}
            />
          </Route>
          <Route path="/products">
            <Products
              account={this.state.account}
              products={this.state.filteredProducts}
              handleSection={this.handleSection}
              checkProductPurchase={this.checkProductPurchase}
              loading={this.state.loading}
              section={this.state.section}
              recommendedProducts={this.state.recommendedProducts}
            />
          </Route>
          <Route path="/addproduct">
            <AddProduct
              handleLoading={this.handleLoading}
              marketplace={this.state.marketplace}
              loadBlockchainData={this.loadBlockchainData}
              products={this.state.products}
              account={this.state.account}
            />
          </Route>
          <Route path="/test">
            <TestPage
              account={this.state.account}
              products={this.state.products}
              purchaseProduct={this.purchaseProduct}
            />
          </Route>
          {this.ProductRoutesGenerator()}
          {this.EditProductRoutesGenerator()}
          <Route component={GenericNotFound} />
        </Switch>

        <MyFooter />
      </Router>
    );
  }
}

export default App;
