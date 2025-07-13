const questions = [
  { q: "What is the capital of the Philippines?", a: ["Cebu", "Davao", "Manila", "Baguio"], c: 2 },
  { q: "Which planet is known as the Red Planet?", a: ["Earth", "Venus", "Mars", "Saturn"], c: 2 },
  { q: "How many legs does a spider have?", a: ["6", "8", "10", "12"], c: 1 },
  { q: "What is 5 + 3 * 2?", a: ["11", "16", "13", "10"], c: 2 },
  { q: "Who wrote 'Noli Me Tangere'?", a: ["Bonifacio", "Luna", "Mabini", "Rizal"], c: 3 }
];

let current = 0;
let score = 0;
let coins = parseInt(localStorage.getItem("quizCoins")) || 0;

const qBox = document.getElementById("question");
const aBox = document.getElementById("answers");
const nextBtn = document.getElementById("nextBtn");

function loadQuestion() {
  let q = questions[current];
  qBox.textContent = q.q;
  aBox.innerHTML = "";
  q.a.forEach((choice, i) => {
    let btn = document.createElement("button");
    btn.textContent = choice;
    btn.onclick = () => selectAnswer(i);
    aBox.appendChild(btn);
  });
  nextBtn.disabled = true;
}

function selectAnswer(i) {
  let correct = questions[current].c;
  let buttons = aBox.getElementsByTagName("button");
  for (let b = 0; b < buttons.length; b++) {
    buttons[b].disabled = true;
    if (b === correct) buttons[b].style.backgroundColor = "#28a745";
    else if (b === i) buttons[b].style.backgroundColor = "#dc3545";
  }
  if (i === correct) score++;
  nextBtn.disabled = false;
}

nextBtn.onclick = () => {
  current++;
  if (current < questions.length) {
    loadQuestion();
  } else {
    finishQuiz();
  }
};

function finishQuiz() {
  document.getElementById("quiz-box").style.display = "none";
  document.getElementById("result").style.display = "block";
  document.getElementById("score").textContent = score + "/" + questions.length;
  coins += score;
  document.getElementById("coins").textContent = coins;
  localStorage.setItem("quizCoins", coins);
}

function restartQuiz() {
  current = 0;
  score = 0;
  document.getElementById("quiz-box").style.display = "block";
  document.getElementById("result").style.display = "none";
  loadQuestion();
}

loadQuestion();
    
