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
        q: "Choose the correct JavaScript syntax to change the content of the following HTML code: <br><br> &ltp id='test'&gtThis is a test &lt/p&gt",
        a1: "document.getElementbyId('#test').innerHTML = 'I know the answer'",
        a2: "document.getElementbyId('test').innerHTML = I know the answer",
        a3: "document.getElementbyId('test').innerHTML = 'I know the answer'",
        correct: "a3",
    }
]

//Create new variables
var quizTime = 30;
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
        CompletionTime = 30 - quizTime
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
        //if answer is wrong, print "WRONG!" on red
        displayMsg.style.color = "red"
        displayMsg.innerHTML = "WRONG!"
        //Subtract 5 seconds from timer
        quizTime -= 5;
        timerEl.innerHTML= "Time: "+ quizTime;
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
    //if we keep on having questions, after adding a number to our index with followingQuestions++, then display the corresponding Q & A
    displayQuestions();
    
};

//Function to show the scoreTrackerPage where we'll save our final score
function scoreTrackerPage() {
    containerEl.style.display = "none";
    quizEl.style.display = "none";
    scoreContainerEl.style.display = "block";
    displayScoreEl.innerHTML = score + " point(s)";
    displayFinalTimeEl.innerHTML = "Quiz done in " + CompletionTime + " seconds";
}

//Call the nextQuestion function
answer1El.addEventListener("click", nextQuestion);
answer2El.addEventListener("click", nextQuestion);
answer3El.addEventListener("click", nextQuestion);

//Empty Array that we'll fill with user's input
var Users = [];
var Results = [];
var Time = [];

//Create function to store user's input (name)
function storeUsers(event) {
    event.preventDefault();
    //store user's input in variable
    var userSaved = recordUserEl.value;
    // Create Array of Users
    Users.push(userSaved);
    Results.push(score);
    Time.push(CompletionTime);
    //Make a string from the Users in the Array
    localStorage.setItem("username", JSON.stringify(Users));
    localStorage.setItem("results", JSON.stringify(Results));
    localStorage.setItem("finaltime", JSON.stringify(Time));
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
    Users = JSON.parse(localStorage.getItem("username"));
    Results = JSON.parse(localStorage.getItem("results"));
    Time = JSON.parse(localStorage.getItem("finaltime"));
    
    //If username doesn't exist in localstorage Users will be null. If Users is null, Users.length will throw an error. If Users = null, initialize Users anyway.
    if (Users == null) {
        Users = [];
        Results = [];
        Time = [];
     }
    // Loop through the array of usernames
    for (var i=0; i < Users.length; i++) {
        //Store each user in the variable
        var registeredUser = Users[i];
        var registeredResults = Results[i];
        var registeredTime = Time[i];
        // I want to call them individually and then display in the list
        // print the information in a list, print every name we have in local storage
        var List = document.createElement("li");
        List.textContent = registeredUser + ": " + registeredResults + " points in " + registeredTime + " seconds";
        clasificationListEL.appendChild(List);
    }
}

//When you click enter, the event is "submit" and we want that eventListener to be added to scoreContainerEl.
scoreContainerEl.addEventListener("submit", storeUsers);

ClasificationTable();

///Refresh page function
function refreshPage(){
    window.location.reload();
}

//Allows you to refresh the game but start with the localstorage empty
function clearPage(){
    window.location.reload();
    //CLear the LocalStorage
    localStorage.clear();
}

