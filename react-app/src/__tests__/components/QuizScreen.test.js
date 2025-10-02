import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../theme';
import QuizScreen from '../../components/QuizScreen';

const renderWithTheme = (component) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

const mockQuestion = {
  question: '6 × 7 = ?',
  answers: [42, 35, 49],
  correctAnswer: 42,
  correctIndex: 0,
};

describe('QuizScreen', () => {
  it('displays current question', () => {
    renderWithTheme(
      <QuizScreen
        question={mockQuestion}
        selectedAnswer={null}
        score={0}
        totalQuestions={0}
        onSelectAnswer={() => {}}
        onNextQuestion={() => {}}
        onBack={() => {}}
        showBackToNumberSelection={false}
      />
    );

    expect(screen.getByText('6 × 7 = ?')).toBeInTheDocument();
  });

  it('renders 3 answer buttons', () => {
    renderWithTheme(
      <QuizScreen
        question={mockQuestion}
        selectedAnswer={null}
        score={0}
        totalQuestions={0}
        onSelectAnswer={() => {}}
        onNextQuestion={() => {}}
        onBack={() => {}}
        showBackToNumberSelection={false}
      />
    );

    expect(screen.getByText('42')).toBeInTheDocument();
    expect(screen.getByText('35')).toBeInTheDocument();
    expect(screen.getByText('49')).toBeInTheDocument();
  });

  it('calls onSelectAnswer when answer button clicked', async () => {
    const onSelectAnswer = vi.fn();
    const user = userEvent.setup();

    renderWithTheme(
      <QuizScreen
        question={mockQuestion}
        selectedAnswer={null}
        score={0}
        totalQuestions={0}
        onSelectAnswer={onSelectAnswer}
        onNextQuestion={() => {}}
        onBack={() => {}}
        showBackToNumberSelection={false}
      />
    );

    await user.click(screen.getByText('42'));

    expect(onSelectAnswer).toHaveBeenCalledWith(0);
  });


  it('shows incorrect feedback when wrong answer selected', () => {
    renderWithTheme(
      <QuizScreen
        question={mockQuestion}
        selectedAnswer={1}
        score={0}
        totalQuestions={1}
        onSelectAnswer={() => {}}
        onNextQuestion={() => {}}
        onBack={() => {}}
        showBackToNumberSelection={false}
      />
    );

    expect(screen.getByText(/❌ Oops! The correct answer is 42 ❌/)).toBeInTheDocument();
  });

  it('displays score correctly', () => {
    renderWithTheme(
      <QuizScreen
        question={mockQuestion}
        selectedAnswer={null}
        score={5}
        totalQuestions={10}
        onSelectAnswer={() => {}}
        onNextQuestion={() => {}}
        onBack={() => {}}
        showBackToNumberSelection={false}
      />
    );

    expect(screen.getByText(/Score: 5 \/ 10/)).toBeInTheDocument();
  });

  it('shows back to number selection button when appropriate', () => {
    renderWithTheme(
      <QuizScreen
        question={mockQuestion}
        selectedAnswer={null}
        score={0}
        totalQuestions={0}
        onSelectAnswer={() => {}}
        onNextQuestion={() => {}}
        onBack={() => {}}
        showBackToNumberSelection={true}
      />
    );

    expect(screen.getByText('← Back to Number Selection')).toBeInTheDocument();
  });

  it('shows back to start button when not using number selection', () => {
    renderWithTheme(
      <QuizScreen
        question={mockQuestion}
        selectedAnswer={null}
        score={0}
        totalQuestions={0}
        onSelectAnswer={() => {}}
        onNextQuestion={() => {}}
        onBack={() => {}}
        showBackToNumberSelection={false}
      />
    );

    expect(screen.getByText('← Back to Start')).toBeInTheDocument();
  });

  describe('Auto-advance on correct answer', () => {
    it('shows Continue button when answer is incorrect', () => {
      renderWithTheme(
        <QuizScreen
          question={mockQuestion}
          selectedAnswer={1} // incorrect answer
          score={0}
          totalQuestions={1}
          onSelectAnswer={() => {}}
          onNextQuestion={() => {}}
          onBack={() => {}}
          showBackToNumberSelection={false}
        />
      );

      expect(screen.getByText('Continue')).toBeInTheDocument();
    });

    it('immediately calls onNextQuestion on correct answer', () => {
      const onNextQuestion = vi.fn();

      renderWithTheme(
        <QuizScreen
          question={mockQuestion}
          selectedAnswer={0} // correct answer
          score={1}
          totalQuestions={1}
          onSelectAnswer={() => {}}
          onNextQuestion={onNextQuestion}
          onBack={() => {}}
          showBackToNumberSelection={false}
        />
      );

      expect(onNextQuestion).toHaveBeenCalledTimes(1);
    });

    it('does not auto-advance on incorrect answer', () => {
      const onNextQuestion = vi.fn();

      renderWithTheme(
        <QuizScreen
          question={mockQuestion}
          selectedAnswer={1} // incorrect answer
          score={0}
          totalQuestions={1}
          onSelectAnswer={() => {}}
          onNextQuestion={onNextQuestion}
          onBack={() => {}}
          showBackToNumberSelection={false}
        />
      );

      expect(onNextQuestion).not.toHaveBeenCalled();
    });
  });
});
