# Bailey's Friendly Numbers - React Edition

A modern React implementation of the Bailey's Friendly Numbers math quiz app, built with Material-UI and following TDD principles.

## Features

- **Interactive Math Practice**: Four operations (multiplication, division, addition, subtraction)
- **Targeted Practice**: Select specific numbers to practice for multiplication and division
- **Real-time Feedback**: Animated feedback for correct and incorrect answers
- **Score Tracking**: Track progress throughout the session
- **Mobile-First Design**: Fully responsive from 320px and above
- **Theme-Driven Styling**: All styling handled via Material-UI theme configuration

## Tech Stack

- **React 19**: Modern React with hooks
- **Material-UI 7**: Complete UI framework with custom theme
- **Vite**: Fast build tool and dev server
- **Vitest**: Unit and integration testing
- **Testing Library**: Component testing utilities

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the app.

### Testing

```bash
# Run tests
npm test

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

### Build

```bash
# Production build
npm run build

# Preview production build
npm run preview
```

### Linting

```bash
npm run lint
```

## Project Structure

```
src/
├── components/         # React components
│   ├── StartScreen.js
│   ├── NumberSelectionScreen.js
│   └── QuizScreen.js
├── hooks/             # Custom React hooks
│   └── useQuizState.js
├── utils/             # Utility functions
│   ├── constants.js
│   └── questionGenerator.js
├── __tests__/         # Test files
│   ├── components/
│   ├── hooks/
│   └── utils/
├── theme.js           # Material-UI theme configuration
├── App.js             # Main app component
└── main.jsx           # Entry point
```

## Architecture

### State Management

The app uses a custom `useQuizState` hook for centralized state management:

- Quiz navigation (start → number selection → quiz)
- Question generation and validation
- Score tracking
- Answer selection and feedback

### Theme Configuration

All styling is handled through the Material-UI theme in `theme.js`:

- Custom color palette matching the original design
- Custom button variants for each operation
- Responsive typography and spacing
- CSS animations for feedback (bounce/shake)
- Mobile-first breakpoints

### Component Design

Components are pure presentation components that receive props from the main App:

- **StartScreen**: Operation selection buttons
- **NumberSelectionScreen**: Number grid for targeted practice
- **QuizScreen**: Question display, answer buttons, feedback, and score

## Testing

The project follows Test-Driven Development (TDD) principles with comprehensive test coverage:

- **Unit Tests**: Utils and hooks (99%+ coverage)
- **Component Tests**: All UI components (100% coverage)
- **Integration Tests**: User flows via useQuizState hook

### Coverage Report

```
Components: 100% coverage
Hooks: 99% coverage
Utils: 99% coverage
Overall: 99%+ coverage on source code
```

## Development Practices

### TDD Cycle

1. **RED**: Write failing tests
2. **GREEN**: Implement minimal code to pass tests
3. **REFACTOR**: Improve code quality while maintaining tests

### Code Quality

- Zero linting errors
- 90%+ test coverage requirement
- No component-level styles (all theme-driven)
- PropTypes/TypeScript for type safety
- Comprehensive JSDoc documentation

## Original vs React Version

### Preserved Features

✅ All 4 math operations
✅ Number selection for × and ÷
✅ Same question generation logic
✅ Identical visual design
✅ Same animations (bounce/shake)
✅ Score tracking
✅ Mobile responsiveness

### Technical Improvements

✨ Component-based architecture
✨ Comprehensive test coverage (99%+)
✨ Theme-driven styling
✨ Modern React hooks
✨ Type-safe props
✨ Optimized performance
✨ Better state management

## Mobile Support

The app is fully responsive and works on:

- Mobile devices (320px+)
- Tablets (600px+)
- Desktop (900px+)

Touch-friendly button sizes (minimum 44px) ensure great mobile UX.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

No IE11 support required.

## License

This project is part of the Bailey's Friendly Numbers educational suite.

## Contributing

1. Follow TDD principles
2. Maintain 90%+ test coverage
3. Use Material-UI theme for all styling
4. Ensure mobile responsiveness
5. Run linting and tests before committing

## Deployment

The app can be deployed as a static site to:

- Vercel
- Netlify
- GitHub Pages
- Any static hosting service

Simply run `npm run build` and deploy the `dist` folder.

---

Built with ❤️ using React and Material-UI
