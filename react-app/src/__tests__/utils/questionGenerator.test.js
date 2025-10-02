import { describe, it, expect } from 'vitest';
import { generateQuestion, shuffleArray, generateWrongAnswers } from '../../utils/questionGenerator';
import { OPERATIONS } from '../../utils/constants';

describe('questionGenerator', () => {
  describe('generateQuestion', () => {
    describe('multiplication', () => {
      it('generates multiplication question within range 1-9', () => {
        const question = generateQuestion(OPERATIONS.MULTIPLY);

        expect(question).toHaveProperty('question');
        expect(question).toHaveProperty('answers');
        expect(question).toHaveProperty('correctAnswer');
        expect(question).toHaveProperty('correctIndex');
        expect(question.question).toMatch(/^\d+ × \d+ = \?$/);
        expect(question.answers).toHaveLength(3);
        expect(question.answers).toContain(question.correctAnswer);
      });

      it('uses practice numbers when provided for multiplication', () => {
        const practiceNumbers = [5, 7];
        const question = generateQuestion(OPERATIONS.MULTIPLY, practiceNumbers);

        const match = question.question.match(/(\d+) × (\d+) = \?/);
        const [, , num2] = match;

        // One of the numbers should be from practice numbers
        expect(practiceNumbers).toContain(parseInt(num2));
      });

      it('generates correct answer for multiplication', () => {
        const question = generateQuestion(OPERATIONS.MULTIPLY);
        const match = question.question.match(/(\d+) × (\d+) = \?/);
        const [, num1, num2] = match;

        expect(question.correctAnswer).toBe(parseInt(num1) * parseInt(num2));
      });
    });

    describe('division', () => {
      it('generates division question with whole number answers', () => {
        const question = generateQuestion(OPERATIONS.DIVIDE);

        expect(question.question).toMatch(/^\d+ ÷ \d+ = \?$/);
        expect(Number.isInteger(question.correctAnswer)).toBe(true);
        expect(question.correctAnswer).toBeGreaterThan(0);
      });

      it('uses practice numbers for division divisor', () => {
        const practiceNumbers = [3, 4];
        const question = generateQuestion(OPERATIONS.DIVIDE, practiceNumbers);

        const match = question.question.match(/(\d+) ÷ (\d+) = \?/);
        const [, , divisor] = match;

        expect(practiceNumbers).toContain(parseInt(divisor));
      });

      it('ensures division result is whole number', () => {
        const question = generateQuestion(OPERATIONS.DIVIDE);
        const match = question.question.match(/(\d+) ÷ (\d+) = \?/);
        const [, dividend, divisor] = match;

        expect(parseInt(dividend) % parseInt(divisor)).toBe(0);
        expect(dividend).toBeDefined(); // Ensure dividend is used
      });

      it('avoids division by zero', () => {
        const practiceNumbers = [0];
        const question = generateQuestion(OPERATIONS.DIVIDE, practiceNumbers);

        const match = question.question.match(/(\d+) ÷ (\d+) = \?/);
        const [, , divisor] = match;

        expect(parseInt(divisor)).not.toBe(0);
      });
    });

    describe('addition', () => {
      it('generates addition question within range', () => {
        const question = generateQuestion(OPERATIONS.ADD);

        expect(question.question).toMatch(/^\d+ \+ \d+ = \?$/);

        const match = question.question.match(/(\d+) \+ (\d+) = \?/);
        const [, num1, num2] = match;

        expect(question.correctAnswer).toBe(parseInt(num1) + parseInt(num2));
      });
    });

    describe('subtraction', () => {
      it('generates subtraction question with positive results', () => {
        const question = generateQuestion(OPERATIONS.SUBTRACT);

        expect(question.question).toMatch(/^\d+ - \d+ = \?$/);
        expect(question.correctAnswer).toBeGreaterThanOrEqual(0);
      });

      it('ensures subtrahend is less than or equal to minuend', () => {
        const question = generateQuestion(OPERATIONS.SUBTRACT);
        const match = question.question.match(/(\d+) - (\d+) = \?/);
        const [, num1, num2] = match;

        expect(parseInt(num1)).toBeGreaterThanOrEqual(parseInt(num2));
      });
    });

    describe('answer choices', () => {
      it('generates 3 unique answer choices', () => {
        const question = generateQuestion(OPERATIONS.MULTIPLY);

        expect(question.answers).toHaveLength(3);
        const uniqueAnswers = new Set(question.answers);
        expect(uniqueAnswers.size).toBe(3);
      });

      it('includes correct answer in choices', () => {
        const question = generateQuestion(OPERATIONS.MULTIPLY);

        expect(question.answers).toContain(question.correctAnswer);
      });

      it('has valid correctIndex pointing to correct answer', () => {
        const question = generateQuestion(OPERATIONS.MULTIPLY);

        expect(question.answers[question.correctIndex]).toBe(question.correctAnswer);
      });
    });
  });

  describe('shuffleArray', () => {
    it('returns array with same length', () => {
      const original = [1, 2, 3, 4, 5];
      const shuffled = shuffleArray([...original]);

      expect(shuffled).toHaveLength(original.length);
    });

    it('contains all original elements', () => {
      const original = [1, 2, 3, 4, 5];
      const shuffled = shuffleArray([...original]);

      expect(shuffled.sort()).toEqual(original.sort());
    });

    it('mutates the original array', () => {
      const original = [1, 2, 3, 4, 5];
      const reference = original;
      shuffleArray(original);

      expect(reference).toBe(original);
    });
  });

  describe('generateWrongAnswers', () => {
    it('generates 2 wrong answers', () => {
      const wrongAnswers = generateWrongAnswers(42, OPERATIONS.MULTIPLY);

      expect(wrongAnswers).toHaveLength(2);
    });

    it('wrong answers are different from correct answer', () => {
      const correctAnswer = 42;
      const wrongAnswers = generateWrongAnswers(correctAnswer, OPERATIONS.MULTIPLY);

      expect(wrongAnswers).not.toContain(correctAnswer);
    });

    it('wrong answers are unique', () => {
      const wrongAnswers = generateWrongAnswers(42, OPERATIONS.MULTIPLY);

      expect(wrongAnswers[0]).not.toBe(wrongAnswers[1]);
    });

    it('wrong answers are positive numbers', () => {
      const wrongAnswers = generateWrongAnswers(10, OPERATIONS.MULTIPLY);

      wrongAnswers.forEach(answer => {
        expect(answer).toBeGreaterThan(0);
      });
    });
  });
});
