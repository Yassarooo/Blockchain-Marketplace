// if purchased w bdi 27zfa
// SPDX-License-Identifier: MIT
pragma solidity  ^0.8.0;

contract Marketplace {
    //string public name;
    uint public productCount = 0;
    uint public customerCount = 0;
    //to store the products on blockchain
    bool public flag = false;
    mapping(uint => Product) public products;
    mapping(Categories => uint[]) public categorieToProduct;
    //to store the customers on blockchain
    mapping(address  => Customer) public customers;
    mapping(uint => address) public addressLUT;
    uint[] public emptySpaces;
    uint public len; 
    uint public ftt = 0;
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
        string fileipfshash;
        address owner;
        Categories categorie;
        uint256 uploadedOn;
        uint256 rate;
        uint256 reviewsCount;
        Customer[] buyers;
        Review [] reviews;
        mapping (uint=>address) raters; //address of reviewers
        mapping (address=>Review) productUserReview;
    }

    event ProductCreated(uint id, string name, string description, uint price, string imgipfshash, string fileipfshash, address owner, bool purchased);
    event ProductPurchased(uint id, string name, string description, uint price, string imgipfshash, string fileipfshash, address owner, bool purchased);
    event CustomerRegistered(address customer);
    event CustomerRegistrationFailed(address customer);
    event CartProductInserted(address customer, uint256 prodId, uint256 prodPrice, uint256 completeSum);
    event CartProductInsertionFailed(address customer, uint256 prodId);
    event CartProductRemoved(address customer, uint256 prodId);
    event CartEmptied(address customer);

    function createProduct(string memory _name,string memory _description, uint _price,string memory _imgipfshash,string memory _fileipfshash , Categories _categorie ) public {
        
        uint256 _uploadedOn = block.timestamp;
                productCount ++;
                products[productCount].name = _name;
                products[productCount].description = _description;
                products[productCount].price = _price;
                products[productCount].imgipfshash = _imgipfshash;
                products[productCount].fileipfshash = _fileipfshash;
                products[productCount].owner = msg.sender;
                products[productCount].categorie = _categorie;
                products[productCount].uploadedOn = _uploadedOn;
                products[productCount].rate = 0;

                categorieToProduct[_categorie].push(productCount);

                customers[msg.sender].ownedProducts.push(productCount);

            emit ProductCreated(productCount, _name, _description, _price, _imgipfshash,_fileipfshash, msg.sender, false);
        
            emptySpaces.push(id1);
        }
    }

    function purchaseProduct(uint _id) public payable {
        
        require(products[_id].owner != msg.sender, "You cannot buy your own product");
        require (msg.value >= products[_id].price , "Insufficient Ether");

        // Fetch the product
        Product storage _product = products[_id];
        // Fetch the owner
        address _seller = _product.owner;
        
        products[_id].owner = msg.sender;
        products[_id].productUserReview[msg.sender].isBuy = true;
        // Mark as purchased
        //purchasedProducts[_id].push(_product);
        products[_id].buyers.push(customers[msg.sender]);
        customers[msg.sender].purchasedProducts.push(_id);
        // Pay the seller by sending them Ether
        payable(_seller).transfer(msg.value);
        //removeNestedProduct(_id);
        // Trigger an event
        emit ProductPurchased(productCount, products[_id].name,products[_id].description, products[_id].price, products[_id].imgipfshash, products[_id].fileipfshash, msg.sender, true);
    }
    function editProduct(uint256 _id , string memory _name , string memory _des , uint _price , Categories _categorie) public{
        if(msg.sender == products[_id].owner){
            products[_id].name = _name;
            products[_id].description = _des;
            products[_id].price = _price;
            products[_id].categorie = _categorie;

        }
    }

    function reviewProduct(uint _id,uint256 _rate, string memory _review) public
    {
           require(products[_id].productUserReview[msg.sender].isBuy == true, "You are not eligible to review this product");
           products[_id].productUserReview[msg.sender].isReview == false; //only once

           products[_id].productUserReview[msg.sender].isReview = true;
           //should update rate
           products[_id].productUserReview[msg.sender].reviewDescription = _review;
           products[_id].productUserReview[msg.sender].timeStamp = block.timestamp;

           products[_id].raters[products[_id].reviewsCount] = msg.sender;
              products[_id].reviews.push(products[_id].productUserReview[msg.sender]);

           products[_id].reviewsCount ++;

    }
    
    // function insertProductIntoCart(uint256 id) public returns (bool success,
    //                                               uint256 pos_in_prod_mapping) {
    //     Customer storage cust = customers[msg.sender];
    //     Product memory prod = products[id];
    //     uint256 prods_prev_len = cust.cart.products.length;
    //     cust.cart.products.push(prod.id);
    //     uint256 current_sum = cust.cart.completeSum;
    //     cust.cart.completeSum = current_sum + prod.price;
    //     if (cust.cart.products.length > prods_prev_len) {
    //       emit CartProductInserted(msg.sender, id, prod.price, cust.cart.completeSum);
    //       return (true, cust.cart.products.length - 1);
    //     }
    //     emit CartProductInsertionFailed(msg.sender, id);
    //     return (false, 0);
    // }

    // function removeProductFromCart(uint256 prod_pos_in_mapping) public {
    //     uint256[] memory new_product_list = new uint256[](customers[msg.sender]
    //                                                 .cart.products.length - 1);
    //     uint256[] memory customerProds = customers[msg.sender].cart.products;
    //     for (uint256 i = 0; i < customerProds.length; i++) {
    //       if (i != prod_pos_in_mapping) {
    //         new_product_list[i] = customerProds[i];
    //       } else {
    //         customers[msg.sender].cart.completeSum -=
    //                                            products[customerProds[i]].price;
    //         emit CartProductRemoved(msg.sender, customerProds[i]);
    //       }
    //     }
    //     customers[msg.sender].cart.products = new_product_list;
    // }

    function emptyCart() public returns (bool success) {
        Customer storage customer = customers[msg.sender];
        customer.cart = Cart(new uint256[](0), 0);
        emit CartEmptied(customer.adr);
        return true;
    }

    function registerCustomer(address _address, string memory _name)
                                        public returns (bool success) {
        Customer memory customer = Customer(_address, _name,new uint256[](0),new uint256[](0),Cart(new uint256[](0),0));
        customerCount++;
        addressLUT[customerCount]=customer.adr;
        customers[_address] = customer;
        emit CustomerRegistered(_address);
        return true;
    }

    function getCustomer(address _adr) view public returns(Customer memory){
    	return customers[_adr];
    }

    function getNumberOfOwners(uint _id) public view returns(uint){
        return products[_id].buyers.length;
    }

}