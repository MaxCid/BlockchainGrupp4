export default LoginButton;
class LoginButton {
    loggedin()
}

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
  