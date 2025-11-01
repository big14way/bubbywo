// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title BaseNFT
 * @dev Simple ERC721-like NFT minter for Base Builder Vault
 * Note: This is a simplified implementation. For production, use OpenZeppelin's ERC721
 */
contract BaseNFT {
    string public name = "Base Builder NFT";
    string public symbol = "BBN";

    uint256 private _tokenIdCounter;
    uint256 public constant MAX_SUPPLY = 10000;
    uint256 public constant MINT_PRICE = 0.001 ether;

    address public owner;

    mapping(uint256 => address) private _owners;
    mapping(address => uint256) private _balances;
    mapping(uint256 => string) private _tokenURIs;

    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);
    event Minted(address indexed to, uint256 indexed tokenId, uint256 timestamp);

    constructor() {
        owner = msg.sender;
        _tokenIdCounter = 0;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    /**
     * @dev Mint a new NFT
     * @param _to The address to mint to
     */
    function mint(address _to) public payable returns (uint256) {
        require(_tokenIdCounter < MAX_SUPPLY, "Max supply reached");
        require(msg.value >= MINT_PRICE, "Insufficient payment");

        uint256 tokenId = _tokenIdCounter;
        _tokenIdCounter++;

        _owners[tokenId] = _to;
        _balances[_to]++;

        emit Transfer(address(0), _to, tokenId);
        emit Minted(_to, tokenId, block.timestamp);

        return tokenId;
    }

    /**
     * @dev Get the owner of a token
     * @param tokenId The token ID
     */
    function ownerOf(uint256 tokenId) public view returns (address) {
        address tokenOwner = _owners[tokenId];
        require(tokenOwner != address(0), "Token doesn't exist");
        return tokenOwner;
    }

    /**
     * @dev Get the balance of an address
     * @param _owner The address to query
     */
    function balanceOf(address _owner) public view returns (uint256) {
        require(_owner != address(0), "Invalid address");
        return _balances[_owner];
    }

    /**
     * @dev Get total minted tokens
     */
    function totalSupply() public view returns (uint256) {
        return _tokenIdCounter;
    }

    /**
     * @dev Withdraw contract balance (only owner)
     */
    function withdraw() public onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No balance to withdraw");
        payable(owner).transfer(balance);
    }

    /**
     * @dev Get token URI
     * @param tokenId The token ID
     */
    function tokenURI(uint256 tokenId) public view returns (string memory) {
        require(_owners[tokenId] != address(0), "Token doesn't exist");
        return _tokenURIs[tokenId];
    }
}
