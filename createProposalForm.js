//createProposalForm.js

import { handleVoting } from "./handleVoting.js";

export function showProposalForm() {
  // Check if user is logged in
  if (localStorage.getItem("loggedIn") === "true") {
    // Hide login form
    let loginForm = document.getElementById("loginForm");
    loginForm.innerHTML = "";

    // Create proposal form
    let proposalForm = document.createElement("form");
    proposalForm.innerHTML = `<h3>Skriv ett förslag:</h3> <input type="text" id="proposalName" placeholder="Titel på förslag"><br> <textarea id="proposalText" placeholder="Skriv ditt förslag här"></textarea><br> <button id="submitProposalBtn">Skicka</button>`;
    document.body.appendChild(proposalForm);
    // Add event listener to submit button
    let submitBtn = document.getElementById("submitProposalBtn");
    submitBtn.addEventListener("click", (event) => {
      event.preventDefault();
      // Get proposal text
      let proposalName = document.getElementById("proposalName").value;
      let proposalText = document.getElementById("proposalText").value;
      let props = localStorage.getItem("proposals");
      let id = 1;
      if (props) {
        id = JSON.parse(props).length + 1;
      }
      let fullProposal = {
        id: id,
        Namn: proposalName,
        Förslag: proposalText,
        yesVotes: 0,
        noVotes: 0,
        abstainVotes: 0,
      };
      // Get any existing proposals from local storage
      let proposals = JSON.parse(localStorage.getItem("proposals")) || [];
      // Add new proposal to the array
      proposals.push(fullProposal);
      // Save updated array in local storage
      localStorage.setItem("proposals", JSON.stringify(proposals));
      // Display the new proposal on the page
      let proposalsDiv = document.createElement("div");
      let proposalP = document.createElement("p");
      proposalP.textContent = `${proposalName}: ${proposalText};`;
      proposalsDiv.appendChild(proposalP);
      //document.body.appendChild(proposalsDiv);
      handleVoting(id);
    });
  }
}
