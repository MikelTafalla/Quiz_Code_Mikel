//Create variables from the html elements
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
var quizTime = 100;
var followingQuestions = 0;
var score = 0;

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
    var timerInterval = setInterval(function() {
        quizTime--;
        timerEl.textContent = "Time: "+ quizTime;

        if (quizTime === 0) {
            clearInterval(timerInterval);
            //game is over and we move on to the page to save our score 
            scoreTrackerPage();
        }
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
        scoreTrackerPage();
    }
    //if we keep on having questions, after adding a number to our index with followingQuestions++, que display the corresponding Q & A
    displayQuestions();
    
};

//Function to show the scoreTrackerPage where we'll save our final score
function scoreTrackerPage() {
    containerEl.style.display = "none";
    quizEl.style.display = "none";
    scoreContainerEl.display = "block";
}

//Call the nextQuestion function
answer1El.addEventListener("click", nextQuestion);
answer2El.addEventListener("click", nextQuestion);
answer3El.addEventListener("click", nextQuestion);



