// src/App.js

import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import AddJob from './components/AddJob';
import contractABI from './contract-abi.json'; // Your contract ABI

function App() {
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const init = async () => {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contractAddress = 'YOUR_CONTRACT_ADDRESS'; // Replace with your contract address
      const fairHiringContract = new ethers.Contract(contractAddress, contractABI, signer);
      setContract(fairHiringContract);
    };
    init();
  }, []);

  return (
    <div>
      <h1>FairHiring Interface</h1>
      {contract && <AddJob contract={contract} />}
      {/* Include other components here and pass the contract as a prop */}
    </div>
  );
}

export default App;
