// Get Contract address and ABI
const MoodContractAddress = "0x8602666f6002528b5A2238091b918B4Ea552De4F";
const MoodContractABI = [
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_mood",
                "type": "string"
            }
        ],

        "name": "setMood",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },

    {
        "inputs": [],
        "name": "getMood",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

// Declare MoodContract and  signer variable with undefined value, we will use Ethers to assign them values
let MoodContract = undefined;
let signer = undefined;

// define a Web3 Provider - this is our connection to the Ethereum Network (Sepolia Testnet) 
const provider = new ethers.providers.Web3Provider(window.ethereum, "sepolia");


// Request access to the user's wallet and assign values to MoodContract and signer 
provider.send("eth_requestAccounts", []).then(() => {
  provider.listAccounts().then((accounts) => {
    signer = provider.getSigner(accounts[0]);
    MoodContract = new ethers.Contract(
      MoodContractAddress,
      MoodContractABI,
      signer
    );
  });
});

// Make a function to retrieve mood from the blockchain
async function getMood() {
  const mood = await MoodContract.getMood();
  document.getElementById("showMood").innerText = `Your Mood: ${mood}`;
  console.log(mood);
}

// Make a function to store mood in the blockchain
async function setMood() {
  const mood = document.getElementById("mood").value;
  await MoodContract.setMood(mood);
}