//Create variables to target the HTML elements
var containerEl = document.querySelector("container");
var quizEl = document.getElementById("quiz");
var questionsEl = document.getElementById("questions");
var choicesEl = document.getElementById("choices");
var answer1El = document.getElementById("ans1");
var answer2El = document.getElementById("ans2");
var answer3El = document.getElementById("ans3");
var displayMsg = document.getElementById("wrong-right");
var timerEl = document.getElementById("timer");
var scoreContainerEl = document.getElementById("ScoreContainer");
var displayScoreEl = document.getElementById("score");
var displayFinalTimeEl = document.getElementById("finaltime");
var recordUserEl = document.getElementById("user");
var clasificationListEL = document.getElementById("clasification");
// localStorage.clear();

//Create questions Array
var questions = [
    {
        q: "Which functions are hoisted to the top of the global scope?",
        a1: "function declarations",
        a2: "function expressions",
        a3: "both",
        correct: "a1",
    },{
        q: "What is the HTML tag under which one can write Javascript code?",
        a1: "<javascript>",
        a2: "<script>",
        a3: "<js>",
        correct: "a2",
    },{
        q: "Choose the correct JavaScript syntaz to change the content of the following HTML code: <br><br> &ltp id='test'&gtThis is a test &lt/p&gt",
        a1: "document.getElementbyId('#test').innerHTML = 'I know the answer'",
        a2: "document.getElementbyId('test').innerHTML = I know the answer",
        a3: "document.getElementbyId('test').innerHTML = 'I know the answer'",
        correct: "a3",
    }
]

//Create new variables
var quizTime = 14;
var followingQuestions = 0;
var score = 0;
var timerInterval;
var CompletionTime;
//Start the quiz, activate button
containerEl.addEventListener("click", startQuiz);

//Create the functions of questions to offer when function quiz starts
function displayQuestions() {
    questionsEl.innerHTML = "<h3>" + questions[followingQuestions].q + "</h3>";
    answer1El.textContent = questions[followingQuestions].a1;
    answer2El.textContent = questions[followingQuestions].a2;
    answer3El.textContent = questions[followingQuestions].a3;
}

//Create timer function to display when function quiz starts
function displayTimer() {
    timerInterval = setInterval(function() {
        quizTime--;
        timerEl.textContent = "Time: "+ quizTime;

        if (quizTime === 0) {
            clearInterval(timerInterval);
            //game is over and we move on to the page to save our score 
            scoreTrackerPage();
        }
        //Amount of time spent on quizz
        CompletionTime = 15 - quizTime
    }, 1000);
}


//Function to start the quiz. Hide previous page. Show questions
function startQuiz() {
    //Do not display the container section from our html
    containerEl.style.display = "none";
    //call the function questions
    displayQuestions();
    //call the countodown
    displayTimer();
    //Change the not display status from html code and display the quiz section
    quizEl.style.display = "block";   
}

//Function to continue to the next question
function nextQuestion(event) {
    //check answers
    if (event.target.value === questions[followingQuestions].correct) {
        //if answer is right add 1 point to the score and print "CORRECT!" on green
        score++;
        displayMsg.style.color = "green"
        displayMsg.innerHTML = "CORRECT!"
    } else {
        //if answer is wrong, subtract 5 seconds from timer and print "WRONG!" on red
        //STILL NEED TO ADD SUBTRACTION FROM TIMER
        displayMsg.style.color = "red"
        displayMsg.innerHTML = "WRONG!"
    }
    //keep moving on the questions until we answer the last one. Then go to the scoreTrackerPage
    if (followingQuestions < questions.length -1) {
        //Move to the following question no matter if answer is right or not.
        followingQuestions++;
    } else {
        //Stops the countdown
        clearInterval(timerInterval);
        //Move to results page
        scoreTrackerPage();

    }
    //if we keep on having questions, after adding a number to our index with followingQuestions++, que display the corresponding Q & A
    displayQuestions();
    
};

//Function to show the scoreTrackerPage where we'll save our final score
function scoreTrackerPage() {
    containerEl.style.display = "none";
    quizEl.style.display = "none";
    scoreContainerEl.style.display = "block";
    displayScoreEl.innerHTML = score + " point(s)";
    displayFinalTimeEl.innerHTML = "Quiz done in " + CompletionTime + " seconds";
    // localStorage.setItem("result", score);
    // localStorage.setItem("finaltime", quizTime);
}

//Call the nextQuestion function
answer1El.addEventListener("click", nextQuestion);
answer2El.addEventListener("click", nextQuestion);
answer3El.addEventListener("click", nextQuestion);

// //Below we create the classification
// userRegister = [];
// init();
// //function to display the results.
// //create function to have a clasification
// function displayResults () {
//     //Create list to show classification
//     clasificationListEL.innerHTML = "";
//     //Loop through all the users tha play
//     for (var i= 0; i < userRegister.length; i++) {
//         //We store each user in the variable newUserRegister
//         var newUserRegister = userRegister[i];
//         //Create the list elements everytime a user is logged
//         var UserList = document.createElement("li");
//         UserList.textContent = newUserRegister;
//         UserList.setAttribute("data-index", i);
//         //Append the list element to the ul in DOM
//         clasificationListEL.appendChild(UserList)
//     }
// }
// //Retrieve elements from Local storage. It's first because we want players from previous games to appear
// function init() {
//     //converts the string of the array in an object
//     var storedUsers = JSON.parse(localStorage.getItem("userRegister"));
//     //if there's no new player, the Array of players remains with the stored ones as objects
//     if (storedUsers !== null) {
//         userRegister = storedUsers;
//     }
//     //we call the function on top
//     displayResults();
// }

// //It saves new players on the local storage
// function saveUsers() {
//     localStorage.setItem("userRegister", JSON.stringify(userRegister));
// }

// //Initializes the function when we press enter key
// scoreContainerEl.addEventListener("submit", function(event) {
//     event.preventDefault();
//     //We create a variable that it's storing the user's input. Trim eliminates whitespace
//     var userText = recordUserEl.value.trim();
//     //Validation. If user doesn't input anything, stop function
//     if (userText === "") {
//         return;
//     }
//     //We push the user input inside the array of users that have played the game
//     userRegister.push(userText);
//     recordUserEl.value = "";
//     //After we press enter we hide the input name field and we show the clasification
//     recordUserEl.style.display = "none";
//     displayScoreEl.style.display = "none";
//     displayFinalTimeEl.style.display = "none";
//     saveUsers();
//     displayResults();
// })


//Empty Array that we'll fill with user's input
var Users = [];

//Create function to store user's input (name)
function storeUsers(event) {
    event.preventDefault();
    //store user's input in variable
    var userSaved = recordUserEl.value;
    // Create Array of Users
    Users.push(userSaved);
    //Make a string from the Users in the Array
    localStorage.setItem("username", JSON.stringify(Users));
    //So the function below show previously stored items
    ClasificationTable()
     //After we press enter we hide the input name field and we show the clasification
     recordUserEl.style.display = "none";
     displayScoreEl.style.display = "none";
     displayFinalTimeEl.style.display = "none";
}

//Create the list of people that played
function ClasificationTable() {
    //Convert the String into a JSON object
    var Users = JSON.parse(localStorage.getItem("username"));
    // Loop through the array of usernames
    for (var i=0; i < Users.length; i++) {
        //Store each user in the variable
        var registeredUser = Users[i];
        // I want to call them individually and then display in the list
        // print the information in a list, print every name we have in local storage
        var List = document.createElement("li");
        List.textContent = registeredUser + ": " + score + " points in " + CompletionTime + " seconds";
        clasificationListEL.appendChild(List);
    }
}

//When you click enter, the event is "submit" and we want that eventListener to be added to scoreContainerEl.
scoreContainerEl.addEventListener("submit", storeUsers);
ClasificationTable();
