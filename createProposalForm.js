//createProposalForm.js 

export function showProposalForm() {
    // Check if user is logged in
    if (localStorage.getItem("loggedIn") === "true") {
      // Hide login form
      let loginForm = document.getElementById("loginForm");
      loginForm.innerHTML = "";
  
      // Display any existing proposals on the page
      let proposalsDiv = document.createElement("div");
      proposalsDiv.innerHTML = `<h3>Motions:</h3>`;
      let proposals = JSON.parse(localStorage.getItem("proposals")) || [];
      proposals.forEach((proposal) => {
        let proposalP = document.createElement("p");
        proposalP.textContent = proposal;
        proposalsDiv.appendChild(proposalP);
      });
      document.body.appendChild(proposalsDiv);
  
      // Create proposal form
      let proposalForm = document.createElement("form");
      proposalForm.innerHTML = `<h3>Skriv en motion</h3> <textarea id="proposalText"></textarea> <button id="submitProposalBtn">Skicka</button>`;
      document.body.appendChild(proposalForm);
      // Add event listener to submit button
      let submitBtn = document.getElementById("submitProposalBtn");
      submitBtn.addEventListener("click", (event) => {
        event.preventDefault();
        // Get proposal text
        let proposalText = document.getElementById("proposalText").value;
        // Get any existing proposals from local storage
        let proposals = JSON.parse(localStorage.getItem("proposals")) || [];
        // Add new proposal to the array
        proposals.push(proposalText);
        // Save updated array in local storage
        localStorage.setItem("proposals", JSON.stringify(proposals));
        // Display the new proposal on the page
        let proposalsDiv = document.createElement("div");
        let proposalP = document.createElement("p");
        proposalP.textContent = proposalText;
        proposalsDiv.appendChild(proposalP);
        document.body.appendChild(proposalsDiv);
      });
    }
  }
  
  