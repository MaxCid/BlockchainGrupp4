import UserList from "./userList.js";
import User from "./user.js";
import { inloggad } from "/loggedIn.js";
import Storage from "./storage.js";
import Proposal from "./proposal.js";

 if (localStorage.getItem("loggedIn") === "true") {
   inloggad();
 }
// Generate a random name and password for a User object
function generateRandomUser(i) {
  let name = "Kungsgatan" + (i + 1);
  let password = "test" + (i + 1);
  return new User(name, password);
}

// Create a list of users
let users = new UserList();

// Create 10 random users and add them to the list
for (let i = 0; i < 10; i++) {
  let user = generateRandomUser(i);
  users.addUser(user);
}

let loginName = document.getElementById("loginName");
let loginPassword = document.getElementById("loginPassword");
let loginBtn = document.getElementById("loginBtn");

if (loginBtn){
loginBtn.addEventListener("click", async () => {
  // Search for a user with a matching name in the list of users
  let foundUser = users.users.find((user) => user.name === loginName.value);
  // If a user is found, check if the entered password matches the user's password
  if (foundUser) {
    let isPasswordCorrect = await foundUser.checkPassword(loginPassword.value);
    if (isPasswordCorrect) {
        localStorage.setItem("loggedIn", "true");
      //SKRIV EN FUNKTION HÄR VAD SOM SKA HÄNDA IFALL RÄTT LÖSEN//
      let userId = foundUser.id;
      localStorage.setItem("userId", userId);
    }
    inloggad();
  }

 
})
};
