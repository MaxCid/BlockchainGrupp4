export default LogoutBtn;

class LogoutBtn {
    
}

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
  