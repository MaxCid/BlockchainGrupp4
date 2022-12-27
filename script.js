//script.js 

import User from "./user.js";
import UserList from "./userList.js";
import VoteChain from "./voteChain.js";
import Proposal from "./proposal.js";
import Vote from "./vote.js";
import { handleVoting } from "./handleVoting.js";
import { showProposalForm } from "./createProposalForm.js";


// if (localStorage.getItem("loggedIn") === "true") {
//   showProposalForm();
// }


function generateRandomUser(i) {
let name = "Kungsgatan" + (i + 1);
let password = "test" + (i + 1);
return new User(name, password);
}

// Create a list of users
let users = new UserList();

// Create 10 random users and add them to the list
function generateUsers(){
for (let i = 0; i < 10; i++) {
let user = generateRandomUser(i);
users.addUser(user);
console.log("Users", user)
    }
}

// Call generateUsers and handleLogin functions when the page loads
window.addEventListener("load", () => {
generateUsers();
handleLogin();
handleVoting();
showProposalForm();
});


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
let userId = foundUser.id;
localStorage.setItem("userId", userId);
// Show proposal form and handle voting for logged in user
showProposalForm();
handleVoting();
}
}
});
}
}



// Show proposal from local storage on page
let proposal = localStorage.getItem("proposal");
if (proposal) {
let proposalDiv = document.createElement("div");
proposalDiv.innerHTML = `<h3>Motion:</h3> <p>${proposal}</p>` ;
document.body.appendChild(proposalDiv);
}

// Show vote chain from local storage on page
let voteChain = new VoteChain();
let votes = voteChain.getVoteChain();
if (votes) {
let voteList = document.createElement("ul");
votes.forEach((vote) => {
let voteItem = document.createElement("li");
voteItem.textContent = `${vote.vote} (${vote.voterId})`;
voteList.appendChild(voteItem);
});
document.body.appendChild(voteList);
}