// handleVoting.js;
import VoteChain from "./voteChain.js";
import Vote from "./vote.js";

export function handleVoting(proposalId) {
  function motionResult(proposal) {
    let result = "";
    if (proposal.yesVotes >= 5) {
      result = "PASSED";
    } else if (
      parseInt(proposal.noVotes) + parseInt(proposal.abstainVotes) >=
      5
    ) {
      result = "REJECTED";
    }
    return result;
  }

  function appendProposalForm(proposal) {
    // Display the proposal text on the page
    let proposalDiv = document.createElement("div");
    proposalDiv.innerHTML = `<h3>${proposal.Namn + " : "}</h3><p>${
      " " + proposal.Förslag
    }</p>`;
    document.body.appendChild(proposalDiv);
    // Create voting form
    let voteForm = document.createElement("form");
    voteForm.innerHTML = `<label for="yesVote[${proposalId}]">Ja</label> 
                                  <input type="radio" name="vote[${proposalId}]" id="yesVote[${proposalId}]" value="yes"> 
                                  <label for="noVote[${proposalId}]">Nej</label>
                                  <input type="radio" name="vote[${proposalId}]" id="noVote[${proposalId}]" value="no">
                                  <label for="abstainVote[${proposalId}]">Avstå</label>
                                  <input type="radio" name="vote[${proposalId}]" id="abstainVote[${proposalId}]" value="abstain">
                                  <button id="submitVoteBtn${proposalId}" class="submitVoteBtn">Rösta</button>`;
    document.body.appendChild(voteForm);

    let proposalV = document.createElement("p");
    let hr = document.createElement("hr");
    proposalV.textContent = `Yes: ${proposal.yesVotes}  No: ${proposal.noVotes} Abstain: ${proposal.abstainVotes} `;
    document.body.appendChild(proposalV);
    let result = motionResult(proposal);

    if (result != "") {
      let proposalResult = document.createElement("p");
      if (result == "PASSED") {
        proposalResult.style.color = "green";
      } else {
        proposalResult.style.color = "red";
      }
      proposalResult.textContent = `${result}`;
      document.body.appendChild(proposalResult);
      document
        .getElementById(`submitVoteBtn${proposalId}`)
        .setAttribute("disabled", "disabled");
    }

    document.body.appendChild(hr);
  }

  function isItDuplicateCote(proposal, newVote) {
    //return false
    let userId = localStorage.getItem("userId");
    let votes = JSON.parse(localStorage.getItem("votes")) || [];
    for (let key in votes) {
      let vote = votes[key];
      if (
        vote.voterId == userId &&
        vote.data.proposal.id == proposal.id &&
        vote.vote == newVote
      ) {
        return true;
      }
    }
    return false;
  }

  // Retrieve proposals array from local storage
  let proposals = JSON.parse(localStorage.getItem("proposals")) || [];
  // Find the proposal with the matching ID
  let proposal = proposals.find((p) => p.id === proposalId);
  if (proposal) {
    let result = motionResult(proposal);
    if (
      result != "" ||
      (result == "" && localStorage.getItem("loggedIn") === "true")
    ) {
      appendProposalForm(proposal);

      // Add event listener to submit button
      let submitBtn = document.getElementById("submitVoteBtn" + proposalId);
      submitBtn.addEventListener("click", (event) => {
        event.preventDefault();

        // Get selected vote value
        let vote = document.querySelector(
          `input[name="vote[${proposalId}]"]:checked`
        )?.value;
        if (vote == undefined) {
          alert("please select an option");
          return -1;
        }

        if (isItDuplicateCote(proposal, vote)) {
          alert("You voted before for this motion");
          return -1;
        }

        let userId = localStorage.getItem("userId");
        let votes = JSON.parse(localStorage.getItem("votes")) || [];
        for (let key in votes) {
          let oldVote = votes[key];
          if (
            oldVote.voterId == userId &&
            oldVote.data.proposal.id == proposal.id &&
            oldVote.vote != vote
          ) {
            for (let key2 in proposals) {
              let prop = proposals[key2];
              if (prop.id == proposal.id) {
                prop.yesVotes = parseInt(prop.yesVotes);
                prop.noVotes = parseInt(prop.noVotes);
                prop.abstainVotes = parseInt(prop.abstainVotes);

                prop.yesVotes += vote === "yes" ? 1 : 0;
                prop.noVotes += vote === "no" ? 1 : 0;
                prop.abstainVotes += vote === "abstain" ? 1 : 0;

                prop.yesVotes -= oldVote.vote === "yes" ? 1 : 0;
                prop.noVotes -= oldVote.vote === "no" ? 1 : 0;
                prop.abstainVotes -= oldVote.vote === "abstain" ? 1 : 0;
                localStorage.setItem("proposals", JSON.stringify(proposals));
              }
            }
            votes[key].vote = vote;
            localStorage.setItem("votes", JSON.stringify(votes));

            window.location.reload();
            return -1;
          }
        }

        // Create new vote object and add it to the vote chain
        let voteChain = new VoteChain();

        let index = JSON.parse(localStorage.getItem("votes"))?.length - 1 || 0;

        let voterId = localStorage.getItem("userId");

        let newVote = new Vote({ proposal }, index, "", vote, voterId);
        newVote.hash.then(function (result) {
          newVote.hash = result;
          let votes = JSON.parse(localStorage.getItem("votes")) || [];
          // Add new vote to the array
          // votes.push(newVote);
          // localStorage.setItem("votes", JSON.stringify(votes));
          voteChain.addVote(newVote);
          showVoteChain();
        });

        // Update proposal with new vote count
        proposal.yesVotes += vote === "yes" ? 1 : 0;
        proposal.noVotes += vote === "no" ? 1 : 0;
        proposal.abstainVotes += vote === "abstain" ? 1 : 0;
        // Save updated proposal in local storage
        localStorage.setItem("proposals", JSON.stringify(proposals));
        // Get any existing votes from local storage

        window.location.reload();
      });
    }
  }
}

export function showVoteChain() {
  let voteChain = new VoteChain();
  let votes = voteChain.getVoteChain();
  if (votes) {
    let voteList = `<ul>`;
    votes.forEach((vote) => {
      if (vote.vote) {
        voteList += `<li>`;
        voteList += `${vote.vote} (${vote.voterId})`;
        voteList += `</li>`;
      }
    });
    voteList += `</ul>`;
    //document.body.appendChild(voteList);
    document.getElementById("voteResult").innerHTML = voteList;
  }
}
