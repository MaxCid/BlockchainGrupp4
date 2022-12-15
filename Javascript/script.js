// Import section
import LoginButton from "./login.js";
import user from "./user.js";

//////////////////////
////    Inputs    ////
//////////////////////

// input variables for login page
const usernameInput = document.getElementById("usernameInput");
const passwordInput = document.getElementById("passwordInput");
const loginBtn = document.getElementById("loginBtn");

//inputs for account page
const logoutBtn = document.getElementById("logoutBtn");

// variables for DOM changes
const loginPage = document.getElementById("loginPage");
const linkCreateAccount = document.getElementById("linkCreateAccount");
const accountPage = document.getElementById("accountPage");
const createAccountPage = document.getElementById("createAccountPage");

// special variables
let userid;
let accountName;
let loginSessions = JSON.parse(localStorage.getItem("accounts"));

///////////////////////////////////////////
////   functions for the whole page   ////
/////////////////////////////////////////


window.onload = function () {
  console.log("Refresh!");
   localStorage.setItem("loginSessions", JSON.stringify(accounts));
   
}

if (localStorage.getItem("loginSession")) {
  console.log("getting shit works");
  let username = JSON.parse(localStorage.getItem("loginSession"));

  loginPage.classList.add("formHidden");
  accountPage.classList.remove("formHidden");

  console.log("USERNAME:", username);
  userOnline.innerHTML = `Hello ${username.user}!`;
}

let accounts = [];

if (localStorage.getItem("loginSessions")){
  accounts = JSON.parse(localStorage.getItem("accounts"));
  localStorage.setItem("accounts", JSON.stringify(accounts));
}else{
  accounts = [
    {id:1, user:'user1', password:"test",},
    {id:2, user:'user2', password: "test",},
    {id:3, user:'user3', password:"test",},
    {id:4, user:'user4', password:'test',},
    ];
  localStorage.setItem("accounts", JSON.stringify(accounts));
}


console.log("localestorages has been created");
loginBtn.addEventListener("click", () => {
  loggedIn();
});
