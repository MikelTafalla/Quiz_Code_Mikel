//Create variables from the html elements
var containerEl = document.querySelector("container");
var quizEl = document.getElementById("quiz");
var questionsEl = document.getElementById("questions");
var answer1El = document.getElementById("ans1");
var answer2El = document.getElementById("ans2");
var answer3El = document.getElementById("ans3");
var timerEl = document.getElementById("timer");
var scoreContainerEl = document.getElementById("ScoreContainer")

//Create questions Array
var questions = [
    {
        q: "What is my name?",
        a1: "Mikel",
        a2: "Joseba",
        a3: "Aritz",
    },{
        q: "What is my lastname?",
        a1: "Mikel",
        a2: "Rodriguez",
        a3: "Aritz",
    },{
        q: "What is my city?",
        a1: "Pamplona",
        a2: "Olite",
        a3: "Tafalla",
    }
]


//Start the quiz, activate button
containerEl.addEventListener("click", startQuiz);

//Create the functions of questions to offer when the quiz starts
function displayQuestions() {
    questionsEl.innerHTML = "<h3>"+ questions[0].q +"</h3>";
    answer1El.innerHTML = "<p>"+ questions[0].a1 +"</p>";
    answer2El.innerHTML = "<p>"+ questions[0].a2 +"</p>";
    answer3El.innerHTML = "<p>"+ questions[0].a3 +"</p>";
}
       

//Function to start the quiz. Hide previous page. Show questions
function startQuiz() {
    //Do not display the container section from our html
    containerEl.style.display = "none";
    //call the function questions
    displayQuestions();
    //Change the not display status from html code and display the quiz section
    quizEl.style.display = "block";
}