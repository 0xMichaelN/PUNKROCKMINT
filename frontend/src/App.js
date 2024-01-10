import './App.css';
import contractAbi from './ContractAbi.json'
import React, { useEffect, useState } from 'react';
import Web3 from 'web3';

const web3 = new Web3(window.ethereum);

const contractAddress = "0xf8a20D203Dc257172C11A45D784fEB21190C44f8";
const priceMap = {
  1: 150,
  2: 280,
  3: 375,
  5: 500,
  10: 750 
};
const allowedQuantities = [1, 2, 3, 5, 10];

function App() {

  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");
  const [networkName, setNetworkName] = useState('');
  let [quantityIdx, setQuantityIdx] = useState(4);
  let [quantity, setQuantity] = useState(allowedQuantities[quantityIdx]);

  const [myContract, setContract] = useState(null);

  useEffect(() => {
    const init = async () => {
      const { address, status } = await getCurrentWalletConnected();

      setWallet(address);
      setStatus(status);

      addWalletListener();
    }
    init();
  }, []);

  useEffect(() => {
    const initContract = async () => {
      const myContract = await new web3.eth.Contract(contractAbi, contractAddress);
      setContract(myContract);
    }
    initContract();
  }, []);

  useEffect(() => {
    getCurrentNetwork();
    if (window.ethereum) {
      window.ethereum.on('chainChanged', getCurrentNetwork);
    }
  }, []);

  const getCurrentNetwork = async () => {
    if (window.ethereum) {
      try {
        const networkId = await window.ethereum.request({ method: 'net_version' });
        switch (networkId) {
          case "1":
            setNetworkName('Ethereum Mainnet');
            break;
          case "7171":
            setNetworkName('Bitrock Network');
            break;
          default:
            setNetworkName('Unknown');
        }
      } catch (err) {
        console.error(err);
        setNetworkName('Error');
      }
    } else {
      setNetworkName('MetaMask not installed');
    }
  };

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
      setStatus("MetaMask is not installed. Please install it to interact with this app.");
    }
  }

  function incrementQuantity() {
    if (quantityIdx < 4) {
      quantityIdx = quantityIdx + 1;
      setQuantityIdx(quantityIdx);
      setQuantity(allowedQuantities[quantityIdx]);
    }
  }

  function decrementQuantity() {
    if (quantityIdx > 0) {
      quantityIdx = quantityIdx - 1;
      setQuantityIdx(quantityIdx);
      setQuantity(allowedQuantities[quantityIdx]);
    }
  }

  const connectWalletPressed = async () => {
    const walletResponse = await connectWallet();
    setStatus(walletResponse.status);
    setWallet(walletResponse.address);
  };

  const onMintPressed = async () => {
    if (!window.ethereum) {
      setStatus("MetaMask is not installed. Please install it to interact with this app.");
      return;
    }
    if (networkName !== 'Bitrock Network') {
      setStatus("Please switch to the Bitrock Network to mint.");
      return;
    }
    if (walletAddress === "") {
      setStatus("Please connect your wallet on the top right.")
    } else {
      const { success, status } = await mintNFT(myContract, walletAddress, quantity, priceMap[quantity]);
      setStatus(status);
    }
  };

  // INTERACT.js //
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const addressArray = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        return {
          status: "Choose how many Punk Rocks you would like to mint!",
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
        status: "MetaMask is not installed. Please install it to interact with this app.",
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
            status: "Choose how many Punk Rocks you would like to mint!",
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
        status: "MetaMask is not installed. Please install it to interact with this app.",
      };
    }
  };
  
  const mintNFT = async (contract, walletAddress, quantity, costEth) => {
    window.contract = contract;
  
    try {
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
  
  return (
    <div>        
        {/* <Minter></Minter> */}

        <div className="Minter">
        
          <nav className="navbar">
              <div className="navbarcontainer">
              <a href="https://punkrocksnft.xyz/" target="_blank" rel="noopener noreferrer" className="h2-link"><h2 className="h2">Punk Rocks</h2></a>
              </div>
              <button className="btn-2 color-1" id="walletButton" onClick={connectWalletPressed}>
                {walletAddress.length > 0 ? (
                String(walletAddress).substring(0, 5) +
                "..." +
                String(walletAddress).substring(38)
                ) : (
                "Connect Wallet"
                )}
              </button>
          
          </nav>

          <section className="mint" id="mint">
            <img src="./images/1.png"></img>
            <div style = {{textAlign: "center", color: "white"}}> {quantity}</div>
            <div className="row">
              <button style = {{color: "red", width: "20px"}}onClick={decrementQuantity}>-</button>
              <button style = {{color: "red", width: "20px"}}onClick={incrementQuantity}>+</button>
            </div>
            <p id="status" style={{textAlign: "center", color: "red"}}>{status}</p>
            <br></br>
            <button className="btn-hover color-1" id="mintButton" onClick={onMintPressed}>MINT</button>
            <button className="network-button">Network: {networkName}</button>
          </section>
          </div>
    </div>
  );
}

export default App;
