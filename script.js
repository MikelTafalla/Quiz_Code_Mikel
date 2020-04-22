//Create variables from the html elements
var containerEl = document.querySelector("container");
var quizEl = document.getElementById("quiz");
var questionsEl = document.getElementById("questions");
var choicesEl = document.getElementById("choices");
var answer1El = document.getElementById("ans1");
var answer2El = document.getElementById("ans2");
var answer3El = document.getElementById("ans3");
var timerEl = document.getElementById("timer");
var scoreContainerEl = document.getElementById("ScoreContainer")

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
        q: "Choose the correct JavaScript syntaz to change the content of the following HTML code:\n &ltp id='test'&gtThis is a test </>",
        a1: "document.getElementbyId('#test').innerHTML = 'I know the answer'",
        a2: "document.getElementbyId('test').innerHTML = I know the answer",
        a3: "document.getElementbyId('test').innerHTML = 'I know the answer'",
        correct: "a3",
    }
]

//Create new variables
var quizTime = 120;
var followingQuestions = 0;
var score = 0;

//Start the quiz, activate button
containerEl.addEventListener("click", startQuiz);

//Create the functions of questions to offer when function quiz starts
function displayQuestions() {
    questionsEl.textContent = questions[followingQuestions].q;
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
            clearInterval(timerInterval)
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
    console.log(event.target);
    console.log(event.target.value);

    
    followingQuestions++;
    displayQuestions();
    // if answer is right move on to next question add 1 point to the score
    if (event.target.value === questions[followingQuestions].correct) {
        score++;
           
    } // if answer is wrong, move on to next question and subtract 5 seconds from timer 
    else {
        
    }
};
//Prueba 1
answer1El.addEventListener("click", nextQuestion);
answer2El.addEventListener("click", nextQuestion);
answer3El.addEventListener("click", nextQuestion);

console.log(followingQuestions);
console.log(questions[followingQuestions]);
console.log(questions[followingQuestions].correct);

