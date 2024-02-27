const BigNumber = require('bignumber.js');

const NearTestnetContract = "-"
const NearMainnetContract = "0xAe20abC7229bCc6f6da3e6aeEb0FF378DC534183"
const NearTestnetChainID = 0
const NearMainnetChainID = 1313161554
const NearTestnetChainName = "-"
const NearMainnetChainName = "Aurora Mainnet"
const NearTestnetChainRPC = "https://goerli-rollup.arbitrum.io/rpc"
const NearMainnetChainRPC = "-"
const NearTestnetChainSymbol = "-"
const NearMainnetChainSymbol = "ETH"
const NearTestnetChainExplorer = "-"
const NearMainnetChainExplorer = "https://explorer.mainnet.aurora.dev/"
const NearTokenAddress = "0xC42C30aC6Cc15faC9bD938618BcaA1a1FaE8501d";
const TokenDecimal = 24;
// 
// Replace with mainnet/testnet
export const ContractAddress = NearMainnetContract;
export const ChainId = NearMainnetChainID;
export const ChainName = NearMainnetChainName;
export const ChainRPC = NearTestnetChainRPC;
export const ChainSymbol = NearMainnetChainSymbol;
export const ChainExplorer = NearMainnetChainExplorer;
export const ERC20TokenAddress = NearTokenAddress;
export const ERC20TokenDecimal = TokenDecimal;

export async function getBalance(contract, walletAddress) {
    let balance = await contract.methods.balanceOf(walletAddress).call();
    return balance;
}
  
export function convertERCDecimalToBalance(web3, balanceIn) {
    if (balanceIn === "trying to fetch contract balance") { 
        return 0;
    }
    try {
        const decimals = web3.utils.toBN(ERC20TokenDecimal);
        const multiplier = web3.utils.toBN(10).pow(decimals);
        const balanceInWei = web3.utils.toWei(balanceIn.toString(), 'ether'); // Convert to wei
        return web3.utils.toBN(balanceInWei).mul(multiplier);
    } catch(e) {
        console.log("failed convertERCBalanceToDecimal", balanceIn, e);
        return 0;
    }
}
export function convertERCBalanceToDecimal(web3, balanceIn) {
    if (balanceIn == "trying to fetch contract balance") { 
        return 0
    }
    try {
        const tokenAmountInWei = web3.utils.toBN(balanceIn);
        if (tokenAmountInWei.bitLength() > 53) {
            const ERC20TokenDecimalBigNumber = new BigNumber(10).pow(ERC20TokenDecimal);
            const tokenAmountString = tokenAmountInWei.toString(); // Convert to string to ensure precision
            const decimalIndex = tokenAmountString.length - ERC20TokenDecimal; // Calculate the index of the decimal point

            let tokenBalanceFormatted;
            if (decimalIndex > 0) {
                // If decimal index is positive, insert the decimal point at appropriate position
                const integerPart = tokenAmountString.substring(0, decimalIndex);
                const decimalPart = tokenAmountString.substring(decimalIndex);
                const formattedString = integerPart + '.' + decimalPart;
                tokenBalanceFormatted = new BigNumber(formattedString);
            } else {
                // If decimal index is negative, prepend '0.' to the string
                tokenBalanceFormatted = new BigNumber('0.' + '0'.repeat(Math.abs(decimalIndex)) + tokenAmountString);
            }
            console.log(tokenBalanceFormatted.toString(10))
            return tokenBalanceFormatted.toString(10); // Convert to string for safe representation
        }
        return tokenAmountInWei.toNumber() / (10**ERC20TokenDecimal);
    } catch(e) {
        console.log("failed convertERCBalanceToDecimal", balanceIn)
        return 0;
    }
}

export const minABI = [
    {
        "constant": true,
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_spender",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_from",
                "type": "address"
            },
            {
                "name": "_to",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "transferFrom",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "decimals",
        "outputs": [
            {
                "name": "",
                "type": "uint8"
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
        "inputs": [],
        "name": "symbol",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_to",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "transfer",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_owner",
                "type": "address"
            },
            {
                "name": "_spender",
                "type": "address"
            }
        ],
        "name": "allowance",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "payable": true,
        "stateMutability": "payable",
        "type": "fallback"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "spender",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Approval",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    }
];