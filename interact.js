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
	getLearners();

}


async  function getContract(){
    let signer = provider.getSigner(account);
    let contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer); 
    return contract;
}


async function getLearners(){
    let contract = await getContract();
   
    let learners = await contract.getAllLearners();

	for(const item of learners){
			appendCard(item);
	}
}

function appendCard(item) {
	let container = document.getElementsByClassName("container")[0];
	let card = document.createElement("div");
	card.className = "card";
	card.innerHTML =
	  "Address : " + item.from + "<br/>" + "Learning : " + item.learning;
	container.append(card);
  }

  

async function addLearner() {
	let learningtext = document.getElementById("inputText");
	if (learningtext.value === "") {
	  learningtext.style.border = "2px solid red";
	  learningtext.setAttribute("placeholder", "This filed can not be blank");
	  return;
	}
	let contract = await getContract();
	console.log(contract);
	let txn = await contract.addLearner(learningtext.value);
	let showhash = document.getElementById("txnhash");
	let a = document.createElement("a");
	a.href = `https://goerli.etherscan.io/tx/${txn.hash}`;
	a.innerHTML = "Follow your transaction here";
	showhash.append(a);
	await txn.wait();
	history.go(0);
  }
  

window.addEventListener("load", connectWallet);


