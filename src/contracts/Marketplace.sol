pragma solidity ^0.5.0;

contract Marketplace {
    string ta3dil3;
    string public name;
    uint public productCount = 0;
    //to store the products on blockchain
    mapping(uint => Product) public products;
    // Maps owner to their images
    mapping (address => Product[]) public ownerToProducts;

    struct Product {
        uint id;
        string name;
        uint price;
        string image;
        string description;
        address payable owner;
        bool purchased;
    }

    event ProductCreated(
        uint id,
        string name,
        uint price,
        string image,
        string description,
        address payable owner,
        bool purchased
    );

    event ProductPurchased(
    uint id,
    string name,
    uint price,
    address payable owner,
    bool purchased
);

    constructor() public {
        name = "Jazara Marketplace";
    }

    // Create a new product with a struct
    // Add the struct to the mapping, and store it on the blockchain
    // Trigger an event that lets someone know a product was creatd
    function createProduct(string memory _name,string memory _image,string memory _description, uint _price) public {
    // Require a valid name
    require(bytes(_name).length > 0);
    // Require a valid image
    require(bytes(_image).length > 0);
    // Require a valid description
    require(bytes(_description).length > 0);
    // Require a valid price
    require(_price > 0);
    // Increment product count
    productCount ++;
    // Create the product
    products[productCount] = Product(productCount, _name, _price,_image,_description, msg.sender, false);
    // Trigger an event
    emit ProductCreated(productCount, _name, _price, _image, _description, msg.sender, false);
    }

    function purchaseProduct(uint _id) public payable {
    // Fetch the product
    Product memory _product = products[_id];
    // Fetch the owner
    address payable _seller = _product.owner;
    // Make sure the product has a valid id
    require(_product.id > 0 && _product.id <= productCount);
    // Require that there is enough Ether in the transaction
    require(msg.value >= _product.price);
    // Require that the product has not been purchased already
    require(!_product.purchased);
    // Require that the buyer is not the seller
    require(_seller != msg.sender);
    // Transfer ownership to the buyer
    _product.owner = msg.sender;
    // Mark as purchased
    _product.purchased = true;
    // Update the product
    products[_id] = _product;
    // Pay the seller by sending them Ether
    address(_seller).transfer(msg.value);
    // Trigger an event
    emit ProductPurchased(productCount, _product.name, _product.price, msg.sender, true);
    }

    /** 
    * @notice Returns the number of products associated with the given address
    * @dev Controlled by circuit breaker
    * @param _owner The owner address
    * @return The number of products associated with a given address
    */
    function getProductCount(address _owner) 
        public
        returns (uint256) 
    {
        require(_owner != address(0));
        return ownerToProducts[_owner].length;
    }

    function getProduct(address _owner, uint8 _index) 
        public returns (
        uint _id, 
        string memory _name, 
        uint _price,
        string memory image,
        string memory _description
    ) {

        require(_owner != address(0));
        require(_index >= 0 && _index <= 2**8 - 1);
        require(ownerToProducts[_owner].length > 0);

        Product storage product = ownerToProducts[_owner][_index];
        
        return (
            product.id, 
            product.name,
            product.price,
            product.image,
            product.description
        );
    }

}