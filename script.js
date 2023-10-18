const startButton = document.getElementById("start-quiz");
const questionContainer = document.getElementById("question-container");
const resultContainer = document.getElementById("result");
const scoreElement = document.getElementById("score");
const finalScoreContainer = document.getElementById("final-score");
const initialsInput = document.getElementById("initials");
const submitScoreButton = document.getElementById("submit-score");
const highScoresContainer = document.getElementById("high-scores");
const highScoresList = document.getElementById("high-scores-list");
const goBackButton = document.getElementById("go-back");
const clearScoresButton = document.getElementById("clear-scores");
const viewHighScoresButton = document.getElementById("view-high-scores");
let interval; 

const questions = [
  {
    question: "Commonly used data types DO Not Include:",
    choices: ["Strings", "Booleans", "Alerts", "Numbers"],
    answer: "Alerts",
  },
  {
    question: "String values must be enclosed within _____ when being assigned to variables.",
    choices: ["Commas", "Curly brackets", "Quotes", "Parenthesis"],
    answer: "Quotes",
  },
  {
    question: "Array in JavaScript can be used to store ______.",
    choices: ["Numbers and strings", "Other array", "Booleans", "All of the above"],
    answer: "All of the above",
  },
  {
    question: "A very useful tool used during development and debugging for printing content to the debugger is:",
    choices: ["Javascript", "Terminal/bash", "For loops", "Console.log"],
    answer: "Console.log",
  },
  {
    question: "The condition in an if/else statement is enclosed with _____.",
    choices: ["Quotes", "Curly brackets", "Parenthesis", "Square brackets"],
    answer: "Parenthesis",
  },
];

let currentQuestionIndex = 0;
let userScore = 0;
let timeLeft = 60;
let userInitials = "";

startButton.addEventListener("click", startQuiz);
submitScoreButton.addEventListener("click", submitScore);
goBackButton.addEventListener("click", goBack);
clearScoresButton.addEventListener("click", clearScores);
viewHighScoresButton.addEventListener("click", viewHighScores);

function startQuiz() {
  startButton.style.display = "none";
  document.querySelector("h2").textContent = "";
  displayQuestion(currentQuestionIndex);
  startTimer();
}

function displayQuestion(index) {
  if (index < questions.length) {
    const question = questions[index];

    if (index === 0) {
      startButton.style.display = "none"; 
    }

    const questionHTML = `
      <h2>${question.question}</h2>
      <ul>
        <li>${question.choices[0]}</li>
        <li>${question.choices[1]}</li>
        <li>${question.choices[2]}</li>
        <li>${question.choices[3]}</li>
      </ul>
    `;

    questionContainer.innerHTML = questionHTML;

    const answerList = questionContainer.querySelector("ul");

    answerList.addEventListener("click", (event) => {
      if (event.target.tagName === "LI") {
        const userAnswer = event.target.textContent;
        checkAnswer(userAnswer, question.answer);
      }
    });
  } else if (index === questions.length) {
    endQuiz(); 
  }
}


function startTimer() {
    interval = setInterval(function () {
      if (currentQuestionIndex < questions.length) {
        if (timeLeft <= 0) {
          clearInterval(interval);
          endQuiz();
        } else {
          timeLeft--;
          document.getElementById("time-left").textContent = timeLeft;
        }
      }
    }, 1000);
  }
  

function checkAnswer(userAnswer, correctAnswer) {
  if (userAnswer === correctAnswer) {
    resultContainer.textContent = "Correct!";
    userScore += 10;
  } else {
    resultContainer.textContent = "Wrong! -10 seconds";
    timeLeft -= 10;
  }
  setTimeout(() => {
    resultContainer.textContent = "";
    currentQuestionIndex++;
    displayQuestion(currentQuestionIndex);
  }, 1000);
}

function endQuiz() {
    questionContainer.style.display = "none";
    finalScoreContainer.style.display = "block";
    scoreElement.textContent = userScore;
    document.getElementById("quiz-container").style.display = "none";
  startButton.style.display = "none";
  resultContainer.style.display = "none";
    
    document.querySelector("h2").style.display = "none";
    startButton.style.display = "none";
    resultContainer.style.display = "none";
  }
  
  function submitScore() {
    userInitials = initialsInput.value;
    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    highScores.push({ initials: userInitials, score: userScore });
    localStorage.setItem("highScores", JSON.stringify(highScores));
 
    document.querySelector("#final-score h2").textContent = `All done, ${userInitials}!`;
    document.querySelector("#final-score p").textContent = `Your final score: ${userScore}`;
  
    updateHighScoresList();
  
    finalScoreContainer.style.display = "block";
    highScoresContainer.style.display = "none";
  }
  

function updateHighScoresList() {
  const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
  highScores.sort((a, b) => b.score - a.score);
  highScoresList.innerHTML = "";
  highScores.forEach((entry, index) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${entry.initials}: ${entry.score}`;
    highScoresList.appendChild(listItem);
  });}
  
  function goBack() {
    clearInterval(interval);
    finalScoreContainer.style.display = "none";
    highScoresContainer.style.display = "none";
  
    currentQuestionIndex = 0;
    userScore = 0;
    timeLeft = 60;
    document.getElementById("time-left").textContent = timeLeft;
  
    highScoresList.style.display = "none";
    document.getElementById("quiz-container").style.display = "block";
    document.querySelector("h2").textContent = "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your time by ten seconds!";
    startButton.style.display = "block";
    resultContainer.style.display = "block";
    initialsInput.value = "";
  
    questionContainer.innerHTML = "";
  }
  
  
function clearScores() {
    localStorage.removeItem("highScores");
    highScoresList.innerHTML = "";
  }
  
  
  function viewHighScores() {
    startButton.style.display = "none";
    finalScoreContainer.style.display = "none";
    highScoresContainer.style.display = "block";
    updateHighScoresList();
  }