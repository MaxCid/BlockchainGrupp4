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
let  savedProposals = []
// let data = {
//   user: "Genesis",
//   work: 0
// };

// let genesisBlock = new Proposal(data);
// let genesisBlockHash = await genesisBlock.calculateHash();
// genesisBlock.hash = genesisBlockHash;
// suggestion.addSuggestion(genesisBlock);



function printSuggestion() {
  window.onload = () => {
    if (!costInput || !costInput.value) {
      // costInput is not defined or has no value, so do not try to use it
      return;
    }
 
  };
}



function inloggad() {
    if (localStorage.getItem("loggedIn") === "true") {
      localStorage.getItem("Proposals")
        loginForm.innerHTML = "";

        // Create a div element
        let div = document.createElement("div");
        div.id ="div";

        // Create a form element
        let form = document.createElement("form");
        form.id = "form";
//         form.style.position = "absolute"
//         form.style.top = "100px"
//         form.style.left = "550px"

// let h1 = document.getElementById("h1");
// h1.style.position = "absolute"
// h1.style.top = ""



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
        submitProp.type = "submit";
        submitProp.innerText = "Submit proposal";

        // Add the submit button to the form
        form.appendChild(submitProp);

        // Add the form to the div
        div.appendChild(form);

        // div.style.top = "100px"
        // div.style.display = "block";
        // div.style.position = "absolute";

        // Add the div to the document
        fullProp.appendChild(div);

        form.addEventListener("submit", (event) => {
            event.preventDefault();
            // Other code to handle the form submission
           let newSavedProposals =[{Title: titleInput.value, Proposal: proposalInput.value, Cost: costInput.value}]
            // localStorage.setItem("Proposals", JSON.stringify(savedProposals))
console.log("submit")
savedProposals.push(newSavedProposals)
localStorage.setItem("Proposals", JSON.stringify(savedProposals))

            // Create a new suggestion object
            let newSuggestion = {
                proposalTitle: titleInput.value,
                Information: proposalInput.value,
                Cost: costInput.value,
            };            

            suggestion.addSuggestion(new Proposal(newSuggestion));

            // Call the printSuggestion function
            setTimeout(suggestionPrint,100)
            
        });
    }
}

function suggestionPrint() {
  document.getElementById("proposalBox").innerHTML = "";
  suggestion.suggestion.map((e) => {
    // Calculate the remaining budget
    // let amounte = budget - parseInt(costInput.value);
    
    let suggestionBox = document.createElement("div");
      suggestionBox.style.position ="flex";
    suggestionBox.style.left = "520px";
    suggestionBox.style.bottom = "50px";
    suggestionBox.style.width = "100%";
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
} let g =localStorage.getItem("Proposals")
        // 
 g
    // proposalBox.style.position = "absolute"
    // proposalBox.style.top = "600px"



export { inloggad };