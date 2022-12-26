//storage.js

import Proposal from "/proposal.js";

export default class Storage {
  constructor() {
    this.suggestion = [this.createGenesisBlock()];
    this.difficulty = 3;
    this.genesisCreated = false;
  }

  createGenesisBlock() {
    // return new Proposal(
    //   { proposalTitle: "Genesis", Information: "first block", }
    // );
    if (!this.genesisCreated) {
      this.genesisCreated = true;
      return new Proposal(
        { proposalTitle: "Genesis", Information: "first block", }
      );
    }
  }

  getLatestSuggestion() {
    // HÄMTA FÖREGÅENDE TID
    if (this.suggestion.length === 0) {
      return undefined;
    }
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
   isChainValid() {
    // VALIDERA VÅR KEDJA
    for (let i = 1; i < this.suggestion.length; i++) {
        const currentSuggestion = this.suggestion[i];
        const prevSuggestion = this.suggestion[i -1];

       // console.log("Testa block", currentBlock, prevBlock);

        let testHash =  currentSuggestion.calculateHash().then(hash => {
            // console.log("testHash", hash);
            if (currentSuggestion.hash !== hash) {
                console.log("INVALID! Not same hash!", currentSuggestion.hash, hash);
                // return false;
            }
        });

        if (currentSuggestion.prevHash !== prevSuggestion.hash) {
            console.log("Invalid: Not same prev hash");
           return false;
        }

        console.log("VALID");
       return true;
    }
}
}
