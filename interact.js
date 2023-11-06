const CONTRACT_ADDRESS = '0xd8e3e6a1f923C252d82D592D7c04b26cD20bC9E7';
const ABI = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "learning",
				"type": "string"
			}
		],
		"name": "addLearner",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllLearners",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "from",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "learning",
						"type": "string"
					}
				],
				"internalType": "struct ChainJourney.Learner[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

const provider = new ethers.providers.Web3Provider(window.ethereum);
let account;

async function connectWallet(){
    let accountList = await provider.send('eth_requestAccounts', []);
    account = await accountList[0];
    document.getElementById('caccount').innerHTML = 'Current Account is: ' + account;
}
connectWallet();

async  function getContract(){
    let signer = provider.getSigner(account);
    let contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
    
    return contract;
}
getContract();


async function getLearners(){
    let contract = await getContract();
    console.log(contract);
    let learners = await contract.getAllLearners();
    console.log(learners);
}


getLearners();