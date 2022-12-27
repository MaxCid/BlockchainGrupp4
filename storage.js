//storage.js

import Proposal from "/proposal.js";

export default class Storage {
  constructor() {
    this.suggestion = [this.createGenesisBlock()];
    this.difficulty = 3;
  }

  createGenesisBlock() {
    return new Proposal({
      proposalTitle: "Genesis",
      Information: "first block",
    });
  }

  getLatestSuggestion() {
    // HÄMTA FÖREGÅENDE TID
    return this.suggestion[this.suggestion.length - 1];
  }

  async addSuggestion(newSuggestion) {
    // FÅNGA OCH PUSHA IN NYA TIDER
    // SPARA ÄVEN TIDIGARE HASH
    newSuggestion.prevHash = this.getLatestSuggestion().hash;
    // MAJNA
    newSuggestion.mineBlock(this.difficulty);
    // HASHA
    newSuggestion.hash = await newSuggestion.calculateHash();
    // PUSHA
    this.suggestion.push(newSuggestion);
  }
}
