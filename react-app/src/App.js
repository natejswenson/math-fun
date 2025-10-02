import { ThemeProvider } from '@mui/material/styles';
import { Container, Paper, Typography, Box, CssBaseline } from '@mui/material';
import theme from './theme';
import { useQuizState } from './hooks/useQuizState';
import { SCREENS, OPERATIONS } from './utils/constants';
import StartScreen from './components/StartScreen';
import NumberSelectionScreen from './components/NumberSelectionScreen';
import QuizScreen from './components/QuizScreen';

/**
 * Main App component for Bailey's Friendly Numbers
 */
function App() {
  const {
    state,
    startQuiz,
    toggleNumber,
    startPractice,
    selectAnswer,
    nextQuestion,
    goBackToStart,
    goBackToNumberSelection,
  } = useQuizState();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px',
        }}
      >
        <Container maxWidth="sm">
          <Paper>
            <Typography variant="h1" sx={{ mb: 4 }}>
              🌟 Bailey's Friendly Numbers! 🌟
            </Typography>

            {state.screen === SCREENS.START && (
              <StartScreen onSelectOperation={startQuiz} />
            )}

            {state.screen === SCREENS.NUMBER_SELECTION && (
              <NumberSelectionScreen
                operation={state.operation}
                selectedNumbers={state.selectedNumbers}
                onToggleNumber={toggleNumber}
                onStartPractice={startPractice}
                onBack={goBackToStart}
              />
            )}

            {state.screen === SCREENS.QUIZ && state.currentQuestion && (
              <QuizScreen
                question={state.currentQuestion}
                selectedAnswer={state.selectedAnswer}
                score={state.score}
                totalQuestions={state.totalQuestions}
                onSelectAnswer={selectAnswer}
                onNextQuestion={nextQuestion}
                onBack={goBackToNumberSelection}
                showBackToNumberSelection={
                  state.operation === OPERATIONS.MULTIPLY ||
                  state.operation === OPERATIONS.DIVIDE
                }
              />
            )}
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
