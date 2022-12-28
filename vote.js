// vote.js

import User from "./user.js";

export default class Vote {
  constructor(data, index = 0, prevHash = "", vote, voterId) {
    this.index = index;
    this.data = data;
    this.vote = vote;
    this.voterId = voterId;
    this.timestamp = Date.now();
    this.prevHash = prevHash;
    this.hash = this.calculateHash();
    this.nonce = 0;
  }

  async mineBlock(difficulty) {
    // Generate a random nonce to use for hashing
    let nonce = Math.floor(Math.random() * 1000);
    // Create the data to be hashed (vote, voterId, prevHash, and nonce)
    let data = this.vote + this.voterId + this.prevHash + nonce;
    // Calculate the hash of the data
    let hash = await this.calculateHash(data);
    // If the hash does not start with the required number of zeros, increase the nonce and try again
    while (hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
      nonce++;
      data = this.vote + this.voterId + this.prevHash + nonce;
      hash = await this.calculateHash(data);
    }
    // Set the hash of the vote to the calculated hash
    this.hash = hash;
  }

  async calculateHash() {
    let msgInt8 = new TextEncoder().encode(
      "salt1234salt" +
        JSON.stringify(this.data) +
        this.index +
        this.timestamp +
        this.prevHash +
        this.nonce
    );
    let hashBuffer = await crypto.subtle.digest("SHA-256", msgInt8);
    let hashArray = Array.from(new Uint8Array(hashBuffer));
    let hashHex = hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    //console.log(hashHex)

    return Promise.resolve(hashHex);
  }
}
