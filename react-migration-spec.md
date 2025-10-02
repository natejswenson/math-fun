# React + Material-UI Migration Specification

## Overview
Convert Bailey's Friendly Numbers math quiz application from vanilla JavaScript to a React application using Material-UI framework with complete theme-based styling.

## Requirements

### Functional Requirements
1. **Preserve All Current Features**
   - Four math operations: multiplication (×), division (÷), addition (+), subtraction (-)
   - Number selection screen for multiplication/division (0-9)
   - Dynamic question generation with multiple choice answers
   - Score tracking throughout session
   - Animated feedback for correct/incorrect answers
   - Three-screen navigation flow: Start → Number Selection (conditional) → Quiz

2. **React Architecture**
   - Component-based architecture
   - State management using React hooks (useState, useEffect)
   - Proper component composition and reusability
   - Props validation with PropTypes or TypeScript

3. **Material-UI Integration**
   - All styling via MUI theme configuration
   - No inline styles or styled-components in component files
   - Use MUI components: Button, Container, Typography, Box, Paper, Grid
   - Responsive breakpoints using MUI theme
   - Animation support using MUI's built-in capabilities

### Non-Functional Requirements
1. **Mobile-First Responsive Design**
   - Optimized for small screens (320px+)
   - Touch-friendly button sizes (min 44px)
   - Readable typography at all screen sizes
   - Proper spacing and layout on mobile devices

2. **Performance**
   - Fast initial load time
   - Smooth animations (60fps)
   - No unnecessary re-renders

3. **Accessibility**
   - Semantic HTML via MUI components
   - Keyboard navigation support
   - ARIA labels where appropriate
   - Sufficient color contrast

4. **Code Quality**
   - Clean, maintainable code
   - Proper separation of concerns
   - Reusable components
   - Comprehensive test coverage

## TDD Plan

### Red-Green-Refactor Cycle

#### Phase 1: Project Setup & Theme Configuration
**RED**: Write tests for theme configuration
- Test theme palette matches current color scheme
- Test typography configuration (Comic Sans fallback)
- Test breakpoint configurations
- Test button variant styles

**GREEN**: Implement MUI theme
- Create theme.js with custom palette
- Configure typography with playful font stack
- Set up responsive breakpoints
- Define custom button variants for operations

**REFACTOR**: Optimize theme structure
- Extract color constants
- Create theme utilities
- Document theme tokens

#### Phase 2: Core Components
**RED**: Write component tests
- StartScreen component renders operation buttons
- NumberSelection component renders number grid
- QuizContainer component renders question and answers
- FeedbackDisplay component shows correct/incorrect messages
- ScoreDisplay component shows current score

**GREEN**: Implement components
- Build each component using MUI primitives
- Connect to theme for all styling
- Implement basic rendering logic

**REFACTOR**: Improve component structure
- Extract common patterns
- Optimize prop drilling
- Add PropTypes/TypeScript

#### Phase 3: State Management
**RED**: Write state management tests
- Test quiz state initialization
- Test operation selection updates state
- Test number selection toggles
- Test answer selection logic
- Test score updates
- Test navigation between screens

**GREEN**: Implement state logic
- Create custom hooks (useQuizState, useNavigation)
- Implement question generation logic
- Handle answer selection and validation
- Manage score tracking

**REFACTOR**: Optimize state management
- Reduce unnecessary renders
- Extract business logic
- Add state debugging tools

#### Phase 4: Question Generation Logic
**RED**: Write question generation tests
- Test multiplication question generation
- Test division question generation (whole numbers only)
- Test addition question generation
- Test subtraction question generation
- Test practice number filtering (multiplication/division)
- Test answer shuffling
- Test wrong answer generation

**GREEN**: Implement question generator
- Port generateQuestion logic to utility function
- Implement practice number integration
- Create answer choice generator
- Add shuffle utility

**REFACTOR**: Clean up utilities
- Optimize random number generation
- Extract constants (min/max ranges)
- Add JSDoc documentation

#### Phase 5: Animations & Feedback
**RED**: Write animation tests
- Test correct answer animation triggers
- Test incorrect answer animation triggers
- Test button hover states
- Test screen transition animations

**GREEN**: Implement animations
- Use MUI's Grow/Fade components for transitions
- Create custom keyframe animations in theme
- Add button interaction animations
- Implement feedback message animations

**REFACTOR**: Optimize animations
- Ensure 60fps performance
- Add reduced motion support
- Extract animation configurations

#### Phase 6: Navigation & Routing
**RED**: Write navigation tests
- Test navigation to number selection (×, ÷ only)
- Test direct to quiz navigation (+, -)
- Test back navigation flows
- Test state preservation during navigation

**GREEN**: Implement navigation
- Create navigation state machine
- Implement conditional routing logic
- Add back button handlers
- Preserve quiz state appropriately

**REFACTOR**: Simplify navigation
- Extract navigation logic to hook
- Add navigation guards
- Improve UX transitions

## Test Categories

### Unit Tests
1. **Utility Functions**
   - `generateQuestion(operation, practiceNumbers)` - all operations
   - `shuffleArray(array)` - randomization
   - `generateWrongAnswers(correctAnswer, operation)` - incorrect choices
   - Number range validators

2. **Custom Hooks**
   - `useQuizState()` - state initialization and updates
   - `useNavigation()` - screen transitions
   - `useScore()` - score tracking

3. **Components (Isolated)**
   - StartScreen - renders 4 operation buttons
   - NumberSelection - renders 0-9 grid, selection toggle
   - QuizContainer - displays question and answers
   - AnswerButton - handles selection and disabled states
   - FeedbackDisplay - shows correct/incorrect messages
   - ScoreDisplay - displays score ratio

### Integration Tests
1. **User Flows**
   - Complete multiplication quiz flow with number selection
   - Complete division quiz flow with number selection
   - Complete addition quiz flow (direct to quiz)
   - Complete subtraction quiz flow (direct to quiz)
   - Back navigation from quiz to number selection
   - Back navigation to start screen

2. **State Integration**
   - Score updates correctly on answer selection
   - Selected numbers filter questions properly
   - Question regenerates on "Continue"
   - State resets on back to start

### End-to-End Tests (Optional)
1. **Complete User Journeys**
   - User completes 10 multiplication questions with number selection
   - User practices specific numbers (e.g., 7s table)
   - User switches between operations
   - Mobile responsive behavior verification

## Architecture Design

### Component Structure
```
App (Theme Provider)
├── StartScreen
│   └── OperationButton (×4)
├── NumberSelectionScreen
│   ├── NumberButton (×10)
│   ├── StartPracticeButton
│   └── BackButton
└── QuizScreen
    ├── QuestionDisplay
    ├── AnswerButton (×3)
    ├── FeedbackDisplay
    │   └── ContinueButton
    ├── ScoreDisplay
    └── BackButton
```

### State Management
```javascript
// Main App State
{
  screen: 'start' | 'numberSelection' | 'quiz',
  operation: '×' | '÷' | '+' | '-' | null,
  selectedNumbers: number[],
  practiceNumbers: number[],
  currentQuestion: {
    question: string,
    answers: number[],
    correctAnswer: number,
    correctIndex: number
  },
  selectedAnswer: number | null,
  score: number,
  totalQuestions: number
}
```

### Material-UI Theme Structure
```javascript
// theme.js
{
  palette: {
    primary: { /* blue gradient colors */ },
    secondary: { /* coral/peach colors */ },
    success: { /* green for correct */ },
    error: { /* red/pink for incorrect */ },
    warning: { /* orange for subtraction */ },
    info: { /* teal for addition */ },
    background: {
      default: '#ffecd2', // peach gradient start
      paper: '#ffffff'
    }
  },
  typography: {
    fontFamily: '"Comic Sans MS", "Comic Sans", cursive, sans-serif',
    h1: { /* title styling */ },
    h2: { /* operation/question styling */ },
    body1: { /* general text */ },
    button: { /* button text */ }
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 400,
      md: 600,
      lg: 900,
      xl: 1200
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { /* base button styles */ },
        contained: { /* gradient backgrounds */ }
      },
      variants: [
        { props: { variant: 'operation-multiply' }, style: { /* red/pink gradient */ } },
        { props: { variant: 'operation-divide' }, style: { /* blue gradient */ } },
        { props: { variant: 'operation-add' }, style: { /* teal gradient */ } },
        { props: { variant: 'operation-subtract' }, style: { /* orange gradient */ } }
      ]
    },
    MuiContainer: { /* container styling */ },
    MuiPaper: { /* card styling */ }
  },
  animations: {
    bounce: { /* keyframes for correct answer */ },
    shake: { /* keyframes for incorrect answer */ }
  }
}
```

### File Structure
```
src/
├── App.js                      # Main app component
├── theme.js                    # MUI theme configuration
├── components/
│   ├── StartScreen.js
│   ├── NumberSelectionScreen.js
│   ├── QuizScreen.js
│   ├── OperationButton.js
│   ├── NumberButton.js
│   ├── QuestionDisplay.js
│   ├── AnswerButton.js
│   ├── FeedbackDisplay.js
│   └── ScoreDisplay.js
├── hooks/
│   ├── useQuizState.js
│   ├── useNavigation.js
│   └── useScore.js
├── utils/
│   ├── questionGenerator.js
│   ├── shuffle.js
│   └── constants.js
└── __tests__/
    ├── components/
    ├── hooks/
    └── utils/
```

## Implementation Phases

### Phase 1: Foundation (Week 1)
1. Set up React project with Create React App or Vite
2. Install Material-UI dependencies
3. Create theme configuration matching current design
4. Set up testing infrastructure (Jest, React Testing Library)
5. Write theme configuration tests

**Deliverable**: Working React app shell with MUI theme

### Phase 2: Core Components (Week 1-2)
1. Build StartScreen component with operation buttons
2. Build NumberSelectionScreen with number grid
3. Build QuizScreen with question/answer layout
4. Write and pass all component unit tests

**Deliverable**: All UI components rendering with theme styling

### Phase 3: Business Logic (Week 2)
1. Implement question generation utilities
2. Create custom hooks for state management
3. Port answer validation logic
4. Write and pass all utility and hook tests

**Deliverable**: Working quiz logic without animations

### Phase 4: Interactivity & Animation (Week 2-3)
1. Implement answer selection logic
2. Add feedback animations (bounce/shake)
3. Add button hover/press animations
4. Add screen transition animations
5. Write and pass animation tests

**Deliverable**: Fully interactive quiz with animations

### Phase 5: Navigation & Integration (Week 3)
1. Implement screen navigation logic
2. Connect state management across components
3. Add back navigation functionality
4. Write and pass integration tests

**Deliverable**: Complete user flows working

### Phase 6: Polish & Optimization (Week 3-4)
1. Mobile responsiveness testing and fixes
2. Performance optimization
3. Accessibility improvements
4. Cross-browser testing
5. Final E2E test suite

**Deliverable**: Production-ready application

## Testing Strategy

### Test Framework Stack
- **Unit/Integration**: Jest + React Testing Library
- **E2E** (optional): Cypress or Playwright
- **Coverage Target**: 90%+ for utils/hooks, 80%+ for components

### Testing Principles
1. Test behavior, not implementation
2. Write tests before implementation (TDD)
3. Keep tests simple and readable
4. Mock external dependencies only when necessary
5. Test accessibility in component tests

### Key Test Scenarios

#### Question Generation Tests
```javascript
describe('generateQuestion', () => {
  it('generates multiplication question within range', () => {});
  it('uses practice numbers when provided for multiplication', () => {});
  it('generates division with whole number answers only', () => {});
  it('uses practice numbers for division divisor', () => {});
  it('generates 3 unique answer choices', () => {});
  it('includes correct answer in choices', () => {});
  it('shuffles answer positions randomly', () => {});
});
```

#### Component Tests
```javascript
describe('StartScreen', () => {
  it('renders 4 operation buttons', () => {});
  it('calls onSelectOperation with correct operation', () => {});
  it('applies correct theme variant to each button', () => {});
});

describe('NumberSelectionScreen', () => {
  it('renders numbers 0-9', () => {});
  it('toggles number selection on click', () => {});
  it('disables start button when no numbers selected', () => {});
  it('enables start button when numbers selected', () => {});
  it('calls onBack when back button clicked', () => {});
});

describe('QuizScreen', () => {
  it('displays current question', () => {});
  it('renders 3 answer buttons', () => {});
  it('disables all buttons after selection', () => {});
  it('shows feedback after answer selected', () => {});
  it('updates score on correct answer', () => {});
  it('displays correct answer on wrong selection', () => {});
});
```

#### Integration Tests
```javascript
describe('Quiz Flow', () => {
  it('completes multiplication quiz with number selection', async () => {
    // 1. Render app
    // 2. Click multiplication button
    // 3. Select numbers 5 and 7
    // 4. Click start practice
    // 5. Answer question
    // 6. Verify feedback
    // 7. Click continue
    // 8. Verify new question
  });

  it('completes addition quiz directly', async () => {
    // 1. Render app
    // 2. Click addition button
    // 3. Verify quiz screen shown
    // 4. Answer question
    // 5. Verify score updates
  });
});
```

## Definition of Done

### Feature Completion Checklist
- [ ] All current features preserved and working
- [ ] All styling handled via MUI theme (no component-level styles)
- [ ] Mobile responsive on screens 320px and above
- [ ] All animations working smoothly (bounce/shake/hover)
- [ ] All navigation flows working correctly
- [ ] Score tracking accurate
- [ ] Question generation matches original logic
- [ ] Practice number filtering works for ×, ÷

### Code Quality Checklist
- [ ] All unit tests passing (90%+ coverage for utils/hooks)
- [ ] All integration tests passing
- [ ] No prop-types warnings
- [ ] No console errors or warnings
- [ ] Code follows React best practices
- [ ] Components are properly decomposed
- [ ] No duplicate code

### Technical Checklist
- [ ] MUI theme fully configured with all color variants
- [ ] Custom button variants for each operation
- [ ] Typography matches original (Comic Sans)
- [ ] Gradients implemented via theme
- [ ] Animations defined in theme or MUI components
- [ ] Responsive breakpoints configured
- [ ] No inline styles in components
- [ ] All imports organized and clean

### Testing Checklist
- [ ] Question generation utils fully tested
- [ ] All components have unit tests
- [ ] Integration tests cover main user flows
- [ ] Mobile responsiveness verified
- [ ] Touch interactions work on mobile
- [ ] Accessibility tested (keyboard nav, screen reader)

### Performance Checklist
- [ ] Initial load time < 2 seconds
- [ ] Animations run at 60fps
- [ ] No unnecessary re-renders (React DevTools profiler)
- [ ] Bundle size optimized
- [ ] Images optimized (if any added)

## Acceptance Criteria

### User Experience
1. **Visual Parity**: App looks identical to original design
2. **Functionality**: All features work as in original app
3. **Responsiveness**: Usable on mobile devices (320px+)
4. **Performance**: Smooth animations and interactions
5. **Accessibility**: Keyboard navigable, proper ARIA labels

### Technical Excellence
1. **Theme-Driven**: Zero styling in components, all via theme
2. **Test Coverage**: 85%+ overall code coverage
3. **Code Quality**: Passes ESLint with no warnings
4. **React Best Practices**: Proper hooks usage, no anti-patterns
5. **MUI Best Practices**: Proper component usage, theme integration

### Success Metrics
- All existing features working in React version
- Page load time ≤ 2 seconds
- Test coverage ≥ 85%
- Zero accessibility violations (axe DevTools)
- Mobile responsive on all tested devices
- Smooth 60fps animations

## Migration Notes

### Key Differences from Original
1. **State Management**: Global variables → React hooks
2. **Styling**: CSS classes → MUI theme
3. **DOM Manipulation**: Direct DOM → React declarative rendering
4. **Event Handling**: onclick attributes → React event handlers
5. **Animations**: CSS animations → MUI transitions + theme animations

### Preserving Original Behavior
1. **Number Selection**: Only for × and ÷ operations
2. **Division Logic**: Always generates whole number answers
3. **Score Tracking**: Persistent within session, resets on back to start
4. **Question Generation**: Same ranges and logic as original
5. **Answer Choices**: Always 3 choices with 2 wrong answers

### MUI Component Mapping
- `<div class="container">` → `<Container>` + `<Paper>`
- `<h1>`, `<h2>` → `<Typography variant="h1/h2">`
- `<button class="operation-btn">` → `<Button variant="operation-multiply">`
- `<button class="answer-btn">` → `<Button variant="contained">`
- `<button class="number-btn">` → `<Button variant="outlined">`
- `<div id="feedback-section">` → `<Box>` with `<Fade>` or `<Grow>`

## Development Commands

### Setup
```bash
# Create React app
npx create-react-app mathqs-react
cd mathqs-react

# Install Material-UI
npm install @mui/material @emotion/react @emotion/styled

# Install testing libraries (usually included)
npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event

# Install additional dev dependencies
npm install --save-dev eslint-plugin-react-hooks
```

### Development
```bash
# Run development server
npm start

# Run tests in watch mode
npm test

# Run tests with coverage
npm test -- --coverage

# Build for production
npm run build

# Serve production build locally
npx serve -s build
```

### Testing Commands
```bash
# Run all tests
npm test

# Run specific test file
npm test -- QuizScreen.test.js

# Run tests with coverage report
npm test -- --coverage --watchAll=false

# Update snapshots
npm test -- -u
```

## Additional Considerations

### Future Enhancements (Out of Scope)
- Timer for each question
- Leaderboard/high scores
- Sound effects for feedback
- Progress tracking across sessions
- Difficulty levels
- More operations (exponents, fractions)

### Known Constraints
- Must work without backend (static deployment)
- Must support modern browsers only (Chrome, Firefox, Safari, Edge)
- No IE11 support required
- Minimum screen size: 320px width

### Risk Mitigation
1. **Risk**: Theme complexity may require component-level overrides
   - **Mitigation**: Thoroughly test theme structure before building components

2. **Risk**: Animation performance on low-end mobile devices
   - **Mitigation**: Add reduced motion media query support

3. **Risk**: Comic Sans font not available on all devices
   - **Mitigation**: Proper font stack fallbacks in theme

4. **Risk**: Test coverage may be difficult for animation logic
   - **Mitigation**: Use integration tests to verify animation behavior

## Conclusion

This specification provides a comprehensive roadmap for converting Bailey's Friendly Numbers to a modern React application with Material-UI. By following TDD principles and the phased implementation approach, we ensure:

- High code quality and test coverage
- Consistent styling through theme configuration
- Mobile-friendly responsive design
- Preserved functionality and user experience
- Maintainable and scalable codebase

The migration will result in a modern, well-tested React application that maintains the charm and functionality of the original while providing a solid foundation for future enhancements.
