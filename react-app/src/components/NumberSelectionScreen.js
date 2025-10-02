import { Box, Button, Typography } from '@mui/material';

/**
 * Number selection screen for multiplication and division practice
 */
export default function NumberSelectionScreen({
  operation,
  selectedNumbers,
  onToggleNumber,
  onStartPractice,
  onBack,
}) {
  const title = operation === '×' ? 'Choose Multiplication Numbers' : 'Choose Division Numbers';
  const subtitle = operation === '×'
    ? 'Select the multipliers you want to practice with:'
    : 'Select the divisors you want to practice with:';

  return (
    <Box>
      <Typography variant="h2" sx={{ mb: 2 }}>
        {title}
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        {subtitle}
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: 1.25,
          maxWidth: { xs: '280px', sm: '320px', md: '400px' },
          mx: 'auto',
          mb: 4,
        }}
      >
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
          <Button
            key={number}
            variant="outlined"
            fullWidth
            className={selectedNumbers.includes(number) ? 'selected' : ''}
            onClick={() => onToggleNumber(number)}
          >
            {number}
          </Button>
        ))}
      </Box>

      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2.5, justifyContent: 'center', alignItems: 'center' }}>
        <Button
          variant="start-practice"
          disabled={selectedNumbers.length === 0}
          onClick={onStartPractice}
        >
          Start Practice
        </Button>
        <Button variant="back" onClick={onBack}>
          ← Back to Operations
        </Button>
      </Box>
    </Box>
  );
}
