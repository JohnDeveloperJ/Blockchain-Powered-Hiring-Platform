import React, { useState } from 'react';
import { ethers } from 'ethers';

function AddJob({ contract }) {
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');

  const handleAddJob = async () => {
    // Call the addJob function from the smart contract
    const tx = await contract.addJob(jobTitle, jobDescription);
    await tx.wait();
    alert('Job added!');
  };

  return (
    <div>
      <input
        value={jobTitle}
        onChange={(e) => setJobTitle(e.target.value)}
        placeholder="Job Title"
      />
      <input
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
        placeholder="Job Description"
      />
      <button onClick={handleAddJob}>Add Job</button>
    </div>
  );
}

export default AddJob;
