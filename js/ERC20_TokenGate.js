  // 	    Token Gating ERC20
  //      AWARD POOL - Create Amazing
  //        /\__/\   - js by @rUv
  //       ( o.o  )  - v1.0.0
  //         >^<     - https://github.com/awardpool/

// Connect to the Ethereum network through the MetaMask provider
const web3 = new Web3(Web3.givenProvider || new Web3(new Web3.providers.CurrentProvider()));

// The address of the user's wallet
const userAddress = '';

// The address of the contract, might be empty
let contractAddress = ''

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
}];

// Create a contract object
const contract = new web3.eth.Contract(contractABI, contractAddress);

if(contractAddress !== ""){
    // Call the balanceOf function
    contract.methods.balanceOf(userAddress).call().then(function(balance) {
        console.log(`The user's balance is: ${balance}`);
    });
} else {
    // Get the user's balance in wei
    web3.eth.getBalance(userAddress).then(function(balance) {
        // Convert the balance from wei to ether
        const balanceInEther = web3.utils.fromWei(balance, 'ether');
        console.log(`The user's balance is: ${balanceInEther} ETH`);
    });
};

//new balance check (defaulting to native currency)
const threshold = 1;

//new check 
if(contractAddress !== ""){
    // Call the balanceOf function
    contract.methods.balanceOf(userAddress).call().then(function(balance) {
        if(balance > threshold){
            console.log(`The user's balance is greater than : ${threshold}  ${balance}`);
        }else{
            console.log(`The user's balance is less or equal to : ${threshold}  ${balance}`);
        }
    });
} else {
    web3.eth.getBalance(userAddress).then(function(balance) {
        const ether = web3.utils.fromWei(balance, 'ether');
        if(ether > threshold) {
            console.log(`The user's balance is greater than : ${threshold}  ${ether}`);
        }else{
            console.log(`The user's balance is less or equal to : ${threshold}  ${ether}`);
        }
    });
}
