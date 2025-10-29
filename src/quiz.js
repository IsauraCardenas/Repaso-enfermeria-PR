let questions = [];
let currentQuestionIndex = 0;
let score = 0;

// Elementos
const questionText = document.getElementById("question-text");
const answerButtons = document.getElementById("answer-buttons");
const nextBtn = document.getElementById("next-btn");
const scorePercent = document.getElementById("score-percent");
const scoreText = document.getElementById("score-text");
const questionNumberEl = document.getElementById("question-number");
const totalQuestionsEl = document.getElementById("total-questions");
const progressBar = document.getElementById("progress");

// --- Cargar preguntas desde JSON ---
fetch("src/questions.json")
  .then((response) => {
    if (!response.ok)
      throw new Error("No se pudo cargar el archivo de preguntas.");
    return response.json();
  })
  .then((data) => {
    questions = data;
    totalQuestionsEl.textContent = questions.length;
    showQuestion();
  })
  .catch((error) => console.error("Error al cargar preguntas:", error));

// --- Mostrar pregunta actual ---
function showQuestion() {
  if (!questions.length) return;

  // Fin del examen
  if (currentQuestionIndex >= questions.length) {
    showFinalScore();
    return;
  }

  const current = questions[currentQuestionIndex];
  questionText.textContent = current.question;
  answerButtons.innerHTML = "";

  current.answers.forEach((answer) => {
    const li = document.createElement("li");
    li.textContent = answer.text;
    li.classList.add("answer");
    li.addEventListener("click", () => selectAnswer(li, answer.correct));
    answerButtons.appendChild(li);
  });

  // Actualizar número y barra de progreso
  questionNumberEl.textContent = currentQuestionIndex + 1;
  updateProgressBar();

  nextBtn.disabled = true;
  nextBtn.textContent = "Siguiente";
}

// --- Seleccionar respuesta ---
function selectAnswer(selected, correct) {
  const allAnswers = document.querySelectorAll(".answer");

  allAnswers.forEach((btn) => btn.classList.add("disabled"));

  if (correct) {
    selected.classList.add("correct");
    score++;
  } else {
    selected.classList.add("incorrect");
    const rightAnswer = Array.from(allAnswers).find(
      (btn, i) => questions[currentQuestionIndex].answers[i].correct
    );
    if (rightAnswer) rightAnswer.classList.add("correct");
  }

  updateScoreDisplay();
  nextBtn.disabled = false;
}

// --- Actualizar marcador ---
function updateScoreDisplay() {
  const percent = Math.round((score / (currentQuestionIndex + 1)) * 100);
  scorePercent.textContent = `${percent}%`;
  scoreText.textContent = `Has contestado ${score} correctamente`;
}

// --- Actualizar barra de progreso ---
function updateProgressBar() {
  const progressPercent = (currentQuestionIndex / questions.length) * 100;
  progressBar.style.width = `${progressPercent}%`;
}

// --- Botón siguiente ---
nextBtn.addEventListener("click", () => {
  nextBtn.disabled = true;
  currentQuestionIndex++;
  showQuestion();
});

// --- Mostrar resultado final ---
function showFinalScore() {
  questionText.textContent = `¡Examen terminado! Obtuviste ${score} de ${questions.length} preguntas correctas. 🎉`;
  answerButtons.innerHTML = "";
  nextBtn.textContent = "Reintentar";
  nextBtn.disabled = false;
  nextBtn.onclick = () => location.reload();

  // Llenar la barra al 100%
  progressBar.style.width = "100%";
}
