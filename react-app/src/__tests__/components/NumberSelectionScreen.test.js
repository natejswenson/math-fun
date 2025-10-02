import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../theme';
import NumberSelectionScreen from '../../components/NumberSelectionScreen';

const renderWithTheme = (component) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

describe('NumberSelectionScreen', () => {
  it('renders numbers 0-9', () => {
    renderWithTheme(
      <NumberSelectionScreen
        operation="×"
        selectedNumbers={[]}
        onToggleNumber={() => {}}
        onStartPractice={() => {}}
        onBack={() => {}}
      />
    );

    for (let i = 0; i <= 9; i++) {
      expect(screen.getByText(i.toString())).toBeInTheDocument();
    }
  });

  it('displays multiplication title', () => {
    renderWithTheme(
      <NumberSelectionScreen
        operation="×"
        selectedNumbers={[]}
        onToggleNumber={() => {}}
        onStartPractice={() => {}}
        onBack={() => {}}
      />
    );

    expect(screen.getByText('Choose Multiplication Numbers')).toBeInTheDocument();
  });

  it('displays division title', () => {
    renderWithTheme(
      <NumberSelectionScreen
        operation="÷"
        selectedNumbers={[]}
        onToggleNumber={() => {}}
        onStartPractice={() => {}}
        onBack={() => {}}
      />
    );

    expect(screen.getByText('Choose Division Numbers')).toBeInTheDocument();
  });

  it('calls onToggleNumber when number button clicked', async () => {
    const onToggleNumber = vi.fn();
    const user = userEvent.setup();

    renderWithTheme(
      <NumberSelectionScreen
        operation="×"
        selectedNumbers={[]}
        onToggleNumber={onToggleNumber}
        onStartPractice={() => {}}
        onBack={() => {}}
      />
    );

    await user.click(screen.getByText('5'));

    expect(onToggleNumber).toHaveBeenCalledWith(5);
  });

  it('disables start button when no numbers selected', () => {
    renderWithTheme(
      <NumberSelectionScreen
        operation="×"
        selectedNumbers={[]}
        onToggleNumber={() => {}}
        onStartPractice={() => {}}
        onBack={() => {}}
      />
    );

    expect(screen.getByText('Start Practice')).toBeDisabled();
  });

  it('enables start button when numbers selected', () => {
    renderWithTheme(
      <NumberSelectionScreen
        operation="×"
        selectedNumbers={[5, 7]}
        onToggleNumber={() => {}}
        onStartPractice={() => {}}
        onBack={() => {}}
      />
    );

    expect(screen.getByText('Start Practice')).not.toBeDisabled();
  });

  it('calls onBack when back button clicked', async () => {
    const onBack = vi.fn();
    const user = userEvent.setup();

    renderWithTheme(
      <NumberSelectionScreen
        operation="×"
        selectedNumbers={[]}
        onToggleNumber={() => {}}
        onStartPractice={() => {}}
        onBack={onBack}
      />
    );

    await user.click(screen.getByText('← Back to Operations'));

    expect(onBack).toHaveBeenCalled();
  });
});
