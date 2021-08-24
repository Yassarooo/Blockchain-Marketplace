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
    mapping(uint => uint[]) public productsRates;
    mapping(uint => string[]) public productsReviews;
    mapping(Categories => uint[]) public categorieToProduct;
    //to store the customers on blockchain
    mapping(address  => Customer) public customers;
    mapping(uint => address) public addressLUT;
    // Maps owner to their images
    mapping (address => Product[]) public ownerToProducts;
    //many owners
    mapping (uint => address[]) public owners;
    //all purchased products 
    mapping (uint => Product[]) public purchasedProducts;
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
    struct Customer {
        address adr;
        string name;
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
    }

    event ProductCreated(uint id, string name, string description, uint price, string imgipfshash, string fileipfshash, address owner, bool purchased);
    event ProductPurchased(uint id, string name, string description, uint price, string imgipfshash, string fileipfshash, address owner, bool purchased);
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
        /*// Require a valid name
        require(bytes(_name).length > 0);
        // Require a valid description
        //require(bytes(_description).length > 0);
        // Require a valid price
        require(_price > 0);
        // Require a valid image hash
        //require(bytes(_imgipfshash).length > 0);
        // Require a valid file hash
        //require(bytes(_fileipfshash).length > 0);*/
        // Increment product count
        uint256 _uploadedOn = block.timestamp;
        //if(emptySpaces.length == 0 || emptySpaces[0]==0){
                productCount ++;
                products[productCount] = Product(productCount, _name , _description, _price , _imgipfshash , _fileipfshash ,msg.sender, _categorie , _uploadedOn);
                categorieToProduct[_categorie].push(productCount);
                ownerToProducts[msg.sender].push(Product({
                id: productCount,
                name: _name,
                description: _description,
                price: _price,
                imgipfshash: _imgipfshash,
                fileipfshash:_fileipfshash,
                owner: msg.sender,
                categorie: _categorie,
                uploadedOn: _uploadedOn
                
            }));
            emit ProductCreated(productCount, _name, _description, _price, _imgipfshash,_fileipfshash, msg.sender, false);
        //}
        /*
        else{
            uint tmp = emptySpaces[0];
            products[emptySpaces[0]] = Product(emptySpaces[0], _name , _description ,_price , _imgipfshash ,_fileipfshash, msg.sender,  _categorie, _uploadedOn);
            len = emptySpaces.length;
            for(uint i = 0;i < emptySpaces.length - 1;i++){
                emptySpaces[i] = emptySpaces[ i+1 ];
            }
            emptySpaces.pop();            categorieToProduct[_categorie][tmp-1] = tmp;
            ownerToProducts[msg.sender][tmp] = Product(
                tmp,
                _name,
                _description,
                _price,
                _imgipfshash,
                _fileipfshash,
                msg.sender,
                _categorie,
                _uploadedOn
                );
                emit ProductCreated(tmp, _name, _description, _price, _imgipfshash,_fileipfshash, msg.sender, false);
        }
        */
    }

    function removeProduct(uint id1) public {
        if(msg.sender == products[id1].owner){
            //removeNestedProduct(id1);
            delete products [id1];
            delete productsRates[id1];
            delete productsReviews[id1];
            //Categories cat;
            //cat = products[id1].categorie;
            //delete categorieToProduct[cat][id1-1];
            emptySpaces.push(id1);
        }
    }
    function removeNestedProduct(uint id1) public {
        delete ownerToProducts[msg.sender][id1];
    }
    function purchaseProduct(uint _id) public payable {
        // Fetch the product
        Product memory _product = products[_id];
        // Fetch the owner
        address _seller = _product.owner;
        /*// Make sure the product has a valid id
        require(_product.id > 0 && _product.id <= productCount);
        // Require that there is enough Ether in the transaction
        require(msg.value >= _product.price);
        // Require that the product has not been purchased already
        require(!_product.purchased);
        // Require that the buyer is not the seller
        require(_seller != msg.sender);
        // Transfer ownership to the buyer*/
        _product.owner = msg.sender;
        // Mark as purchased
        purchasedProducts[_id].push(_product);
        owners[_id].push(msg.sender);
        // Update the product
        products[_id] = _product;
        // Pay the seller by sending them Ether
        payable(_seller).transfer(msg.value);
        //removeNestedProduct(_id);
        // Trigger an event
        emit ProductPurchased(productCount, _product.name,_product.description, _product.price, _product.imgipfshash, _product.fileipfshash, msg.sender, true);
    }
    function editProduct(uint256 _id , string memory _name , string memory _des , uint _price , Categories _categorie) public{
        if(msg.sender == products[_id].owner){
            Product memory _product = products[_id];
            _product.name = _name;
            _product.description = _des;
            _product.price = _price;
            _product.categorie = _categorie;
            products[_id] = _product;
            Product memory _ownerToProducts = ownerToProducts[msg.sender][_id];
            _ownerToProducts.name = _name;
            _ownerToProducts.description = _des;
            _ownerToProducts.price = _price;
            _ownerToProducts.categorie = _categorie;
            ownerToProducts[msg.sender][_id] = _ownerToProducts;
        }
    }
    
    function giveRate(uint _rate ,uint pos_in_prod_mapping ) public {
        productsRates[pos_in_prod_mapping].push(_rate);
    }
    function writeReview(string memory _review ,uint pos_in_prod_mapping) public {
        productsReviews[pos_in_prod_mapping].push(_review);
    }

    function insertProductIntoCart(uint256 id) public returns (bool success,
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
    }

    function removeProductFromCart(uint256 prod_pos_in_mapping) public {
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

    function emptyCart() public returns (bool success) {
        Customer storage customer = customers[msg.sender];
        customer.cart = Cart(new uint256[](0), 0);
        emit CartEmptied(customer.adr);
        return true;
    }

    function registerCustomer(address _address, string memory _name)
                                        public returns (bool success) {
    ownerToProducts[msg.sender].push(Product({
                id: 0,
                name: "dummy",
                description: "dummy",
                price: 0,
                imgipfshash: "dummy",
                fileipfshash:"dummy",
                owner: 0x0000000000000000000000000000000000000000,
                categorie: Categories.Tech,
                uploadedOn:0
        }));

        Customer memory customer = Customer(_address, _name,Cart(new uint256[](0), 0));
        customerCount++;
        addressLUT[customerCount]=customer.adr;
        customers[_address] = customer;
        emit CustomerRegistered(_address);
        return true;
    }

    function getCustomer(address _adr) view public returns(Customer memory){
    	return customers[_adr];
    }

    function getProductCount(address _owner) view
        public
        returns (uint256) 
    {
        require(_owner != address(0));
        return ownerToProducts[_owner].length;
    }
    function getNumberOfOwners(uint _id) public view returns(uint){
        return owners[_id].length;
    }

    function getProduct(address _owner, uint8 _index) view
        public returns (
        uint _id, 
        string memory _name, 
        string memory _description,
        uint _price,
        string memory imgipfshash,
        string memory fileipfshash
    ) {

        require(_owner != address(0));
        require(_index >= 0 && _index <= 2**8 - 1);
        require(ownerToProducts[_owner].length > 0);

        Product storage product = ownerToProducts[_owner][_index];
        
        return (
            product.id, 
            product.name,
            product.description,
            product.price,
            product.imgipfshash,
            product.fileipfshash
        );
    }

}