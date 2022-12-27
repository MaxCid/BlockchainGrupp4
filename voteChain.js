import Proposal from "./proposal.js";

export default class VoteChain {
  constructor() {
    this.chain = [];
  }

  addVote(vote) {
  // Set the previous hash of the vote to the hash of the last vote in the chain
  if (this.chain.length > 0) {
    vote.previousHash = this.chain[this.chain.length - 1].hash;
  }
  // Calculate the hash of the new vote and add it to the chain
  vote.mineBlock(4).then(() => {
    this.chain.push(vote);
    localStorage.setItem("vote", JSON.stringify(this.chain));
  });
}


  getLastVote() {
    if (this.chain.length === 0){
      return { yesVotes: 0, noVotes: 0}
    }
    return this.chain[this.chain.length - 1];
  }
  getVoteChain() {
    return JSON.parse(localStorage.getItem("vote"));
  }
  validateChain() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }

      if (currentBlock.prevHash !== previousBlock.hash) {
        return false;
      }
    }

    return true;
  }
}