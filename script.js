//script.js

import User from "./user.js";
import UserList from "./userList.js";
import VoteChain from "./voteChain.js";
import Proposal from "./proposal.js";
import Vote from "./vote.js";
import { handleVoting, showVoteChain } from "./handleVoting.js";
import { showProposalForm } from "./createProposalForm.js";

// if (localStorage.getItem("loggedIn") === "true") {
//   showProposalForm();
// }

function generateRandomUser(i) {
  let name = "test" + (i + 1);
  let password = "test" + (i + 1);
  return new User(name, password, i + 1);
}

// Create a list of users
let users = new UserList();

// Create 10 random users and add them to the list
function generateUsers() {
  for (let i = 0; i < 10; i++) {
    let user = generateRandomUser(i);
    users.addUser(user);
    // console.log("Users", user)
  }
}

// Call generateUsers and handleLogin functions when the page loads
window.addEventListener("load", () => {
  generateUsers();
  handleLogin();
  //handleVoting();
  showProposalForm();

  let allProposals = localStorage.getItem("proposals");
  if (allProposals) {
    allProposals = JSON.parse(allProposals);
    for (let key in allProposals) {
      let prop = allProposals[key];
      handleVoting(prop.id);
    }
  }
  showLogoutBtn();
});

let logoutBtn = document.getElementById("logout");
logoutBtn.addEventListener("click", (event) => {
  event.preventDefault();
  logout();
});

function showLogoutBtn() {
  if (localStorage.getItem("loggedIn") == "true") {
    document.getElementById("logout-btn").style.display = "block";
    document.getElementById("user-id-display").innerHTML =
      localStorage.getItem("username");
  } else {
    document.getElementById("logout-btn").style.display = "none";
  }
}

function handleLogin() {
  let loginName = document.getElementById("loginName");
  let loginPassword = document.getElementById("loginPassword");
  let loginBtn = document.getElementById("loginBtn");

  // Add event listener to login button
  if (loginBtn) {
    loginBtn.addEventListener("click", async () => {
      // Search for a user with a matching name in the list of users
      let foundUser = users.users.find((user) => user.name === loginName.value);
      // If a user is found, check if the entered password matches the user's password
      if (foundUser) {
        let isPasswordCorrect = await foundUser.checkPassword(
          loginPassword.value
        );
        if (isPasswordCorrect) {
          localStorage.setItem("loggedIn", "true");
          let userId = "Kungsgatan" + " " + foundUser.id;
          localStorage.setItem("userId", userId);
          localStorage.setItem("username", loginName.value);
          window.location.reload();
          // Show proposal form and handle voting for logged in user
          //showProposalForm();
          //handleVoting();
        }
      }
    });
  }
}

function logout() {
  localStorage.setItem("loggedIn", "false");
  window.location.reload();
  
}

// Show proposal from local storage on page
let proposal = localStorage.getItem("proposal");
if (proposal) {
  let proposalDiv = document.createElement("div");
  proposalDiv.innerHTML = `<h3>Motions:</h3> <p>${proposal}</p>`;
  document.body.appendChild(proposalDiv);
}

// Show vote chain from local storage on page
showVoteChain();
