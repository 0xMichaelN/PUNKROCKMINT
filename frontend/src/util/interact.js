// import { pinJSONToIPFS } from "./pinata.js";
import Web3 from 'web3';
// require("dotenv").config();
// const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY;
// const contractABI = require("../contract-abi.json");
// const contractAddress = "0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE";

const web3 = new Web3(window.ethereum);
//const web3 = new Web3(new Web3.providers.HttpProvider("https://eth-rinkeby.alchemyapi.io/v2/wHDP9o7Vy0V0EvquuXhU5zigR7cX4_8D"));
// const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
// const web3 = createAlchemyWeb3(alchemyKey);

export const connectWallet = async () => {
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

export const getCurrentWalletConnected = async () => {
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

export const loadContract = async (contractAbi, contractAddress) => {
  return new web3.eth.Contract(contractAbi, contractAddress);
}

export const mintNFT = async (contract, walletAddress, quantity, costEth) => {
  // window.contract = await new web3.eth.Contract(contractAbi, contractAddress);
  window.contract = contract;

  // const transactionParameters = {
  //   to: contractAddress, // Required except during contract publications.
  //   from: window.ethereum.selectedAddress, // must match user's active address.
  //   data: window.contract.methods
  //     .mintNFT(window.ethereum.selectedAddress)
  //     .encodeABI(),
  // };

  try {
    // const txHash = await window.ethereum.request({
    //   method: "eth_sendTransaction",
    //   params: [transactionParameters],
    // });
    contract.methods.mint(quantity).send({
      from: walletAddress,
      value: web3.utils.toWei(costEth.toString())
    })
    return {
      success: true,
      status: "Check out your transaction on Etherscan: https://rinkeby.etherscan.io/tx/" //+ txHash,
    };
  } catch (error) {
    return {
      success: false,
      status: "Something went wrong: " + error.message,
    };
  }
};