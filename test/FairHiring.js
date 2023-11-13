

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

    // To deploy our contract, we just call deploy() and await for it to be deployed(), which happens once its transaction has been mined.
    fairHiring = await FairHiring.deploy();
    await fairHiring.deployed();
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
      const candidateId = 0; // assuming a candidate ID you would have added
      const experiencePoints = 5;
      const educationPoints = 3;
      const skillPoints = 2;

      // Assuming a scoreCandidate function exists and HR manager can score a candidate
      await fairHiring.connect(HRManager).scoreCandidate(candidateId, experiencePoints, educationPoints, skillPoints);

      // Get the candidate's score to verify the correct score has been calculated
      const candidateScore = await fairHiring.connect(HRManager).getCandidateScore(candidateId);
      const expectedTotalScore = experiencePoints + educationPoints + skillPoints;
      expect(candidateScore.totalScore).to.equal(expectedTotalScore);
    });
  });

  // Additional tests can be added here
});
