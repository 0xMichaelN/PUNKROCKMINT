import { useEffect, useState } from "react";
// import {
//   connectWallet,
//   getCurrentWalletConnected,
//   loadContract,
//   mintNFT
// } from "../util/interact.js";

import Web3 from 'web3';
const web3 = new Web3(window.ethereum);

// Get Contract ABI & Address
// import axios from 'axios';
// const fs = require('fs');
// const contractJson = JSON.parse(fs.readFileSync('../blockchain/DangerDonuts.json'));
const contractAbi = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "ApprovalCallerNotOwnerNorApproved",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "ApprovalQueryForNonexistentToken",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "ApprovalToCurrentOwner",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "ApproveToCaller",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "BalanceQueryForZeroAddress",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "MintToZeroAddress",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "MintZeroQuantity",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "OwnerQueryForNonexistentToken",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "TransferCallerNotOwnerNorApproved",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "TransferFromIncorrectOwner",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "TransferToNonERC721ReceiverImplementer",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "TransferToZeroAddress",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "URIQueryForNonexistentToken",
    "type": "error"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "approved",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
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
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "operator",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "approved",
        "type": "bool"
      }
    ],
    "name": "ApprovalForAll",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "getApproved",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "operator",
        "type": "address"
      }
    ],
    "name": "isApprovedForAll",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "mAllowedQuantities",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "mBaseURI",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "mMaxTokenSupply",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "mPriceMap",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "mPublicSaleIsActive",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "ownerOf",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "safeTransferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "_data",
        "type": "bytes"
      }
    ],
    "name": "safeTransferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "operator",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "approved",
        "type": "bool"
      }
    ],
    "name": "setApprovalForAll",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes4",
        "name": "interfaceId",
        "type": "bytes4"
      }
    ],
    "name": "supportsInterface",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "symbol",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "tokenURI",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "transferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "quantity",
        "type": "uint256"
      }
    ],
    "name": "mint",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address[]",
        "name": "recipients",
        "type": "address[]"
      },
      {
        "internalType": "uint256[]",
        "name": "quantities",
        "type": "uint256[]"
      }
    ],
    "name": "reserveMint",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "baseURI",
        "type": "string"
      }
    ],
    "name": "setBaseURI",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "flipPublicSaleState",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "internalType": "address payable",
        "name": "to",
        "type": "address"
      }
    ],
    "name": "forceWithdraw",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];//require("../blockchain/DangerDonutsAbi.json");
const contractAddress = "0x358cF9108cd78251B6fE7A9675318693F609bf63";
//const contractAddress = "0xEBc2E8aa35e5bDffb0B551bc419ac797044410BA"; // rinkeby
const priceMap = {
  1: 0.0169,
  2: 0.0169,
  6: 0.05,
  12: 0.09,
  13: 0.0969 
};
const allowedQuantities = [1, 2, 6, 12, 13];

const Minter = (props) => {
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");
  const [isMintButtonDisabled, setIsMintButtonDisabled] = useState(false);
  let [quantityIdx, setQuantityIdx] = useState(4);
  let [quantity, setQuantity] = useState(allowedQuantities[quantityIdx]);

  // Web 3 Contract Info
  //const [contractAbi, setContractAbi] = useState(null);
  //const [contractAddress, setContractAddress] = useState(null);
  const [myContract, setContract] = useState(null);

  //////////// Use Effects Start ////////////
  // Wallet Connection
  useEffect(async () => {
    const { address, status } = await getCurrentWalletConnected();

    setWallet(address);
    setStatus(status);

    addWalletListener();
  }, []);

  // Contract Connection
  // useEffect(async () => {
  //   axios.get('/contract').then(res => {
  //       const myContract = loadContract(res.data.abi, res.data.address);
  //       setContractAbi()
  //       setContract(myContract);
  //     }).catch(err => {})
  // }, []);
  useEffect(async () => {
      const myContract = await new web3.eth.Contract(contractAbi, contractAddress);
      //setContractAbi(contractAbi);
      //setContractAddress(contractAddress);
      setContract(myContract);
  }, []);
  //////////// Use Effects End ////////////

  function incrementQuantity() {
    if(quantityIdx < 4){
      quantityIdx = quantityIdx + 1;
      setQuantityIdx(quantityIdx);
      setQuantity(allowedQuantities[quantityIdx]);
    }
  }
  function decrementQuantity() {
    if(quantityIdx > 0){
      quantityIdx = quantityIdx -1 ;
      setQuantityIdx(quantityIdx);
      setQuantity(allowedQuantities[quantityIdx]);
    }
  }

  function addWalletListener() {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWallet(accounts[0]);
          setStatus("New wallet detected.");
        } else {
          setWallet("");
          setStatus("Connect to Metamask using the top right button.");
        }
      });
    } else {
      setStatus(
        <p>
          {" "}
          {" "}
          <a target="_blank" href={`https://metamask.io/download.html`}>
            You must install Metamask in your browser.
          </a>
        </p>
      );
    }
  }

  const connectWalletPressed = async () => {
    const walletResponse = await connectWallet();
    setStatus(walletResponse.status);
    setWallet(walletResponse.address);
  };

  const onMintPressed = async () => {
    if(walletAddress === ""){
      setStatus("Please connect your wallet on the top right.")
    }
    else{
      const { success, status } = await mintNFT(myContract, walletAddress, quantity, priceMap[quantity]);
      setStatus(status);
    }
  };

  // INERACT.js //
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const addressArray = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        return {
          status: "Chose how many donuts you'd like to mint!",
          address: addressArray[0],
        };
      } catch (err) {
        return {
          address: "",
          status: "Error: " + err.message,
        };
      }
    } else {
      return {
        address: "",
        status: (
          <span>
            <p>
              {" "}
              {" "}
              <a target="_blank" href={`https://metamask.io/download.html`}>
                You must install Metamask in your browser.
              </a>
            </p>
          </span>
        ),
      };
    }
  };
  
  const getCurrentWalletConnected = async () => {
    if (window.ethereum) {
      try {
        const addressArray = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (addressArray.length > 0) {
          return {
            address: addressArray[0],
            status: "Chose how many donuts you'd like to mint!",
          };
        } else {
          return {
            address: "",
            status: "Connect to Metamask.",
          };
        }
      } catch (err) {
        return {
          address: "",
          status: "Error: " + err.message,
        };
      }
    } else {
      return {
        address: "",
        status: (
          <span>
            <p>
              {" "}
              {" "}
              <a target="_blank" href={`https://metamask.io/download.html`}>
                You must install Metamask in your browser.
              </a>
            </p>
          </span>
        ),
      };
    }
  };
  
  // const loadContract = async (contractAbi, contractAddress) => {
  //   return new web3.eth.Contract(contractAbi, contractAddress);
  // };
  
  const mintNFT = async (contract, walletAddress, quantity, costEth) => {
    // window.contract = await new web3.eth.Contract(contractAbi, contractAddress);
    window.contract = contract;
  
    const transactionParameters = {
      to: contractAddress, // Required except during contract publications.
      from: walletAddress, // must match user's active address.
      value: web3.utils.toWei(costEth.toString()),
      maxFeePerGas: null,
      data: window.contract.methods
        .mint(quantity)
        .encodeABI(),
    };
  
    try {
      // const txHash = await window.ethereum.request({
      //   method: "eth_sendTransaction",
      //   params: [transactionParameters],
      // });
      const txHash = await contract.methods.mint(quantity).send({
        from: walletAddress,
        value: web3.utils.toWei(costEth.toString()),
        maxFeePerGas: null
      });
      return {
        success: true,
        status: "Check out your transaction on Etherscan: https://etherscan.io/tx/" + txHash["transactionHash"],
      };
    } catch (error) {
      return {
        success: false,
        status: "Something went wrong: " + error.message,
      };
    }
  };
  // INERACT.js //

  return (
    <div className="Minter">

        <nav class="navbar">
            <div class="navbarcontainer">
              <a href="#home" id="navbarlogo"><img src="./images/Logo.png" height="30px"/></a>
            </div>
        </nav>

        <section class="connect" id="connect">
          <button class="btn-2 color-1" id="walletButton" onClick={connectWalletPressed}>
            {walletAddress.length > 0 ? (
            String(walletAddress).substring(0, 5) +
            "..." +
            String(walletAddress).substring(38)
            ) : (
            "Connect Wallet"
            )}
          </button>
        </section>

        <section class="mint" id="mint">
          <img src="./images/Menu.png"></img>

          <div style = {{textAlign: "center", color: "white"}}> {quantity}</div>
          
          <div class="row">
            <button style = {{color: "red", width: "20px"}} onClick={decrementQuantity}>-</button>
            <button style = {{color: "red", width: "20px"}}onClick={incrementQuantity}> + </button>
          </div>
          <p id="status" style={{textAlign: "center", color: "red"}}>{status}</p>

          <br></br>
          <button class="btn-hover color-1" id="mintButton" onClick={onMintPressed}>MINT</button>
        </section>
    </div>
  );
};

export default Minter;