  //	    Token Gating NFT
  //      AWARD POOL - Create Amazing
  //        /\__/\   - js by @rUv
  //       ( o.o  )  - v1.0.0
  //         >^<     - https://github.com/awardpool/

// Connect to the Ethereum network through the MetaMask provider
const web3 = new Web3(Web3.givenProvider || new Web3(new Web3.providers.CurrentProvider());

// The address of the NFT contract
const contractAddress = '0x12345';

// The address of the user's wallet
const userAddress = '0x6789';

// Get the contract's ABI (interface)
const contractABI = [{
    "constant": true,
    "inputs": [
        {
            "name": "_owner",
            "type": "address"
        }
    ],
    "name": "balanceOf",
    "outputs": [
        {
            "name": "balance",
            "type": "uint256"
        }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
},
{
    "constant": true,
    "inputs": [
        {
            "name": "_tokenId",
            "type": "uint256"
        }
    ],
    "name": "ownerOf",
    "outputs": [
        {
            "name": "",
            "type": "address"
        }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}
];

// Create a contract object
const contract = new web3.eth.Contract(contractABI, contractAddress);

// Call the balanceOf function
contract.methods.balanceOf(userAddress).call().then(function(balance) {
    console.log(balance);
});

// The range of token IDs to check
const startId = 1;
const endId = 100;

let nftCount = 0;
let found = false;

// The ID of the NFT
const tokenId = 39;

contract.methods.ownerOf(tokenId).call().then(function(owner) {
    if(owner.toLowerCase() === userAddress.toLowerCase()){
        console.log("The wallet holds this NFT");
    }else{
        console.log("The wallet doesn't hold this NFT");

    }
});

// Iterate through the range of token IDs
for (let tokenId = startId; tokenId <= endId; tokenId++) {
    // Call the ownerOf function
    contract.methods.ownerOf(tokenId).call().then(function(owner) {
        if(owner.toLowerCase() === userAddress.toLowerCase()){
            console.log(`The wallet holds the NFT with token ID ${tokenId}`);
        }else{
            console.log(`The wallet doesn't hold the NFT with token ID ${tokenId}`);
        }
    });
};

let executed = false;

// Iterate through the range of token IDs
for (let tokenId = startId; tokenId <= endId; tokenId++) {
    if(!found && !executed){
        executed = true;
        // Call the ownerOf function
        contract.methods.ownerOf(tokenId).call().then(function(owner) {
            if(owner.toLowerCase() === userAddress.toLowerCase()){
                nftCount++;
                if(nftCount === 1){
                    console.log("yes");
                }
                if(nftCount > 1){
                    console.log("yes");
                    found = true;
                }
            }
        });
    }
}

