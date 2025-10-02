import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../theme';
import StartScreen from '../../components/StartScreen';
import { OPERATIONS } from '../../utils/constants';

const renderWithTheme = (component) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

describe('StartScreen', () => {
  it('renders 4 operation buttons', () => {
    renderWithTheme(<StartScreen onSelectOperation={() => {}} />);

    expect(screen.getByText('Multiplication')).toBeInTheDocument();
    expect(screen.getByText('Division')).toBeInTheDocument();
    expect(screen.getByText('Addition')).toBeInTheDocument();
    expect(screen.getByText('Subtraction')).toBeInTheDocument();
  });

  it('calls onSelectOperation with multiplication when multiply button clicked', async () => {
    const onSelectOperation = vi.fn();
    const user = userEvent.setup();

    renderWithTheme(<StartScreen onSelectOperation={onSelectOperation} />);

    await user.click(screen.getByText('Multiplication'));

    expect(onSelectOperation).toHaveBeenCalledWith(OPERATIONS.MULTIPLY);
  });

  it('calls onSelectOperation with division when divide button clicked', async () => {
    const onSelectOperation = vi.fn();
    const user = userEvent.setup();

    renderWithTheme(<StartScreen onSelectOperation={onSelectOperation} />);

    await user.click(screen.getByText('Division'));

    expect(onSelectOperation).toHaveBeenCalledWith(OPERATIONS.DIVIDE);
  });

  it('calls onSelectOperation with addition when add button clicked', async () => {
    const onSelectOperation = vi.fn();
    const user = userEvent.setup();

    renderWithTheme(<StartScreen onSelectOperation={onSelectOperation} />);

    await user.click(screen.getByText('Addition'));

    expect(onSelectOperation).toHaveBeenCalledWith(OPERATIONS.ADD);
  });

  it('calls onSelectOperation with subtraction when subtract button clicked', async () => {
    const onSelectOperation = vi.fn();
    const user = userEvent.setup();

    renderWithTheme(<StartScreen onSelectOperation={onSelectOperation} />);

    await user.click(screen.getByText('Subtraction'));

    expect(onSelectOperation).toHaveBeenCalledWith(OPERATIONS.SUBTRACT);
  });

  it('displays operation symbols correctly', () => {
    renderWithTheme(<StartScreen onSelectOperation={() => {}} />);

    expect(screen.getByText('×')).toBeInTheDocument();
    expect(screen.getByText('÷')).toBeInTheDocument();
    expect(screen.getByText('+')).toBeInTheDocument();
    expect(screen.getByText('-')).toBeInTheDocument();
  });
});
