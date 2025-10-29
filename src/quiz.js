const questions = [
  {
    question: "¿Cuál es la frecuencia cardíaca normal en un adulto en reposo?",
    answers: [
      { text: "60-100 latidos por minuto", correct: true },
      { text: "40-60 latidos por minuto", correct: false },
      { text: "100-120 latidos por minuto", correct: false },
      { text: "120-140 latidos por minuto", correct: false },
    ],
  },
  {
    question: "¿Cuál es el valor normal de la presión arterial en adultos?",
    answers: [
      { text: "120/80 mmHg", correct: true },
      { text: "90/60 mmHg", correct: false },
      { text: "140/90 mmHg", correct: false },
      { text: "160/100 mmHg", correct: false },
    ],
  },
  {
    question:
      "¿Qué tipo de aislamiento se usa para un paciente con tuberculosis?",
    answers: [
      { text: "Aislamiento por contacto", correct: false },
      { text: "Aislamiento respiratorio (por aire)", correct: true },
      { text: "Aislamiento protector", correct: false },
      { text: "Aislamiento por gotas", correct: false },
    ],
  },
  {
    question:
      "¿Qué parte del cuerpo se usa comúnmente para medir la temperatura axilar?",
    answers: [
      { text: "En la boca", correct: false },
      { text: "En la axila", correct: true },
      { text: "En el oído", correct: false },
      { text: "En el recto", correct: false },
    ],
  },
  {
    question: "¿Qué instrumento se usa para medir la presión arterial?",
    answers: [
      { text: "Estetoscopio", correct: false },
      { text: "Termómetro", correct: false },
      { text: "Esfigmomanómetro", correct: true },
      { text: "Oxímetro de pulso", correct: false },
    ],
  },
  {
    question: "¿Cuál es la función principal de los glóbulos rojos?",
    answers: [
      { text: "Transportar oxígeno", correct: true },
      { text: "Defender el cuerpo", correct: false },
      { text: "Coagular la sangre", correct: false },
      { text: "Producir energía", correct: false },
    ],
  },
  {
    question: "¿Qué medida de temperatura se considera fiebre?",
    answers: [
      { text: "Más de 37.5°C", correct: true },
      { text: "Menos de 35°C", correct: false },
      { text: "Exactamente 36°C", correct: false },
      { text: "Entre 36.5°C y 37°C", correct: false },
    ],
  },
  {
    question:
      "¿Qué tipo de técnica se utiliza al administrar una inyección intramuscular?",
    answers: [
      { text: "Técnica estéril", correct: true },
      { text: "Técnica limpia", correct: false },
      { text: "Técnica quirúrgica", correct: false },
      { text: "Técnica cerrada", correct: false },
    ],
  },
  {
    question:
      "¿Cuál es el sitio recomendado para administrar una inyección IM en un adulto?",
    answers: [
      { text: "Deltoide", correct: true },
      { text: "Vasto externo", correct: false },
      { text: "Glúteo medio", correct: false },
      { text: "Recto femoral", correct: false },
    ],
  },
  {
    question: "¿Qué nivel de saturación de oxígeno (SpO2) se considera normal?",
    answers: [
      { text: "95-100%", correct: true },
      { text: "80-90%", correct: false },
      { text: "70-80%", correct: false },
      { text: "60-70%", correct: false },
    ],
  },
];

// ======================
// VARIABLES GLOBALES
// ======================
let currentQuestionIndex = 0;
let score = 0;

// ======================
// ELEMENTOS DEL DOM
// ======================
const questionText = document.getElementById("question-text");
const answerButtons = document.getElementById("answer-buttons");
const nextBtn = document.getElementById("next-btn");
const scorePercent = document.getElementById("score-percent");
const scoreText = document.getElementById("score-text");
const questionNumberEl = document.getElementById("question-number");
const totalQuestionsEl = document.getElementById("total-questions");
const progressBar = document.getElementById("progress");

// ======================
// INICIALIZAR QUIZ
// ======================
totalQuestionsEl.textContent = questions.length;
showQuestion();

// ======================
// MOSTRAR PREGUNTA
// ======================
function showQuestion() {
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

  questionNumberEl.textContent = currentQuestionIndex + 1;
  updateProgressBar();

  nextBtn.disabled = true;
  nextBtn.textContent = "Siguiente";
}

// ======================
// SELECCIONAR RESPUESTA
// ======================
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

// ======================
// ACTUALIZAR PUNTAJE
// ======================
function updateScoreDisplay() {
  const percent = Math.round((score / (currentQuestionIndex + 1)) * 100);
  scorePercent.textContent = `${percent}%`;
  scoreText.textContent = `Has contestado ${score} correctamente`;
}

// ======================
// BARRA DE PROGRESO
// ======================
function updateProgressBar() {
  const progressPercent = (currentQuestionIndex / questions.length) * 100;
  progressBar.style.width = `${progressPercent}%`;
}

// ======================
// BOTÓN SIGUIENTE
// ======================
nextBtn.addEventListener("click", () => {
  currentQuestionIndex++;
  showQuestion();
});

// ======================
// RESULTADO FINAL
// ======================
function showFinalScore() {
  questionText.textContent = `¡Examen terminado! Obtuviste ${score} de ${questions.length} preguntas correctas. 🎉`;
  answerButtons.innerHTML = "";
  nextBtn.textContent = "Reintentar";
  nextBtn.disabled = false;
  nextBtn.onclick = () => location.reload();
  progressBar.style.width = "100%";
}
