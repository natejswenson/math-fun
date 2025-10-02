# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a simple static web application that provides an interactive math quiz game for children. The app allows kids to practice basic arithmetic operations (addition, subtraction, multiplication, division) through a colorful, engaging interface.

## File Structure

- `index.html` - Main HTML structure containing the quiz interface
- `script.js` - Core JavaScript application logic
- `style.css` - Comprehensive styling with animations and responsive design

## Development Commands

Since this is a static web application, there are no build commands or package managers. To run the application:

1. Open `index.html` directly in a web browser, or
2. Serve the files with a simple HTTP server:
   ```bash
   python3 -m http.server 8000
   # or
   npx serve .
   ```

## Application Architecture

### Core Components

**Quiz State Management**
- Global variables track current question, score, and selected answers
- `practiceNumbers` array stores user-selected numbers for targeted practice (multiplication/division)
- State transitions between start screen, number selection (optional), quiz interface, and feedback sections

**Question Generation (`generateQuestion()`)**
- Dynamically creates math problems based on selected operation
- For multiplication/division: uses numbers from `practiceNumbers` array when available
- Generates random numbers within appropriate ranges for each operation type
- Division ensures valid whole number results by generating answer first, then multiplying
- Creates incorrect answer choices and shuffles all options
- Returns question object with text, answer choices, and correct answer index

**UI Flow**
- Start screen with operation selection buttons
- Number selection screen (for multiplication/division only) to choose specific numbers to practice
- Quiz interface with question display and answer buttons
- Feedback system showing correct/incorrect results with animations
- Score tracking throughout the session
- Navigation buttons to return to previous screens

### Key Functions

- `startQuiz(operation)` - Initializes quiz for selected math operation, shows number selection for × and ÷
- `toggleNumber(number)` - Manages number selection for targeted practice (multiplication/division)
- `startPractice()` - Begins quiz with selected practice numbers
- `generateQuestion()` - Creates new math problems with multiple choice answers (uses practiceNumbers array when set)
- `selectAnswer(index)` - Handles answer selection and shows feedback
- `nextQuestion()` - Advances to next question
- `goBackToStart()` - Returns to operation selection screen
- `goBackToNumberSelection()` - Returns to number selection screen (multiplication/division only)

### Styling Approach

- Uses CSS Grid and Flexbox for responsive layout
- Gradient backgrounds and hover animations for interactive elements
- CSS animations for feedback states (bounce for correct, shake for incorrect)
- Mobile-responsive design with media queries
- Child-friendly color scheme and Comic Sans font

## Code Conventions

- Vanilla JavaScript (no frameworks)
- Global state variables for simplicity
- CSS classes for state management (.hidden, .selected, .correct, .incorrect)
- Semantic HTML structure
- BEM-like CSS naming for components