// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract UniverseRegistry {
    struct WorkRecord {
        bytes32 hash;
        string universeSlug;
        address signer;
        uint256 timestamp;
        bytes signature;
        string uri;
    }

    mapping(bytes32 => WorkRecord) public records;

    event WorkRegistered(
        bytes32 indexed hash,
        string universeSlug,
        address indexed signer,
        uint256 timestamp,
        string uri
    );

    function registerWork(
        bytes32 hash_,
        string memory universeSlug_,
        address signer_,
        bytes memory signature_,
        string memory uri_
    ) public {
        require(records[hash_].timestamp == 0, "Record already exists");
        records[hash_] = WorkRecord({
            hash: hash_,
            universeSlug: universeSlug_,
            signer: signer_,
            timestamp: block.timestamp,
            signature: signature_,
            uri: uri_
        });
        emit WorkRegistered(hash_, universeSlug_, signer_, block.timestamp, uri_);
    }

    function getWork(bytes32 hash_) public view returns (WorkRecord memory) {
        return records[hash_];
    }
}
