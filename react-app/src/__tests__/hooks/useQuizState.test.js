import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useQuizState } from '../../hooks/useQuizState';
import { OPERATIONS, SCREENS } from '../../utils/constants';

describe('useQuizState', () => {
  it('initializes with default state', () => {
    const { result } = renderHook(() => useQuizState());

    expect(result.current.state.screen).toBe(SCREENS.START);
    expect(result.current.state.operation).toBeNull();
    expect(result.current.state.selectedNumbers).toEqual([]);
    expect(result.current.state.practiceNumbers).toEqual([]);
    expect(result.current.state.score).toBe(0);
    expect(result.current.state.totalQuestions).toBe(0);
    expect(result.current.state.selectedAnswer).toBeNull();
  });

  it('starts quiz with operation', () => {
    const { result } = renderHook(() => useQuizState());

    act(() => {
      result.current.startQuiz(OPERATIONS.MULTIPLY);
    });

    expect(result.current.state.operation).toBe(OPERATIONS.MULTIPLY);
    expect(result.current.state.screen).toBe(SCREENS.NUMBER_SELECTION);
  });

  it('goes directly to quiz for addition', () => {
    const { result } = renderHook(() => useQuizState());

    act(() => {
      result.current.startQuiz(OPERATIONS.ADD);
    });

    expect(result.current.state.operation).toBe(OPERATIONS.ADD);
    expect(result.current.state.screen).toBe(SCREENS.QUIZ);
    expect(result.current.state.currentQuestion).toBeDefined();
  });

  it('toggles number selection', () => {
    const { result } = renderHook(() => useQuizState());

    act(() => {
      result.current.toggleNumber(5);
    });

    expect(result.current.state.selectedNumbers).toContain(5);

    act(() => {
      result.current.toggleNumber(5);
    });

    expect(result.current.state.selectedNumbers).not.toContain(5);
  });

  it('starts practice with selected numbers', () => {
    const { result } = renderHook(() => useQuizState());

    act(() => {
      result.current.startQuiz(OPERATIONS.MULTIPLY);
      result.current.toggleNumber(5);
      result.current.toggleNumber(7);
      result.current.startPractice();
    });

    expect(result.current.state.screen).toBe(SCREENS.QUIZ);
    expect(result.current.state.practiceNumbers).toEqual([5, 7]);
    expect(result.current.state.currentQuestion).toBeDefined();
  });

  it('selects answer and updates score on correct answer', () => {
    const { result } = renderHook(() => useQuizState());

    act(() => {
      result.current.startQuiz(OPERATIONS.ADD);
    });

    const correctIndex = result.current.state.currentQuestion.correctIndex;

    act(() => {
      result.current.selectAnswer(correctIndex);
    });

    expect(result.current.state.selectedAnswer).toBe(correctIndex);
    expect(result.current.state.score).toBe(1);
    expect(result.current.state.totalQuestions).toBe(1);
  });

  it('selects answer but does not update score on incorrect answer', () => {
    const { result } = renderHook(() => useQuizState());

    act(() => {
      result.current.startQuiz(OPERATIONS.ADD);
    });

    const correctIndex = result.current.state.currentQuestion.correctIndex;
    const incorrectIndex = correctIndex === 0 ? 1 : 0;

    act(() => {
      result.current.selectAnswer(incorrectIndex);
    });

    expect(result.current.state.selectedAnswer).toBe(incorrectIndex);
    expect(result.current.state.score).toBe(0);
    expect(result.current.state.totalQuestions).toBe(1);
  });

  it('generates next question', () => {
    const { result } = renderHook(() => useQuizState());

    act(() => {
      result.current.startQuiz(OPERATIONS.ADD);
    });

    const firstQuestion = result.current.state.currentQuestion;

    act(() => {
      result.current.nextQuestion();
    });

    const secondQuestion = result.current.state.currentQuestion;

    expect(secondQuestion).not.toBe(firstQuestion);
    expect(result.current.state.selectedAnswer).toBeNull();
  });

  it('goes back to start screen', () => {
    const { result } = renderHook(() => useQuizState());

    act(() => {
      result.current.startQuiz(OPERATIONS.ADD);
      result.current.selectAnswer(0);
      result.current.goBackToStart();
    });

    expect(result.current.state.screen).toBe(SCREENS.START);
    expect(result.current.state.score).toBe(0);
    expect(result.current.state.totalQuestions).toBe(0);
    expect(result.current.state.selectedAnswer).toBeNull();
  });

  it('goes back to number selection from quiz', () => {
    const { result } = renderHook(() => useQuizState());

    act(() => {
      result.current.startQuiz(OPERATIONS.MULTIPLY);
      result.current.toggleNumber(5);
      result.current.startPractice();
      result.current.goBackToNumberSelection();
    });

    expect(result.current.state.screen).toBe(SCREENS.NUMBER_SELECTION);
    expect(result.current.state.score).toBe(0);
    expect(result.current.state.totalQuestions).toBe(0);
  });
});
