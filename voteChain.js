//voteChain.js

import Proposal from "./proposal.js";
import Vote from "./vote.js";

export default class VoteChain {
  constructor() {
    this.createGenesisBlock();

    if (JSON.parse(localStorage.getItem("votes"))) {
      this.chain = JSON.parse(localStorage.getItem("votes"));
    } else {
      this.chain = [this.vote];
    }
  }

  createGenesisBlock() {
    this.vote = new Vote("", "");
    this.vote.mineBlock(0).then(() => {
      // return vote;
    });
  }

  // return new Proposal(
  //   { proposalTitle: "Genesis", Information: "first block", }
  // );
  // if (!this.genesisCreated) {
  //   this.genesisCreated = true;
  //   return new Vote(
  //     { proposalTitle: "Genesis", Information: "first block", }
  //   );
  // }

  addVote(vote) {
    // Set the previous hash of the vote to the hash of the last vote in the chain
    if (this.chain.length > 0) {
      vote.prevHash = this.chain[this.chain.length - 1].hash;
    }

    // Calculate the hash of the new vote and add it to the chain
    vote.mineBlock(0).then(() => {
      this.chain.push(vote);
      localStorage.setItem("votes", JSON.stringify(this.chain));
    });
  }

  getLastVote() {
    if (this.chain.length === 0) {
      return { yesVotes: 0, noVotes: 0 };
    }
    return this.chain[this.chain.length - 1];
  }

  getVoteChain() {
    return JSON.parse(localStorage.getItem("votes"));
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
