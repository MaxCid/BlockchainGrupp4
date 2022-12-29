// handleVoting.js;
import VoteChain from "./voteChain.js";
import Vote from "./vote.js";

export function handleVoting(proposalId) {
  function motionResult(proposal) {
    let result = "";
    if (proposal.yesVotes > 5) {
      result = "GODKÄND";
    } else if (
      parseInt(proposal.noVotes) + parseInt(proposal.abstainVotes) >=
      5
    ) {
      result = "AVVISAD";
    }
    return result;
  }

  function appendProposalForm(proposal) {
    // Display the proposal text on the page
    let skrivProposal = document.getElementById("skrivProposal");
    let proposalDiv = document.createElement("div");
    proposalDiv.innerHTML = `<br>FÖRSLAG #${proposalId} <br> <h3 style="display: inline-block; height: 0px"> ${
      proposal.Namn + ""
    }</h3><p>${" " + proposal.Förslag}</p>`;
    skrivProposal.appendChild(proposalDiv);
    // Create voting form
    let voteForm = document.createElement("form");
    voteForm.innerHTML = `<label for="yesVote[${proposalId}]">Ja</label> 
                                  <input type="radio" name="vote[${proposalId}]" id="yesVote[${proposalId}]" value="yes"> 
                                  <label for="noVote[${proposalId}]">Nej</label>
                                  <input type="radio" name="vote[${proposalId}]" id="noVote[${proposalId}]" value="no">
                                  <label for="abstainVote[${proposalId}]">Avstå</label>
                                  <input type="radio" name="vote[${proposalId}]" id="abstainVote[${proposalId}]" value="abstain">
                                  <button id="submitVoteBtn${proposalId}" class="submitVoteBtn">Rösta</button>`;
    skrivProposal.appendChild(voteForm);

    let proposalV = document.createElement("p");
    let hr = document.createElement("hr");
    proposalV.textContent = `Ja: ${proposal.yesVotes}  Nej: ${proposal.noVotes} Avstå: ${proposal.abstainVotes} `;
    skrivProposal.appendChild(proposalV);
    let result = motionResult(proposal);

    if (result != "") {
      let proposalResult = document.createElement("p");
      if (result == "GODKÄND") {
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

    skrivProposal.appendChild(hr);

    skrivProposal.style.textAlign = "center";
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
      let submitVoteBtn = document.getElementById("submitVoteBtn" + proposalId);
      submitVoteBtn.addEventListener("click", (event) => {
        event.preventDefault();
        // Get selected vote value
        let vote = document.querySelector(
          `input[name="vote[${proposalId}]"]:checked`
        )?.value;
        if (vote == undefined) {
          alert("Vänligen välj ett alternativ");
          return -1;
        }

        if (isItDuplicateCote(proposal, vote)) {
          alert("Du har redan röstat på detta förslag");
          return -1;
        }

        let proposals = JSON.parse(localStorage.getItem("proposals")) || [];
        let userId = localStorage.getItem("userId");
        let votes = JSON.parse(localStorage.getItem("votes")) || [];
        for (let key in votes) {
          let oldVote = votes[key];
          if (
            oldVote.voterId == userId &&
            oldVote.data.proposal.id == proposal.id &&
            oldVote.vote != vote
          ) {
            /*  for (let key2 in proposals) {
                            let prop = proposals[key2]
                            if (prop.id == proposal.id) {
                                prop.yesVotes = parseInt(prop.yesVotes) || 0
                                prop.noVotes = parseInt(prop.noVotes) || 0
                                prop.abstainVotes = parseInt(prop.abstainVotes) || 0

                                prop.yesVotes += vote === "yes" ? 1 : 0;
                                prop.noVotes += vote === "no" ? 1 : 0;
                                prop.abstainVotes += vote === "abstain" ? 1 : 0;

                                prop.yesVotes -= oldVote.vote === "yes" ? 1 : 0;
                                prop.noVotes -= oldVote.vote === "no" ? 1 : 0;
                                prop.abstainVotes -= oldVote.vote === "abstain" ? 1 : 0;
                                localStorage.setItem('proposals', JSON.stringify(proposals))
                            }
                        }*/
            /* votes[key].vote = vote
                        localStorage.setItem('votes', JSON.stringify(votes))

                        window.location.reload()*/
            alert("Du har redan röstat! Inte möjligt att ändra din röst");
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
          voteChain.addVote(newVote);
          showVoteChain();
        });

        for (let key3 in proposals) {
          let prop3 = proposals[key3];
          if (prop3.id == proposal.id) {
            // Update proposal with new vote count
            prop3.yesVotes += vote === "yes" ? 1 : 0;
            prop3.noVotes += vote === "no" ? 1 : 0;
            prop3.abstainVotes += vote === "abstain" ? 1 : 0;
            // Save updated proposal in local storage
            localStorage.setItem("proposals", JSON.stringify(proposals));
          }
        }

        window.location.reload();
      });
    }
  }
}

export function showVoteChain() {
  let login = document.getElementById("login");
  let voteChain = new VoteChain();
  let votes = voteChain.getVoteChain();
  let validate = document.createElement("button")
  validate.id = "validate"
  validate.innerText = "Validate"
  validate.addEventListener("click", () => {
  console.log("Börjar validering")
  voteChain.validateChain()
  
 })
 login.appendChild(validate)
  if (votes) {
    let voteList = `<ul>`;
    votes.forEach((vote) => {
      if (vote.vote) {
        voteList += `<li>`;
        voteList += `Användare: <strong>${vote.voterId}</strong> röstade <strong>"${vote.vote}"</strong> på förslag <strong>#${vote.data.proposal.id}</strong>`;
        voteList += `</li>`;
      }
    });
    voteList += `</ul>`;
    //document.body.appendChild(voteList);
    document.getElementById("voteResult").innerHTML = voteList;
    
  }
}
