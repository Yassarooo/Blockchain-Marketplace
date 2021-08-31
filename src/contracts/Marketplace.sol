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
    //to store the customers on blockchain
    mapping(address  => Customer) public customers;
    mapping(uint => address) public addressLUT;
    mapping(uint => string) public files;
    uint256 MAXREPORT = 100;
    bool public ftt =false;
    
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
        address adr;
        uint pid;
        string name;
        uint256 rate;
        string reviewDescription;
        uint256 score;
        uint timeStamp;
    }
    struct Customer {
        address adr;
        string name;
        uint256[] purchasedProducts;
        Review[] reviews;
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
        uint256 rate;
        uint256 reviewsCount;
        address[] buyers;
        uint256 totalSold;
        Review [] reviews;
        mapping (address=>Review) productUserReview;
        mapping (address => bool)hasReported;
        uint report;
        uint removed;
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
        products[productCount].hasReported[msg.sender] = false;
        products[productCount].totalSold = 0;
        products[productCount].buyers = new address[](0);
        products[productCount].removed = 0;
        //add this product to the customer's owned product
        //create an event
        emit ProductCreated(productCount, _name, _description, _price, _imgipfshash,_fileipfshash, msg.sender);
    }

    function purchaseProduct(uint _id) public payable {
        // Fetch the owner
        address _seller = products[_id].owner;
        require(products[_id].owner != msg.sender, "You cannot buy your own product");
        // Make sure the product has a valid id
        require(products[_id].id > 0 && products[_id].id <= productCount);
        // Require that there is enough Ether in the transaction
        require(msg.value >= products[_id].price, "Insufficient Ether");
        // Require that the buyer is not the seller
        require(_seller != msg.sender);
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
    function removeProduct(uint id1) public {
        if(msg.sender == products[id1].owner && products[id1].removed == 0){
            products[id1].removed = 1;
        }
    }
    function restoreProduct(uint id1) public {
        if(msg.sender == products[id1].owner && products[id1].removed == 1){
            products[id1].removed = 0;
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

               products[_id].productUserReview[msg.sender].adr = msg.sender;
               products[_id].productUserReview[msg.sender].pid = _id;
               products[_id].productUserReview[msg.sender].name = customers[msg.sender].name;
               products[_id].productUserReview[msg.sender].rate = _rate;
               products[_id].productUserReview[msg.sender].reviewDescription = _review;
               products[_id].productUserReview[msg.sender].score = _score;
               products[_id].productUserReview[msg.sender].timeStamp = block.timestamp;

    
               products[_id].reviews.push(products[_id].productUserReview[msg.sender]);
               customers[msg.sender].reviews.push(products[_id].productUserReview[msg.sender]);
               products[_id].reviewsCount ++;
               
               //calculate and update product rate
                uint avg = (products[_id].rate) * (products[_id].reviewsCount - 1);
                avg += _rate;
                products[_id].rate = avg / products[_id].reviewsCount;
           }

    }

    function registerCustomer(address _address, string memory _name)
                                        public returns (bool success) {
        customerCount++;
        addressLUT[customerCount]=_address;
        customers[_address].adr = _address;
        customers[_address].name = _name;
        emit CustomerRegistered(_address);
        return true;
    }
    function hasRegistered(address _adr) public view returns(bool){
        if(customerCount>0){
            for(uint i=1;i<=customerCount;i++){
                if(addressLUT[i] == _adr)
                    return true;
            }
        }
        return false;
    } 
    function hasReported(uint _id) public view returns(bool){
        if(products[_id].hasReported[msg.sender] == false)
            return false;
        return true;
    } 
    function report(uint _id) public {
        if(!hasReported(_id)){
            products[_id].report++;
            products[_id].hasReported[msg.sender] = true;
            if(products[_id].report >= MAXREPORT){
                products[_id].removed = 2;
            }
        }
    }
    function getReport(uint _id) public view returns(uint){
        return products[_id].report;
    }
    function getUserReviews(address _adr) public view returns (Review[] memory){
        return customers[_adr].reviews;
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