import { OPERATIONS } from './constants';

/**
 * Shuffles an array in place using Fisher-Yates algorithm
 * @param {Array} array - Array to shuffle
 * @returns {Array} The shuffled array
 */
export function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

/**
 * Generates wrong answer choices for a question
 * @param {number} correctAnswer - The correct answer
 * @param {string} operation - The math operation
 * @returns {Array<number>} Array of 2 wrong answers
 */
export function generateWrongAnswers(correctAnswer, operation) {
  const wrongAnswers = [];

  while (wrongAnswers.length < 2) {
    let wrongAnswer;

    if (operation === OPERATIONS.ADD || operation === OPERATIONS.MULTIPLY) {
      wrongAnswer = correctAnswer + Math.floor(Math.random() * 20) - 10;
    } else {
      wrongAnswer = correctAnswer + Math.floor(Math.random() * 10) - 5;
    }

    if (
      wrongAnswer !== correctAnswer &&
      wrongAnswer > 0 &&
      !wrongAnswers.includes(wrongAnswer)
    ) {
      wrongAnswers.push(wrongAnswer);
    }
  }

  return wrongAnswers;
}

/**
 * Generates a math question with multiple choice answers
 * @param {string} operation - Math operation (×, ÷, +, -)
 * @param {Array<number>} practiceNumbers - Optional array of numbers to practice (for × and ÷)
 * @returns {Object} Question object with question text, answers, correct answer, and correct index
 */
export function generateQuestion(operation, practiceNumbers = []) {
  let num1, num2, correctAnswer, questionText;

  switch (operation) {
    case OPERATIONS.MULTIPLY:
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

    case OPERATIONS.DIVIDE:
      if (practiceNumbers.length > 0) {
        num2 = practiceNumbers[Math.floor(Math.random() * practiceNumbers.length)];
        // Avoid division by zero
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

    case OPERATIONS.ADD:
      num1 = Math.floor(Math.random() * 9) + 1;
      num2 = Math.floor(Math.random() * 9) + 1;
      correctAnswer = num1 + num2;
      questionText = `${num1} + ${num2} = ?`;
      break;

    case OPERATIONS.SUBTRACT:
      num1 = Math.floor(Math.random() * 9) + 1;
      num2 = Math.floor(Math.random() * num1) + 1;
      correctAnswer = num1 - num2;
      questionText = `${num1} - ${num2} = ?`;
      break;

    default:
      throw new Error(`Unknown operation: ${operation}`);
  }

  const wrongAnswers = generateWrongAnswers(correctAnswer, operation);
  const allAnswers = [correctAnswer, ...wrongAnswers];
  shuffleArray(allAnswers);

  return {
    question: questionText,
    answers: allAnswers,
    correctAnswer: correctAnswer,
    correctIndex: allAnswers.indexOf(correctAnswer),
  };
}
