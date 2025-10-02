# Auto-Continue on Correct Answer - Specification

## Overview
Improve user experience by automatically advancing to the next question when the user answers correctly, while maintaining the current behavior (manual continue) for incorrect answers.

## Current Behavior

**When answer is correct:**
1. User selects correct answer
2. Feedback message displays: "🎉 Correct! Great job! 🎉"
3. Continue button appears
4. **User must click Continue button**
5. Next question loads

**When answer is incorrect:**
1. User selects wrong answer
2. Feedback message displays: "❌ Oops! The correct answer is [X] ❌"
3. Continue button appears
4. User clicks Continue button
5. Next question loads

## Desired Behavior

**When answer is correct:**
1. User selects correct answer
2. Brief "Congrats!" banner displays
3. **Auto-advance to next question after 1.5 seconds**
4. Smooth transition

**When answer is incorrect:**
1. User selects wrong answer
2. Feedback message displays: "❌ Oops! The correct answer is [X] ❌"
3. Continue button appears
4. **User must click Continue button** (unchanged)
5. Next question loads

## Requirements

### Functional Requirements

1. **Auto-Advance on Correct Answer**
   - Automatically proceed to next question after correct answer
   - Display brief congratulatory message
   - No Continue button needed for correct answers
   - Delay: 1.5 seconds (configurable)

2. **Maintain Manual Continue for Incorrect Answers**
   - Keep existing behavior for wrong answers
   - Show full feedback with correct answer
   - Require user to click Continue button
   - User can review the correct answer

3. **Visual Feedback**
   - Brief, celebratory message for correct answers
   - Existing detailed feedback for incorrect answers
   - Smooth animations and transitions

4. **State Management**
   - Update useQuizState hook to handle auto-advance
   - Maintain score tracking
   - Clean up timers properly

### Non-Functional Requirements

1. **User Experience**
   - Faster flow for correct answers
   - Reduced clicks (better engagement)
   - Clear visual feedback
   - No jarring transitions

2. **Performance**
   - No memory leaks from timers
   - Smooth animations (60fps)
   - Proper cleanup on unmount

3. **Accessibility**
   - Announce auto-advance to screen readers
   - Provide visual indication of auto-advance
   - Allow keyboard users to see feedback

4. **Testing**
   - Unit tests for auto-advance logic
   - Component tests for conditional rendering
   - Integration tests for full flow
   - Timer cleanup tests

## Design Decisions

### 1. Delay Duration: 1.5 seconds

**Rationale:**
- Too short (< 1s): User might miss the feedback
- Too long (> 2s): Feels slow, defeats purpose
- 1.5s: Sweet spot for celebration + recognition

**Configuration:**
```javascript
const AUTO_ADVANCE_DELAY = 1500; // milliseconds
```

### 2. Visual Feedback Style

**Correct Answer - Brief Banner:**
- Simpler message: "Congrats!" or "Correct! ✓"
- Bounce animation (existing)
- Green gradient background (existing)
- No Continue button
- Optional: Progress indicator (1.5s countdown)

**Incorrect Answer - Existing:**
- Full message with correct answer shown
- Shake animation (existing)
- Red gradient background (existing)
- Continue button required
- No auto-advance

### 3. Timer Management

**Considerations:**
- Clear timer on unmount
- Clear timer if user navigates away
- Clear timer if component re-renders
- Use useEffect cleanup

## Technical Implementation

### Component Structure Changes

**QuizScreen.js:**
```javascript
// Current: Always show Continue button
{isAnswered && (
  <Fade in={isAnswered}>
    <Box>
      <Box className={isCorrect ? 'feedback-correct' : 'feedback-incorrect'}>
        {feedback}
      </Box>
      <Button variant="continue" onClick={onNextQuestion}>
        Continue
      </Button>
    </Box>
  </Fade>
)}

// New: Conditional Continue button
{isAnswered && (
  <Fade in={isAnswered}>
    <Box>
      <Box className={isCorrect ? 'feedback-correct' : 'feedback-incorrect'}>
        {isCorrect ? 'Congrats! ✓' : feedback}
      </Box>
      {!isCorrect && (
        <Button variant="continue" onClick={onNextQuestion}>
          Continue
        </Button>
      )}
    </Box>
  </Fade>
)}
```

### Hook Updates

**useQuizState.js:**
```javascript
// Add auto-advance logic
const selectAnswer = useCallback((answerIndex) => {
  setState(prev => {
    const isCorrect = answerIndex === prev.currentQuestion.correctIndex;

    return {
      ...prev,
      selectedAnswer: answerIndex,
      score: isCorrect ? prev.score + 1 : prev.score,
      totalQuestions: prev.totalQuestions + 1,
      shouldAutoAdvance: isCorrect, // New flag
    };
  });
}, []);
```

**QuizScreen.js - useEffect for auto-advance:**
```javascript
useEffect(() => {
  if (selectedAnswer !== null && isCorrect) {
    const timer = setTimeout(() => {
      onNextQuestion();
    }, AUTO_ADVANCE_DELAY);

    return () => clearTimeout(timer);
  }
}, [selectedAnswer, isCorrect, onNextQuestion]);
```

## TDD Implementation Plan

### Phase 1: Hook Logic Tests (RED)

**Test File:** `__tests__/hooks/useQuizState.test.js`

```javascript
describe('useQuizState - Auto Advance', () => {
  it('sets shouldAutoAdvance to true when answer is correct', () => {
    const { result } = renderHook(() => useQuizState());

    act(() => {
      result.current.startQuiz(OPERATIONS.ADD);
    });

    const correctIndex = result.current.state.currentQuestion.correctIndex;

    act(() => {
      result.current.selectAnswer(correctIndex);
    });

    // This test would require exposing shouldAutoAdvance or testing indirectly
    expect(result.current.state.selectedAnswer).toBe(correctIndex);
    expect(result.current.state.score).toBe(1);
  });

  it('sets shouldAutoAdvance to false when answer is incorrect', () => {
    const { result } = renderHook(() => useQuizState());

    act(() => {
      result.current.startQuiz(OPERATIONS.ADD);
    });

    const correctIndex = result.current.state.currentQuestion.correctIndex;
    const incorrectIndex = correctIndex === 0 ? 1 : 0;

    act(() => {
      result.current.selectAnswer(incorrectIndex);
    });

    expect(result.current.state.score).toBe(0);
  });
});
```

### Phase 2: Component Tests (RED)

**Test File:** `__tests__/components/QuizScreen.test.js`

```javascript
describe('QuizScreen - Auto Advance', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('does not show Continue button when answer is correct', () => {
    renderWithTheme(
      <QuizScreen
        question={mockQuestion}
        selectedAnswer={0} // correct
        score={1}
        totalQuestions={1}
        onSelectAnswer={() => {}}
        onNextQuestion={() => {}}
        onBack={() => {}}
        showBackToNumberSelection={false}
      />
    );

    expect(screen.queryByText('Continue')).not.toBeInTheDocument();
  });

  it('shows Continue button when answer is incorrect', () => {
    renderWithTheme(
      <QuizScreen
        question={mockQuestion}
        selectedAnswer={1} // incorrect
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

  it('automatically calls onNextQuestion after 1.5s on correct answer', async () => {
    const onNextQuestion = vi.fn();

    renderWithTheme(
      <QuizScreen
        question={mockQuestion}
        selectedAnswer={0} // correct
        score={1}
        totalQuestions={1}
        onSelectAnswer={() => {}}
        onNextQuestion={onNextQuestion}
        onBack={() => {}}
        showBackToNumberSelection={false}
      />
    );

    expect(onNextQuestion).not.toHaveBeenCalled();

    // Fast-forward time
    act(() => {
      vi.advanceTimersByTime(1500);
    });

    expect(onNextQuestion).toHaveBeenCalledTimes(1);
  });

  it('does not auto-advance on incorrect answer', async () => {
    const onNextQuestion = vi.fn();

    renderWithTheme(
      <QuizScreen
        question={mockQuestion}
        selectedAnswer={1} // incorrect
        score={0}
        totalQuestions={1}
        onSelectAnswer={() => {}}
        onNextQuestion={onNextQuestion}
        onBack={() => {}}
        showBackToNumberSelection={false}
      />
    );

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(onNextQuestion).not.toHaveBeenCalled();
  });

  it('cleans up timer on unmount', () => {
    const onNextQuestion = vi.fn();

    const { unmount } = renderWithTheme(
      <QuizScreen
        question={mockQuestion}
        selectedAnswer={0} // correct
        score={1}
        totalQuestions={1}
        onSelectAnswer={() => {}}
        onNextQuestion={onNextQuestion}
        onBack={() => {}}
        showBackToNumberSelection={false}
      />
    );

    unmount();

    act(() => {
      vi.advanceTimersByTime(1500);
    });

    expect(onNextQuestion).not.toHaveBeenCalled();
  });

  it('displays "Congrats! ✓" message for correct answer', () => {
    renderWithTheme(
      <QuizScreen
        question={mockQuestion}
        selectedAnswer={0} // correct
        score={1}
        totalQuestions={1}
        onSelectAnswer={() => {}}
        onNextQuestion={() => {}}
        onBack={() => {}}
        showBackToNumberSelection={false}
      />
    );

    expect(screen.getByText(/Congrats!/)).toBeInTheDocument();
  });
});
```

### Phase 3: Implementation (GREEN)

**Update QuizScreen.js:**

```javascript
import { Box, Button, Typography, Fade } from '@mui/material';
import { useEffect } from 'react';

const AUTO_ADVANCE_DELAY = 1500; // 1.5 seconds

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

  // Auto-advance on correct answer
  useEffect(() => {
    if (isCorrect) {
      const timer = setTimeout(() => {
        onNextQuestion();
      }, AUTO_ADVANCE_DELAY);

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
```

### Phase 4: Refactor

**Extract constant:**
```javascript
// src/utils/constants.js
export const TIMING = {
  AUTO_ADVANCE_DELAY: 1500,
};
```

**Add progress indicator (optional enhancement):**
```javascript
// Show countdown bar for auto-advance
{isCorrect && (
  <Box
    sx={{
      width: '100%',
      height: '4px',
      bgcolor: 'grey.300',
      borderRadius: 1,
      overflow: 'hidden',
      mt: 2,
    }}
  >
    <Box
      sx={{
        height: '100%',
        bgcolor: 'success.main',
        animation: 'progress 1.5s linear',
        '@keyframes progress': {
          from: { width: '100%' },
          to: { width: '0%' },
        },
      }}
    />
  </Box>
)}
```

## Testing Strategy

### Unit Tests
- Timer cleanup on unmount
- Auto-advance triggers after delay
- No auto-advance for incorrect answers
- State updates correctly

### Integration Tests
- Full quiz flow with auto-advance
- Score updates correctly
- Multiple correct answers in a row
- Mixed correct/incorrect answers

### Manual Testing
- Visual feedback clarity
- Timing feels appropriate
- No memory leaks (long sessions)
- Responsive on mobile
- Keyboard navigation works

## Acceptance Criteria

### Must Have
- [ ] Correct answers auto-advance after 1.5s
- [ ] Incorrect answers require manual Continue click
- [ ] "Congrats! ✓" message for correct answers
- [ ] Full feedback message for incorrect answers
- [ ] Timer cleanup prevents memory leaks
- [ ] All existing tests still pass
- [ ] New tests for auto-advance pass
- [ ] Zero linting errors

### Should Have
- [ ] Smooth fade transitions
- [ ] Proper ARIA announcements
- [ ] Configurable delay constant
- [ ] No layout shift

### Nice to Have
- [ ] Progress indicator during auto-advance
- [ ] Configurable delay per user preference
- [ ] Sound effects (optional)
- [ ] Haptic feedback on mobile

## Definition of Done

### Code Quality
- [ ] All tests passing (existing + new)
- [ ] Test coverage maintained at 90%+
- [ ] Zero linting errors
- [ ] JSDoc documentation
- [ ] Timer cleanup verified

### Functionality
- [ ] Auto-advance works on correct answers
- [ ] Manual continue works on incorrect answers
- [ ] No memory leaks detected
- [ ] Smooth user experience

### Testing
- [ ] Unit tests for QuizScreen component
- [ ] Integration tests for quiz flow
- [ ] Timer tests (setup, cleanup, execution)
- [ ] Manual testing on multiple devices

### Documentation
- [ ] Code comments explain auto-advance logic
- [ ] README updated if needed
- [ ] Constants documented

## Edge Cases

1. **Rapid Clicking**: User clicks multiple answers quickly
   - Solution: Disable buttons after first selection

2. **Component Unmount**: Timer running when user navigates away
   - Solution: useEffect cleanup function

3. **Last Question**: Auto-advance on final question
   - Solution: Check if more questions available, else stay on results

4. **Browser Tab Inactive**: Timer runs while tab is hidden
   - Solution: Accept default behavior (timer continues)

## Rollback Plan

If issues arise:
1. Revert QuizScreen changes
2. Keep existing Continue button behavior for all answers
3. Investigate timer issues
4. Re-implement with longer delay or different approach

## Success Metrics

- **Reduced Clicks**: 50% fewer clicks for users who answer correctly
- **Engagement**: Faster quiz completion for successful users
- **Retention**: No increase in drop-off rates
- **Feedback**: Positive user sentiment on UX improvement

---

**Priority**: MEDIUM
**Effort**: Small (3-4 hours)
**Risk**: Low
**Impact**: Medium (UX improvement)
