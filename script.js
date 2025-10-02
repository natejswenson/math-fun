let currentQuestion = {};
let score = 0;
let totalQuestions = 0;
let selectedAnswer = null;
let currentOperation = '×';
let selectedNumbers = [];
let practiceNumbers = [];

function generateQuestion() {
    let num1, num2, correctAnswer, questionText;

    switch (currentOperation) {
        case '×':
            if (practiceNumbers.length > 0) {
                num2 = practiceNumbers[Math.floor(Math.random() * practiceNumbers.length)];
                num1 = Math.floor(Math.random() * 9) + 1;
            } else {
                num1 = Math.floor(Math.random() * 9) + 1;
                num2 = Math.floor(Math.random() * 9) + 1;
            }
            correctAnswer = num1 * num2;
            questionText = `${num1} × ${num2} = ?`;
            break;

        case '÷':
            if (practiceNumbers.length > 0) {
                num2 = practiceNumbers[Math.floor(Math.random() * practiceNumbers.length)];
                if (num2 === 0) {
                    num2 = 1;
                }
                correctAnswer = Math.floor(Math.random() * 9) + 1;
                num1 = correctAnswer * num2;
            } else {
                correctAnswer = Math.floor(Math.random() * 9) + 1;
                num2 = Math.floor(Math.random() * 9) + 1;
                num1 = correctAnswer * num2;
            }
            questionText = `${num1} ÷ ${num2} = ?`;
            break;

        case '+':
            num1 = Math.floor(Math.random() * 9) + 1;
            num2 = Math.floor(Math.random() * 9) + 1;
            correctAnswer = num1 + num2;
            questionText = `${num1} + ${num2} = ?`;
            break;

        case '-':
            num1 = Math.floor(Math.random() * 9) + 1;
            num2 = Math.floor(Math.random() * num1) + 1;
            correctAnswer = num1 - num2;
            questionText = `${num1} - ${num2} = ?`;
            break;
    }

    const wrongAnswers = [];
    while (wrongAnswers.length < 2) {
        let wrongAnswer;
        if (currentOperation === '+' || currentOperation === '×') {
            wrongAnswer = correctAnswer + Math.floor(Math.random() * 20) - 10;
        } else {
            wrongAnswer = correctAnswer + Math.floor(Math.random() * 10) - 5;
        }

        if (wrongAnswer !== correctAnswer && wrongAnswer > 0 && !wrongAnswers.includes(wrongAnswer)) {
            wrongAnswers.push(wrongAnswer);
        }
    }

    const allAnswers = [correctAnswer, ...wrongAnswers];
    shuffleArray(allAnswers);

    return {
        question: questionText,
        answers: allAnswers,
        correctAnswer: correctAnswer,
        correctIndex: allAnswers.indexOf(correctAnswer)
    };
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function displayQuestion() {
    currentQuestion = generateQuestion();

    document.getElementById('question').textContent = currentQuestion.question;

    const answerButtons = document.querySelectorAll('.answer-btn');
    answerButtons.forEach((btn, index) => {
        btn.textContent = currentQuestion.answers[index];
        btn.disabled = false;
        btn.classList.remove('selected');
    });

    document.getElementById('feedback-section').classList.add('hidden');
    selectedAnswer = null;
}

function selectAnswer(answerIndex) {
    if (selectedAnswer !== null) return;

    selectedAnswer = answerIndex;

    const answerButtons = document.querySelectorAll('.answer-btn');
    answerButtons.forEach((btn, index) => {
        btn.disabled = true;
        if (index === answerIndex) {
            btn.classList.add('selected');
        }
    });

    totalQuestions++;

    const feedbackSection = document.getElementById('feedback-section');
    const feedbackMessage = document.getElementById('feedback-message');

    if (answerIndex === currentQuestion.correctIndex) {
        score++;
        feedbackMessage.textContent = '🎉 Correct! Great job! 🎉';
        feedbackMessage.className = 'correct';
    } else {
        feedbackMessage.innerHTML = `❌ Oops! The correct answer is ${currentQuestion.correctAnswer} ❌`;
        feedbackMessage.className = 'incorrect';
    }

    feedbackSection.classList.remove('hidden');
    updateScore();
}

function nextQuestion() {
    displayQuestion();
}

function updateScore() {
    document.getElementById('score').textContent = score;
    document.getElementById('total').textContent = totalQuestions;
}

function startQuiz(operation) {
    currentOperation = operation;

    if (operation === '×' || operation === '÷') {
        document.getElementById('start-screen').classList.add('hidden');
        document.getElementById('number-selection-screen').classList.remove('hidden');

        const title = document.getElementById('number-selection-title');
        if (operation === '×') {
            title.textContent = 'Choose Multiplication Numbers';
            document.getElementById('number-selection-subtitle').textContent = 'Select the multipliers you want to practice with:';
        } else {
            title.textContent = 'Choose Division Numbers';
            document.getElementById('number-selection-subtitle').textContent = 'Select the divisors you want to practice with:';
        }

        resetNumberSelection();
    } else {
        score = 0;
        totalQuestions = 0;
        practiceNumbers = [];

        document.getElementById('start-screen').classList.add('hidden');
        document.getElementById('quiz-container').classList.remove('hidden');
        document.getElementById('score-section').classList.remove('hidden');

        displayQuestion();
        updateScore();
    }
}

function goBackToStart() {
    document.getElementById('start-screen').classList.remove('hidden');
    document.getElementById('quiz-container').classList.add('hidden');
    document.getElementById('number-selection-screen').classList.add('hidden');
    document.getElementById('score-section').classList.add('hidden');

    score = 0;
    totalQuestions = 0;
    selectedAnswer = null;
    selectedNumbers = [];
    practiceNumbers = [];
}

function toggleNumber(number) {
    const button = document.querySelector(`[data-number="${number}"]`);
    const index = selectedNumbers.indexOf(number);

    if (index > -1) {
        selectedNumbers.splice(index, 1);
        button.classList.remove('selected');
    } else {
        selectedNumbers.push(number);
        button.classList.add('selected');
    }

    const startBtn = document.getElementById('start-practice-btn');
    startBtn.disabled = selectedNumbers.length === 0;
}

function resetNumberSelection() {
    selectedNumbers = [];
    const numberButtons = document.querySelectorAll('.number-btn');
    numberButtons.forEach(btn => btn.classList.remove('selected'));
    document.getElementById('start-practice-btn').disabled = true;
}

function startPractice() {
    practiceNumbers = [...selectedNumbers];
    score = 0;
    totalQuestions = 0;

    document.getElementById('number-selection-screen').classList.add('hidden');
    document.getElementById('quiz-container').classList.remove('hidden');
    document.getElementById('score-section').classList.remove('hidden');

    displayQuestion();
    updateScore();
}

function goBackToNumberSelection() {
    if (currentOperation === '×' || currentOperation === '÷') {
        document.getElementById('quiz-container').classList.add('hidden');
        document.getElementById('number-selection-screen').classList.remove('hidden');
        document.getElementById('score-section').classList.add('hidden');

        score = 0;
        totalQuestions = 0;
        selectedAnswer = null;
    } else {
        goBackToStart();
    }
}

document.addEventListener('DOMContentLoaded', function() {
    updateScore();
});