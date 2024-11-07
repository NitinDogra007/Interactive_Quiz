const quizData = [
  {
    question: "Who was the Ancient Greek God of the Sun?",
    options: ["Apollo", "Zeus", "Ares", "Prometheus"],
    answer: "Apollo",
  },
  {
    question: "How many faces does a Dodecahedron have?",
    options: ["10", "12", "11", "8"],
    answer: "12",
  },
  // Add more questions here
];

const questionElement = document.querySelector(".question");
const optionsElement = document.querySelector(".options");
const submitButton = document.querySelector(".submit button");

let currentQuestion = 0;
let score = 0;
let selectedButton = null;

function showQuestion() {
  const question = quizData[currentQuestion];
  questionElement.innerHTML = `<h1>${question.question}</h1>`;

  optionsElement.innerHTML = "";
  question.options.forEach((option) => {
    const button = document.createElement("button");
    button.innerText = option;
    optionsElement.appendChild(button);
    button.addEventListener("click", () => selectAnswer(button));
  });

  submitButton.innerText = "Next";
  submitButton.style.display = "none"; // Hide the button initially
}

function selectAnswer(button) {
  // Prevent multiple selections
  if (selectedButton) return;

  selectedButton = button;
  const answer = quizData[currentQuestion].answer;

  if (button.innerText === answer) {
    button.style.borderColor = "green";
    button.style.color = "green";
    score++;
  } else {
    button.style.borderColor = "red";
    button.style.color = "red";
  }

  submitButton.style.display = "block"; // Show the Next button
}

submitButton.addEventListener("click", () => {
  if (currentQuestion < quizData.length - 1) {
    currentQuestion++;
    selectedButton = null;
    showQuestion();
  } else {
    showResult();
  }
});

function showResult() {
  questionElement.innerHTML = "<h1>Quiz Completed</h1>";
  optionsElement.innerHTML = `<h2>Your Score: ${score}/${quizData.length}</h2>`;
  submitButton.innerText = "Replay";
  submitButton.addEventListener("click", restartQuiz);
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  selectedButton = null;
  showQuestion();
  submitButton.removeEventListener("click", restartQuiz);
}

showQuestion();
