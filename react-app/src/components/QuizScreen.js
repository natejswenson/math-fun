import { Box, Button, Typography, Fade } from '@mui/material';
import { useEffect } from 'react';
import { TIMING } from '../utils/constants';

/**
 * Quiz screen with question, answers, and feedback
 */
export default function QuizScreen({
  question,
  selectedAnswer,
  score,
  totalQuestions,
  onSelectAnswer,
  onNextQuestion,
  onBack,
  showBackToNumberSelection,
}) {
  const isAnswered = selectedAnswer !== null;
  const isCorrect = isAnswered && selectedAnswer === question.correctIndex;

  // Auto-advance to next question on correct answer
  useEffect(() => {
    if (isCorrect) {
      const timer = setTimeout(() => {
        onNextQuestion();
      }, TIMING.AUTO_ADVANCE_DELAY);

      return () => clearTimeout(timer);
    }
  }, [isCorrect, onNextQuestion]);

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3">
          {question.question}
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4 }}>
        {question.answers.map((answer, index) => (
          <Button
            key={index}
            variant="contained"
            disabled={isAnswered}
            className={selectedAnswer === index ? 'selected' : ''}
            onClick={() => onSelectAnswer(index)}
          >
            {answer}
          </Button>
        ))}
      </Box>

      {isAnswered && (
        <Fade in={isAnswered}>
          <Box>
            <Box className={isCorrect ? 'feedback-correct' : 'feedback-incorrect'}>
              {isCorrect ? (
                'Congrats! ✓'
              ) : (
                `❌ Oops! The correct answer is ${question.correctAnswer} ❌`
              )}
            </Box>

            {/* Only show Continue button for incorrect answers */}
            {!isCorrect && (
              <Button variant="continue" onClick={onNextQuestion}>
                Continue
              </Button>
            )}
          </Box>
        </Fade>
      )}

      <Box sx={{ mt: 2.5 }}>
        <Button variant="back" onClick={onBack}>
          {showBackToNumberSelection ? '← Back to Number Selection' : '← Back to Start'}
        </Button>
      </Box>

      <Box className="score-display">
        Score: {score} / {totalQuestions}
      </Box>
    </Box>
  );
}
