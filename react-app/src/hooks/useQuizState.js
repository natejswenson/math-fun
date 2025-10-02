import { useState, useCallback } from 'react';
import { generateQuestion } from '../utils/questionGenerator';
import { OPERATIONS, SCREENS } from '../utils/constants';

/**
 * Custom hook for managing quiz state
 * @returns {Object} Quiz state and actions
 */
export function useQuizState() {
  const [state, setState] = useState({
    screen: SCREENS.START,
    operation: null,
    selectedNumbers: [],
    practiceNumbers: [],
    currentQuestion: null,
    selectedAnswer: null,
    score: 0,
    totalQuestions: 0,
  });

  const startQuiz = useCallback((operation) => {
    setState(prev => ({
      ...prev,
      operation,
      screen: operation === OPERATIONS.MULTIPLY || operation === OPERATIONS.DIVIDE
        ? SCREENS.NUMBER_SELECTION
        : SCREENS.QUIZ,
      currentQuestion: operation === OPERATIONS.ADD || operation === OPERATIONS.SUBTRACT
        ? generateQuestion(operation)
        : null,
      score: operation === OPERATIONS.ADD || operation === OPERATIONS.SUBTRACT ? 0 : prev.score,
      totalQuestions: operation === OPERATIONS.ADD || operation === OPERATIONS.SUBTRACT ? 0 : prev.totalQuestions,
    }));
  }, []);

  const toggleNumber = useCallback((number) => {
    setState(prev => {
      const selectedNumbers = prev.selectedNumbers.includes(number)
        ? prev.selectedNumbers.filter(n => n !== number)
        : [...prev.selectedNumbers, number];

      return {
        ...prev,
        selectedNumbers,
      };
    });
  }, []);

  const startPractice = useCallback(() => {
    setState(prev => ({
      ...prev,
      practiceNumbers: [...prev.selectedNumbers],
      screen: SCREENS.QUIZ,
      currentQuestion: generateQuestion(prev.operation, [...prev.selectedNumbers]),
      score: 0,
      totalQuestions: 0,
      selectedAnswer: null,
    }));
  }, []);

  const selectAnswer = useCallback((answerIndex) => {
    setState(prev => {
      const isCorrect = answerIndex === prev.currentQuestion.correctIndex;

      return {
        ...prev,
        selectedAnswer: answerIndex,
        score: isCorrect ? prev.score + 1 : prev.score,
        totalQuestions: prev.totalQuestions + 1,
      };
    });
  }, []);

  const nextQuestion = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentQuestion: generateQuestion(prev.operation, prev.practiceNumbers),
      selectedAnswer: null,
    }));
  }, []);

  const goBackToStart = useCallback(() => {
    setState({
      screen: SCREENS.START,
      operation: null,
      selectedNumbers: [],
      practiceNumbers: [],
      currentQuestion: null,
      selectedAnswer: null,
      score: 0,
      totalQuestions: 0,
    });
  }, []);

  const goBackToNumberSelection = useCallback(() => {
    setState(prev => ({
      ...prev,
      screen: prev.operation === OPERATIONS.MULTIPLY || prev.operation === OPERATIONS.DIVIDE
        ? SCREENS.NUMBER_SELECTION
        : SCREENS.START,
      score: 0,
      totalQuestions: 0,
      selectedAnswer: null,
    }));
  }, []);

  return {
    state,
    startQuiz,
    toggleNumber,
    startPractice,
    selectAnswer,
    nextQuestion,
    goBackToStart,
    goBackToNumberSelection,
  };
}
