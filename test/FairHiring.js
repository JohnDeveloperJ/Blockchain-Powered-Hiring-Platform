const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("FairHiring", function () {
  let fairHiring;
  let HRManager, candidate;

  beforeEach(async function () {
    // Get the ContractFactory and Signers here.
    const FairHiring = await ethers.getContractFactory("FairHiring");
    [HRManager, candidate] = await ethers.getSigners();

    // Deploy the contract and assign it to fairHiring
    fairHiring = await FairHiring.deploy();
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
      // Add a candidate before attempting to score them
      // This is just an example. Replace the parameters with what your actual addCandidate function expects
      await fairHiring.connect(HRManager).addCandidate("Alice", "Blockchain Developer", 5); // Add candidate logic needs to be implemented as per your contract

      const candidateId = 0; // The ID of the candidate you've just added, assuming it's the first and has ID 0
      const experiencePoints = 5;
      const educationPoints = 3;
      const skillPoints = 2;

      // Now you can score the candidate
      await fairHiring.connect(HRManager).scoreCandidate(candidateId, experiencePoints, educationPoints, skillPoints);

      // Retrieve the candidate's score to verify the correct score has been calculated
      // Assuming getCandidateScore returns a struct or an object with a totalScore field
      const candidateScore = await fairHiring.connect(HRManager).getCandidateScore(candidateId);
      const expectedTotalScore = experiencePoints + educationPoints + skillPoints;

      // Assert the expected total score
      expect(candidateScore.totalScore).to.equal(expectedTotalScore);
    });
  });
});
