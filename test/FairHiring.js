

const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");

const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("FairHiring", function () {
  let fairHiring;
  let HRManager, candidate;

  beforeEach(async function () {
    // Get the ContractFactory and Signers here.
    const FairHiring = await ethers.getContractFactory("FairHiring");
    [HRManager, candidate] = await ethers.getSigners();
  
    // Deploy the contract
    fairHiring = await FairHiring.deploy();
    // There's no need to call `deployed()` as `deploy()` already waits for the contract to be mined.
  });
  
  

  // Test case: checking job posting
  describe("Job management", function () {
    it("should allow the HR manager to add a job", async function () {
      const jobTitle = "Developer";
      const jobDescription = "Responsible for developing smart contracts";

      // Use the HR manager to add a job
      await fairHiring.connect(HRManager).addJob(jobTitle, jobDescription);

      // Get the job details to verify the correct job has been added
      const job = await fairHiring.jobs(0); // assuming the first job has index 0
      expect(job.title).to.equal(jobTitle);
      expect(job.description).to.equal(jobDescription);
      expect(job.isActive).to.be.true;
    });
  });

  // Test case: scoring a candidate
describe("Candidate scoring", function () {
  it("should correctly score a candidate", async function () {
    // First, add a candidate
    // Replace 'addCandidate' with the actual function name you use to add a candidate,
    // and provide necessary arguments as required by that function
    await fairHiring.connect(HRManager).addCandidate(/* candidate details */);

    // The candidateId should be set to the index of the added candidate
    // Assuming it is the first candidate and has an id of 0
    const candidateId = 0;
    const experiencePoints = 5;
    const educationPoints = 3;
    const skillPoints = 2;

    // Now you can score the candidate
    await fairHiring.connect(HRManager).scoreCandidate(candidateId, experiencePoints, educationPoints, skillPoints);

    // After scoring, retrieve the candidate's score to verify the correct score has been calculated
    const candidateScore = await fairHiring.connect(HRManager).getCandidateScore(candidateId);
    const expectedTotalScore = experiencePoints + educationPoints + skillPoints;

    // Adjust the way you access the total score if your contract uses a different structure
    expect(candidateScore.totalScore).to.equal(expectedTotalScore);
  });
});
