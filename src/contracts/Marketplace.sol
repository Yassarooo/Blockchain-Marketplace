// if purchased w bdi 27zfa
// SPDX-License-Identifier: MIT
pragma solidity  ^0.8.0;

contract Marketplace {
    //string public name;
    uint public productCount = 0;
    //to store the products on blockchain
    bool public flag = false;
    mapping(uint => Product) public products;
    //to store the customers on blockchain
    mapping(address  => Customer) public customers;
    // Maps owner to their images
    mapping (address => Product[]) public ownerToProducts;
    uint[] public emptySpaces;
    uint public len; 
    uint public ftt = 0;

    struct Customer {
        address adr;
        bytes32 name;
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
        bool purchased;
        address[] owners;
    }

    event ProductCreated(uint id, string name, string description, uint price, string imgipfshash, string fileipfshash, address owner, bool purchased);
    event ProductPurchased(uint id, string name, string description, uint price, string imgipfshash, string fileipfshash, address owner, bool purchased);
    event CustomerRegistered(address customer);
    event CustomerRegistrationFailed(address customer);
    event CartProductInserted(address customer, uint256 prodId, uint256 prodPrice, uint256 completeSum);
    event CartProductInsertionFailed(address customer, uint256 prodId);
    event CartProductRemoved(address customer, uint256 prodId);
    event CartEmptied(address customer);


    /*constructor() public {
        name = "Jazara Marketplace";
    }*/

    // Create a new product with a struct
    // Add the struct to the mapping, and store it on the blockchain
    // Trigger an event that lets someone know a product was creatd
    function createProduct(string memory _name,string memory _description, uint _price,string memory _imgipfshash,string memory _fileipfshash) public {
        // Require a valid name
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
        if(emptySpaces.length == 0 || emptySpaces[0]==0){
                productCount ++;
                products[productCount] = Product(productCount, _name , _description, _price , _imgipfshash , _fileipfshash ,msg.sender, false ,new address[](0));
        
                ownerToProducts[msg.sender].push(Product({
                id: productCount,
                name: _name,
                description: _description,
                price: _price,
                imgipfshash: _imgipfshash,
                fileipfshash:_fileipfshash,
                owner: msg.sender,
                purchased: false,
                owners: new address[](0)
            }));
            emit ProductCreated(productCount, _name, _description, _price, _imgipfshash,_fileipfshash, msg.sender, false);
        }
        else{
            uint tmp = emptySpaces[0];
            products[emptySpaces[0]] = Product(emptySpaces[0], _name , _description ,_price , _imgipfshash ,_fileipfshash, msg.sender, false,new address[](0) );
            len = emptySpaces.length;
            for(uint i = 0;i < emptySpaces.length - 1;i++){
                emptySpaces[i] = emptySpaces[ i+1 ];
            }
            emptySpaces.pop();
            ownerToProducts[msg.sender].push(Product({
                id: tmp,
                name: _name,
                description: _description,
                price: _price,
                imgipfshash: _imgipfshash,
                fileipfshash:_fileipfshash,
                owner: msg.sender,
                purchased: false,
                owners: new address[](0)
                }));
                emit ProductCreated(tmp, _name, _description, _price, _imgipfshash,_fileipfshash, msg.sender, false);
        }
        
    }

    function removeProduct(uint id1) public {
        removeNestedProduct(id1);
        delete products [id1];
        emptySpaces.push(id1);
    }
    function removeNestedProduct(uint id1) public {
        uint index =0;
        for(uint i=0;i<ownerToProducts[msg.sender].length;i++){
            if(ownerToProducts[msg.sender][i].id == id1){
                flag = true;
                index = i;
            }
        }
        if(flag){
            if(index == ownerToProducts[msg.sender].length -1){
                ownerToProducts[msg.sender].pop();
                flag = false;
            }
            else{
                for(uint i = index ;i <ownerToProducts[msg.sender].length - 1 ; i++){
                    ownerToProducts[msg.sender][i] = ownerToProducts[msg.sender][ i+1 ];
                }
                ownerToProducts[msg.sender].pop();
                flag = false;
            }
        }
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
        _product.purchased = true;
        // Update the product
        products[_id] = _product;
        // Pay the seller by sending them Ether
        payable(_seller).transfer(msg.value);
        removeNestedProduct(_id);
        // Trigger an event
        emit ProductPurchased(productCount, _product.name,_product.description, _product.price, _product.imgipfshash, _product.fileipfshash, msg.sender, true);
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

    function registerCustomer(address _address, bytes32 _name, uint256 _balance)
                                        public returns (bool success) {
      if (_address != address(0)) {
        Customer memory customer = Customer({ adr: _address, name: _name,
                                              cart: Cart(new uint256[](0), 0)
                                            });
        customers[_address] = customer;
        emit CustomerRegistered(_address);
        return true;
      }
      emit CustomerRegistrationFailed(_address);
      return false;
    }

    function getProductCount(address _owner) view
        public
        returns (uint256) 
    {
        require(_owner != address(0));
        return ownerToProducts[_owner].length;
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