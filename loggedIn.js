// loggedIn.js
// import Storage from "/storage.js";
// import Proposal from "./proposal.js";
// let budget = 1000;

// let suggestion = new Storage();
// let costInput = document.getElementById("costInput");

// let loginForm = document.getElementById("loginForm");
// let proposalBox = document.getElementById("proposalBox");
// let textarea = document.createElement("textarea");

// function printSuggestion() {
//   window.onload = () => {
//     if (!costInput || !costInput.value) {
//       // costInput is not defined or has no value, so do not try to use it
//       return;
//     }
 
//   };
// }

// function inloggad() {
//     if (localStorage.getItem("loggedIn") === "true")
//     {loginForm.innerHTML = "";
    
 
//   // Create a div element
//   let div = document.createElement("div");

//   // Create a form element
//   let form = document.createElement("form");

//   let titleInput = document.createElement("input");
//   titleInput.id = "titleInput";
//   titleInput.type = "text";
//   titleInput.name = "Title";
//   titleInput.placeholder = "Titel";
//   form.appendChild(titleInput);

//   let proposalInput = document.createElement("input");
//   proposalInput.id = "proposalInput";
//   proposalInput.type = "text";
//   proposalInput.name = "Förslag";
//   proposalInput.placeholder = "Skriv ditt förslag här";
//   form.appendChild(proposalInput);

//    let costInput = document.createElement("input");
//    costInput.id = "costInput"
//    costInput.type = "number";
//    costInput.name = "Kostnad";
//    costInput.placeholder = "Pris för ditt förslag";
//    form.appendChild(costInput);

//   // Create a submit button
//   let submitProp = document.createElement("button");
//   submitProp.id = "submitProp";
//   submitProp.type = "submit";
//   submitProp.innerText = "Submit proposal";

//   // Add the submit button to the form
//   form.appendChild(submitProp);

//   // Add the form to the div
//   div.appendChild(form);

//   // Add the div to the document
//   document.body.appendChild(div);

// //    form.addEventListener("submit", function (event) {
// //     event.preventDefault();
// //     //  printSuggestion();
// //     // Other code to handle the form submission
// // // SKAPA NYTT OBJEKT
// // let newSuggestion = {
// //   proposalTitle: proposalTitle.value,
// //   Information: Information.value
// // }

// //     suggestion.addSuggestion(new Proposal(newSuggestion));

    
// //     setTimeout(printSuggestion,100);
// //     console.log("test");
// //     });

// form.addEventListener("submit",  (event) => {
//   event.preventDefault();
//   //  printSuggestion();
//   // Other code to handle the form submission
// // SKAPA NYTT OBJEKT
// l

// let newSuggestion = {
//   proposalTitle: titleInput.value,
//   Information: proposalInput.value,
// };

//   suggestion.addSuggestion(new Proposal(newSuggestion));

  
//   setTimeout(printSuggestion,100);
//   console.log("test");
//   // form.appendChild(proposalTitle);
//   });
// }
// }

//     function suggestionPrint() {
//       suggestion.suggestion.map((e) => {
//         //  console.log("Tiderna för sig", work.data.user);
//         let amounte = budget - parseInt(costInput.value);
//         let suggestionBox = document.createElement("div");
//         suggestionBox.style.border = "1px solid black";
//         suggestionBox.style.padding = "20px";
//         suggestionBox.style.margin = "20px";
  
//         // if (work.data.work < 4) {
//         suggestionBox.style.backgroundColor = "lightgrey";
//         // } else if (work.data.work >= 4 && work.work < 8) {
//         //     timeBox.style.backgroundColor = "orange"
//         // } else {
//         //     timeBox.style.backgroundColor = "red"
//         // }
  
//         suggestionBox.id = e.id;
//         suggestionBox.innerHTML =
//           "<p>" +
//           e.prevHash +
//           "<br/>" +
//           "<strong>" +
//           "Topic: " +
//           e.data.proposalTitle +
//           "</strong>" +
//           "<br/>" +
//           "Information: " +
//           e.data.Information +
//           "<br/>" +
//           "Amount: " +
//           e.amount +
//           amounte +
//           "<br/>" +
//           e.hash +
//           "</>";
//           proposalBox.appendChild(suggestionBox);
        
//       });
//     }

// loggedIn.js
import Storage from "/storage.js";
import Proposal from "./proposal.js";
let budget = 1000;

let suggestion = new Storage();


let loginForm = document.getElementById("loginForm");
// let proposalBox = document.getElementById("proposalBox");
let fullProp = document.createElement("div");
fullProp.id = "fullProp";
document.body.appendChild(fullProp)
let proposalBox = document.createElement("div");
proposalBox.id = "proposalBox";
fullProp.appendChild(proposalBox);

let suggestionContainer = document.createElement("div");
suggestionContainer.id = "suggestionContainer";
suggestionContainer.style.overflowY = "scroll";
fullProp.appendChild(suggestionContainer);
let  savedProposals = []






function inloggad() {
    if (localStorage.getItem("loggedIn") === "true") {
      savedProposals = JSON.parse(localStorage.getItem("Proposals")) || [];
        loginForm.innerHTML = "";

        // Create a div element
        let div = document.createElement("div");
        div.id ="div";

        // Create a form element
        let form = document.createElement("div");
        form.id = "form";
//        

        let titleInput = document.createElement("input");
        titleInput.id = "titleInput";
        titleInput.type = "text";
        titleInput.name = "Title";
        titleInput.placeholder = "Titel";
        form.appendChild(titleInput);

        let proposalInput = document.createElement("input");
        proposalInput.id = "proposalInput";
        proposalInput.type = "text";
        proposalInput.name = "Förslag";
        proposalInput.placeholder = "Skriv ditt förslag här";
        form.appendChild(proposalInput);

        let costInput = document.createElement("input");
        costInput.id = "costInput";
        costInput.type = "number";
        costInput.name = "Kostnad";
        costInput.placeholder = "Pris för ditt förslag";
        form.appendChild(costInput);

        // Create a submit button
        let submitProp = document.createElement("button");
        submitProp.id = "submitProp";
        submitProp.innerText = "Submit proposal";

        let verify = document.createElement("button")
        verify.id = "verify"
        verify.innerText = "Verify"
        form.appendChild(verify)       

        // Add the submit button to the form
        form.appendChild(submitProp);
       
        // Add the form to the div
        div.appendChild(form);

 

        // Add the div to the document
        fullProp.appendChild(div);
form.style.position = "fixed"
form.style.top = "15px"
form.style.left = "150px"

verify.addEventListener("click", () => {
  console.log("Börjar validering")
 suggestion.isChainValid()
  
  })

        submitProp.addEventListener("click", (event) => {
            // Other code to handle the form submission
           let newSavedProposals =[{Title: titleInput.value, Proposal: proposalInput.value, Cost: costInput.value}]
savedProposals.push(newSavedProposals[0])
localStorage.setItem("Proposals", JSON.stringify(savedProposals))

            // Create a new suggestion object
            let newSuggestion = {
                proposalTitle: titleInput.value,
                Information: proposalInput.value,
                Cost: Number(costInput.value)

            };            

            suggestion.addSuggestion(new Proposal(newSuggestion));

            // Call the printSuggestion function
            setTimeout(suggestionPrint,100)
            
        });
    }
}

function suggestionPrint() {
  proposalBox.innerHTML = "";
  proposalBox.style.position = "absolute"
  proposalBox.style.display = "inline-block"
  proposalBox.style.left = "443px"

  proposalBox.style.top = "44px"

  suggestion.suggestion.map((e) => {
    // Calculate the remaining budget
    // let amounte = budget - parseInt(costInput.value);
    
    let suggestionBox = document.createElement("div");
      suggestionBox.style.position ="flex";
    // suggestionBox.style.left = "520px";
    // suggestionBox.style.bottom = "50px";
    // suggestionBox.style.width = "100%";
    suggestionBox.style.border = "1px solid black";
    suggestionBox.style.padding = "20px";
    suggestionBox.style.margin = "20px";
    // if (work.data.work < 4) {
    suggestionBox.style.backgroundColor = "lightgrey";
    suggestionBox.id = e.id;
    suggestionBox.innerHTML =
      "<p>" +
      e.prevHash +
      "<br>" +
      "Title: " +
      e.data.proposalTitle +
      "<br>" +
      "Information: " +
      e.data.Information +
      "<br>" +
      "Cost: " +
      e.data.Cost +
      // costInput.value +
      "<br>" +
      "Remaining budget: " +
      "<br>" +
      e.hash +
      "</p>";
    // amounte;
    proposalBox.appendChild(suggestionBox);
    
  });
} 
// When the page is loaded
window.addEventListener("load", () => {
 

  // Check if the Proposals item is present in local storage
  if (localStorage.getItem("Proposals")) {
    // form.style.left = "123vh"
    proposalBox.style.position = "absolute"

    proposalBox.style.display = "block"
    proposalBox.style.top = "44px"
    proposalBox.style.left = "504px"


      // Retrieve the Proposals item from local storage and parse it back into an array
      savedProposals = JSON.parse(localStorage.getItem("Proposals"));

      // Iterate through the savedProposals array and create a suggestion box for each suggestion
      savedProposals.forEach((suggestion) => {
          // Create a suggestion box
          let suggestionBox = document.createElement("div");
          // Set the content of the suggestion box
          suggestionBox.style.position ="flex";
          // suggestionBox.style.left = "520px";
          // suggestionBox.style.bottom = "50px";
          suggestionBox.style.width = "50vh";
          suggestionBox.style.border = "1px solid black";
          suggestionBox.style.padding = "20px";
          suggestionBox.style.margin = "20px";
          // if (work.data.work < 4) {
          suggestionBox.style.backgroundColor = "lightgrey";
          suggestionBox.innerHTML = `
              <h3>Title: ${suggestion.Title}</h3>
              <p>Proposal: ${suggestion.Proposal}</p>
              <p>Cost: ${suggestion.Cost}</p>
              <p>${suggestion.hash}</p>
          `;
          // Add the suggestion box to the proposalBox element
          proposalBox.appendChild(suggestionBox);
      });
  }
});







export { inloggad };