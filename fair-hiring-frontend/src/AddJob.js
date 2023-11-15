import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import contractABI from './path_to_ABI.json'; // ABI of your contract

const contractAddress = "YOUR_CONTRACT_ADDRESS";

function App() {
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [newJobTitle, setNewJobTitle] = useState('');
  const [newJobDescription, setNewJobDescription] = useState('');

  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(contractAddress, contractABI, provider.getSigner());
        setProvider(provider);
        setContract(contract);
        fetchJobs();
      } else {
        console.error("Ethereum object not found, install MetaMask.");
      }
    };

    init();
  }, []);

  const fetchJobs = async () => {
    if (contract) {
      const jobCount = await contract.jobs.length;
      let jobList = [];
      for (let i = 0; i < jobCount; i++) {
        let job = await contract.jobs(i);
        jobList.push(job);
      }
      setJobs(jobList);
    }
  };

  const handleAddJob = async () => {
    if (contract) {
      await contract.addJob(newJobTitle, newJobDescription);
      fetchJobs(); // Refresh the job list
    }
  };

  return (
    <div className="App">
      <h1>Fair Hiring Interface</h1>
      <div>
        <input 
          type="text" 
          placeholder="Job Title" 
          value={newJobTitle} 
          onChange={(e) => setNewJobTitle(e.target.value)} 
        />
        <textarea 
          placeholder="Job Description" 
          value={newJobDescription} 
          onChange={(e) => setNewJobDescription(e.target.value)} 
        />
        <button onClick={handleAddJob}>Add Job</button>
      </div>
      <div>
        <h2>Job List</h2>
        {jobs.map((job, index) => (
          <div key={index}>
            <h3>{job.title}</h3>
            <p>{job.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
