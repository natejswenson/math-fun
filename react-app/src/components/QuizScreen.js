import { Box, Button, Typography, Fade } from '@mui/material';

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
                '🎉 Correct! Great job! 🎉'
              ) : (
                `❌ Oops! The correct answer is ${question.correctAnswer} ❌`
              )}
            </Box>
            <Button variant="continue" onClick={onNextQuestion}>
              Continue
            </Button>
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
