// input variables for login page
const usernameInput = document.getElementById("usernameInput");
const passwordInput = document.getElementById("passwordInput");
const loginBtn = document.getElementById("loginBtn");

// input variables for creating account
const createUsername = document.getElementById("createUsername");
const createPassword = document.getElementById("createPassword");
const confirmPassword = document.getElementById("confirmPassword");
const createAccBtn = document.getElementById("createAccBtn");
const linkLogin = document.getElementById("linkLogin");

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

/// storage space for accounts

// (denna kod gör detsamma som nedanför fast den fångar och sparar  den nya användaren
// men raderar arrayen med förbestämda användare.)

// let accounts = [];
// if (!localStorage.getItem("accounts")) {
//   let accounts = [
//     { id: 1, user: "janne", password: "test" },
//     { id: 2, user: "PirateKing", password: "1.piece" },
//     { id: 3, user: "dayman", password: "nightman" },
//     { id: 4, user: "fighterofthe", password: "nightman96" },
//   ];
//   localStorage.setItem("accounts", JSON.stringify(accounts));
//   console.log("localestorages has been created");
// }

// (kod blocken från rad 45 till rad 53 gör så att jag kan fånga arrayen,
// jag kan även lägga till en ny användare och ha en online session samt uppdatera
// och vara kvar online när jag har loggat in med en ny skapad användare, problemet 
// är att när jag uppdaterar sidan i login page så försvinner den nya användaren)


//problemet löst med en window.onload funktion... fråga mig inte en hur det gick till...
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


// login page (get a verification from the inputs and change page)

loginBtn.addEventListener("click", () => {
  loggedIn();
});



function loggedIn() {
  let accounts = JSON.parse(localStorage.getItem("accounts"));
  let username = usernameInput.value;
  let password = passwordInput.value;
  let loginSession = accounts[userid];
  for (i = 0; i < accounts.length; i++) {
    if (username === accounts[i].user && password === accounts[i].password) {
      loginSessionUsers = accounts[i];
      localStorage.setItem("loginSession", JSON.stringify(loginSessionUsers));
      loginSession = JSON.parse(localStorage.getItem("loginSession"));
      console.log("logga användare", loginSessions);
      localStorage.setItem("user", accounts[i].user);
      console.log("you are now online", username);
      userOnline.innerHTML = `Hello ${username}!`;
      loginPage.classList.add("formHidden");
      accountPage.classList.remove("formHidden");

      return;
    }
  }
  console.log("Could not find user");
  inputErrorMsg.innerHTML = "wrong name or password";
}

//the link that takes you to the create an account page

linkCreateAccount.addEventListener("click", () => {
  console.log("link to create acc is working");
  loginPage.classList.add("formHidden");
  createAccountPage.classList.remove("formHidden");
});

// // // Create an account page  ////

createAccBtn.addEventListener("click", () => {
  console.log("workingzzzz");
  createAccountPage.classList.add("formHidden");
  loginPage.classList.remove("formHidden");
  register();
});

function register() {
  if (createPassword.value === confirmPassword.value) {
    let newAccount = {
      id: accounts.length + 1,
      user: createUsername.value,
      password: createPassword.value,
    };
    accounts.push(newAccount);
    localStorage.setItem("accounts", JSON.stringify(accounts));
    alert("användare har lagts till");
  } else {
    alert("användare läggs ej till");
  }
}

// knappen som tar dig tillbaka till loginpage ifall du redan har ett konto.
linkLogin.addEventListener("click", () => {
  console.log("workingforreals");
  createAccountPage.classList.add("formHidden");
  loginPage.classList.remove("formHidden");
});

//  // logout
logoutBtn.addEventListener("click", () => {
  console.log("you are now logged out");
  accountPage.classList.add("formHidden");
  loginPage.classList.remove("formHidden");
  logoutSession();
  console.log(loginSessions);
});

logoutSession = () => {
  console.log("you cease to exist");
  localStorage.removeItem("loginSession");
  localStorage.removeItem("user");
  // inputErrorMsg.classlist.add("formHidden")
};
