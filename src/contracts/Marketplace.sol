//buyer w purchasedProduct
// SPDX-License-Identifier: MIT
pragma solidity  ^0.8.0;

contract Marketplace {
    //string public name;
    uint public productCount = 0;
    uint public customerCount = 0;
    //to store the products on blockchain
    bool public flag = false;
    mapping(uint => Product) public products;
    //mapping(uint => uint[]) public productsRates;
    //mapping(uint => string[]) public productsReviews;
    mapping(Categories => uint[]) public categorieToProduct;
    //to store the customers on blockchain
    mapping(address  => Customer) public customers;
    mapping(uint => address) public addressLUT;
    mapping(uint => string) public files;
    uint256 MAXREPORT = 100;
    
    enum Categories {
        Tech,
        PCGames,
        PS4Games,
        XboxGames,
        Movies,
        Courses,
        Books,
        AudioBooks,
        Images,
        Videos,
        Other
    }
    struct Review{
        bool isBuy;
        bool isReview;
        string reviewDescription;
        uint256 score;
        uint timeStamp;
    }
    struct Customer {
        address adr;
        string name;
        uint256[] ownedProducts;
        uint256[] purchasedProducts;
        Cart cart;
        
    }

    struct Cart {
      uint256[] products;
      uint256 completeSum;
    }

    struct Product {
        uint id;
        string name;
        string description;
        uint price;
        string imgipfshash;
        address owner;
        Categories categorie;
        uint256 uploadedOn;
        //uint256 rate;
        uint256 reviewsCount;
        address[] buyers;
        uint256 totalSold;
        Review [] reviews;
        mapping (uint=>address) raters; //address of reviewers
        mapping (address=>Review) productUserReview;
        mapping (address => bool)hasReported;
        uint report;
        //bool removed;
    }

    event ProductCreated(uint id, string name, string description, uint price, string imgipfshash, string fileipfshash, address owner);
    event ProductPurchased(uint id, string name, string description, uint price, string imgipfshash, address owner);
    event CustomerRegistered(address customer);
    event CustomerRegistrationFailed(address customer);
    event CartProductInserted(address customer, uint256 prodId, uint256 prodPrice, uint256 completeSum);
    event CartProductInsertionFailed(address customer, uint256 prodId);
    event CartProductRemoved(address customer, uint256 prodId);
    event CartEmptied(address customer);

    // Create a new product with a struct
    // Add the struct to the mapping, and store it on the blockchain
    // Trigger an event that lets someone know a product was creatd
    function createProduct(string memory _name,string memory _description, uint _price,string memory _imgipfshash,string memory _fileipfshash , Categories _categorie ) public {
        // Require a valid name
        require(bytes(_name).length > 0);
        // Require a valid description
        require(bytes(_description).length > 0);
        // Require a valid price
        require(_price > 0);
        // Require a valid image hash
        require(bytes(_imgipfshash).length > 0);
        // Require a valid file hash
        require(bytes(_fileipfshash).length > 0);
        // Increment product count
        uint256 _uploadedOn = block.timestamp;
        //increment number of products
        productCount ++;
        //add this Product to the products map
        products[productCount].id = productCount;
        products[productCount].name = _name;
        products[productCount].description = _description;
        products[productCount].price = _price;
        products[productCount].imgipfshash = _imgipfshash;
        files[productCount] = _fileipfshash;
        products[productCount].owner = msg.sender;
        products[productCount].categorie = _categorie;
        products[productCount].uploadedOn = _uploadedOn;
        products[productCount].reviewsCount = 0;
        products[productCount].report = 0;
        products[productCount].totalSold = 0;
        products[productCount].buyers = new address[](0);
        //products[productCount].removed = false;
        //add this product to it's categorie
        categorieToProduct[_categorie].push(productCount);
        //add this product to the customer's owned product
        customers[msg.sender].ownedProducts.push(productCount);
        //create an event
        emit ProductCreated(productCount, _name, _description, _price, _imgipfshash,_fileipfshash, msg.sender);
    }

    function purchaseProduct(uint _id) public payable {
        // Fetch the owner
        address _seller = products[_id].owner;
        /*require(products[_id].owner != msg.sender, "You cannot buy your own product");
        // Make sure the product has a valid id
        require(products[_id].id > 0 && products[_id].id <= productCount);
        // Require that there is enough Ether in the transaction
        require(msg.value >= products[_id].price, "Insufficient Ether");
        // Require that the buyer is not the seller
        require(_seller != msg.sender);*/
        //add to products a user can revie
        products[_id].productUserReview[msg.sender].isBuy = true;
        //add this customer to the people who bought this product
        products[_id].buyers.push(msg.sender);
        //update total purchases
        products[_id].totalSold++;
        //add to the products owners
        customers[msg.sender].purchasedProducts.push(_id);
        // Pay the seller by sending them Ether
        payable(_seller).transfer(msg.value);
        // Trigger an event
        emit ProductPurchased(productCount, products[_id].name,products[_id].description, products[_id].price, products[_id].imgipfshash, msg.sender);
    }
    /* function removeProduct(uint id1) public {
         if(msg.sender == products[id1].owner){
             products[id1].removed = true;
         }
     }*/
        function removeProduct(uint id1) public {
        if(msg.sender == products[id1].owner){
            delete products [id1];
            Categories cat;
            cat = products[id1].categorie;
            delete categorieToProduct[cat][id1-1];
            address add = products[id1].raters[products[id1].reviewsCount];
            delete products[id1].raters[products[id1].reviewsCount];
            delete products[id1].productUserReview[add];
            for(uint i=0;i<productCount;i++){
                if(customers[msg.sender].ownedProducts[i] == id1){
                    delete customers[msg.sender].ownedProducts[i];
                }
            }
        }
    }
    function editProduct(uint256 _id , string memory _name , string memory _des , uint _price , Categories _categorie) public{
        if(msg.sender == products[_id].owner){
            products[_id].name = _name;
            products[_id].description = _des;
            products[_id].price = _price;
            products[_id].categorie = _categorie;
            
        }
    }
    function reviewProduct(uint _id,uint256 _rate,uint256 _score, string memory _review) public
    {
           require(products[_id].productUserReview[msg.sender].isBuy == true, "You are not eligible to review this product");
           if (products[_id].productUserReview[msg.sender].isReview == false){ //only once
               products[_id].productUserReview[msg.sender].isReview = true;
               //should update rate
               products[_id].productUserReview[msg.sender].reviewDescription = _review;
               products[_id].productUserReview[msg.sender].score = _score;
               products[_id].productUserReview[msg.sender].timeStamp = block.timestamp;
    
               products[_id].raters[products[_id].reviewsCount] = msg.sender;
                  products[_id].reviews.push(products[_id].productUserReview[msg.sender]);
    
               products[_id].reviewsCount ++;
           }

    }

    /*function insertProductIntoCart(uint256 id) public returns (bool success,
                                                  uint256 pos_in_prod_mapping) {
        Customer storage cust = customers[msg.sender];
        Product memory prod = products[id];
        uint256 prods_prev_len = cust.cart.products.length;
        cust.cart.products.push(prod.id);
        uint256 current_sum = cust.cart.completeSum;
        cust.cart.completeSum = current_sum + prod.price;
        if (cust.cart.products.length > prods_prev_len) {
          emit CartProductInserted(msg.sender, id, prod.price, cust.cart.completeSum);
          return (true, cust.cart.products.length - 1);
        }
        emit CartProductInsertionFailed(msg.sender, id);
        return (false, 0);
    }*/

    /*function removeProductFromCart(uint256 prod_pos_in_mapping) public {
        uint256[] memory new_product_list = new uint256[](customers[msg.sender]
                                                    .cart.products.length - 1);
        uint256[] memory customerProds = customers[msg.sender].cart.products;
        for (uint256 i = 0; i < customerProds.length; i++) {
          if (i != prod_pos_in_mapping) {
            new_product_list[i] = customerProds[i];
          } else {
            customers[msg.sender].cart.completeSum -=
                                               products[customerProds[i]].price;
            emit CartProductRemoved(msg.sender, customerProds[i]);
          }
        }
        customers[msg.sender].cart.products = new_product_list;
    }
*/
    /*function emptyCart() public returns (bool success) {
        Customer storage customer = customers[msg.sender];
        customer.cart = Cart(new uint256[](0), 0);
        emit CartEmptied(customer.adr);
        return true;
    }
*/
    function registerCustomer(address _address, string memory _name)
                                        public returns (bool success) {
        Customer memory customer = Customer(_address, _name,new uint256[](0),new uint256[](0),Cart(new uint256[](0),0));
        customerCount++;
        addressLUT[customerCount]=customer.adr;
        customers[_address] = customer;
        emit CustomerRegistered(_address);
        return true;
    }
    function report(uint _id) public {
        if(products[_id].hasReported[msg.sender] == false){
            products[_id].report++;
            products[_id].hasReported[msg.sender] = true;
            if(products[_id].report >= MAXREPORT){
                removeProduct(_id);
            }
        }
    }
    function getReport(uint _id) public view returns(uint){
        return products[_id].report;
    }

    function getProductReviews(uint _id) public view returns (Review[] memory){
        return products[_id].reviews;
    }
    function getProductBuyers(uint _id) public view returns(address[] memory){
        return products[_id].buyers;
    }
    function getProductfile(uint _id) public view returns(string memory){
        if(products[_id].owner == msg.sender){
            return files[_id];
        }
        else if(products[_id].buyers.length > 0)
        for(uint i=0;i<products[_id].buyers.length;i++){
            if(products[_id].buyers[i] == msg.sender)
                return files[_id];
        }
        else
        return "";
    }
    function getPurchasedProducts(address adr) public view returns( uint256[] memory){
        return customers[adr].purchasedProducts;
    }

}