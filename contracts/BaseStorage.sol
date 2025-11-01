// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title BaseStorage
 * @dev Simple storage contract for Base Builder Vault
 * Allows users to store and retrieve a uint256 value
 */
contract BaseStorage {
    uint256 private storedValue;
    address public owner;

    event ValueStored(address indexed user, uint256 value, uint256 timestamp);
    event ValueRetrieved(address indexed user, uint256 value, uint256 timestamp);

    mapping(address => uint256) public userValues;
    mapping(address => uint256) public userStorageCount;

    constructor() {
        owner = msg.sender;
        storedValue = 0;
    }

    /**
     * @dev Store a new value (global)
     * @param _value The value to store
     */
    function store(uint256 _value) public {
        storedValue = _value;
        userValues[msg.sender] = _value;
        userStorageCount[msg.sender]++;

        emit ValueStored(msg.sender, _value, block.timestamp);
    }

    /**
     * @dev Retrieve the stored value (global)
     * @return The stored value
     */
    function retrieve() public view returns (uint256) {
        return storedValue;
    }

    /**
     * @dev Retrieve user-specific value
     * @param _user The user address
     * @return The user's stored value
     */
    function getUserValue(address _user) public view returns (uint256) {
        return userValues[_user];
    }

    /**
     * @dev Get total storage operations by user
     * @param _user The user address
     * @return The count of storage operations
     */
    function getUserStorageCount(address _user) public view returns (uint256) {
        return userStorageCount[_user];
    }

    /**
     * @dev Increment the stored value by 1
     */
    function increment() public {
        storedValue++;
        userValues[msg.sender] = storedValue;
        userStorageCount[msg.sender]++;

        emit ValueStored(msg.sender, storedValue, block.timestamp);
    }
}
