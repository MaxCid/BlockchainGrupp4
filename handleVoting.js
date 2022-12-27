// handleVoting.js;
import VoteChain from "./voteChain.js";
import Vote from "./vote.js";
export function handleVoting(proposalId) {
  // Check if user is logged in
  if (localStorage.getItem("loggedIn") === "true") {
    // Retrieve proposals array from local storage
    let proposals = JSON.parse(localStorage.getItem("proposals")) || [];
    // Find the proposal with the matching ID
    let proposal = proposals.find((p) => p.id === proposalId);
    // Display the proposal text on the page
    let proposalDiv = document.createElement("div");
    proposalDiv.innerHTML = `<h3>${proposals}</h3>`;
    document.body.appendChild(proposalDiv);
    // Create voting form
    let voteForm = document.createElement("form");
    voteForm.innerHTML = `<label for="yesVote">Ja</label> <input type="radio" name="vote" id="yesVote" value="yes"> <label for="noVote">Nej</label> <input type="radio" name="vote" id="noVote" value="no"> <label for="abstainVote">Avstå</label> <input type="radio" name="vote" id="abstainVote" value="abstain"> <button id="submitVoteBtn">Rösta</button>`;
    document.body.appendChild(voteForm);
    // Add event listener to submit button
    let submitBtn = document.getElementById("submitVoteBtn");
    submitBtn.addEventListener("click", (event) => {
      event.preventDefault();
      // Get selected vote value
      let vote = document.querySelector('input[name="vote"]:checked').value;
      // Create new vote object and add it to the vote chain
      let voteChain = new VoteChain();
      let newVote = new Vote(localStorage.getItem("loggedInUser"), vote, proposalId);
      voteChain.addVote(newVote);
      // Update proposal with new vote count
      proposal.yesVotes += vote === "yes" ? 1 : 0;
      proposal.noVotes += vote === "no" ? 1 : 0;
      proposal.abstainVotes += vote === "abstain" ? 1 : 0;
      // Save updated proposal in local storage
      proposals = proposals.map((p) => (p.id === proposalId ? proposal : p));
      localStorage.setItem
      // Get any existing votes from local storage
      let votes = JSON.parse(localStorage.getItem("votes")) || [];
      // Add new vote to the array
      votes.push(newVote);
      // Save updated array in local storage
      localStorage.setItem("votes", JSON.stringify(votes));
      // Show all votes on page
      let votesDiv = document.createElement("div");
      votesDiv.innerHTML = `<h3>Röster:</h3>`;
      votes.forEach((vote) => {
      let voteP = document.createElement("p");
      voteP.textContent = `${vote.user}: ${vote.value}`;
      votesDiv.appendChild(voteP);
      });
      document.body.appendChild(votesDiv);
});
}
}





