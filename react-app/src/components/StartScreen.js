import { Box, Button, Typography } from '@mui/material';
import { OPERATIONS } from '../utils/constants';

/**
 * Start screen with operation selection buttons
 */
export default function StartScreen({ onSelectOperation }) {
  const operations = [
    { symbol: OPERATIONS.MULTIPLY, name: 'Multiplication', variant: 'operation-multiply' },
    { symbol: OPERATIONS.DIVIDE, name: 'Division', variant: 'operation-divide' },
    { symbol: OPERATIONS.ADD, name: 'Addition', variant: 'operation-add' },
    { symbol: OPERATIONS.SUBTRACT, name: 'Subtraction', variant: 'operation-subtract' },
  ];

  return (
    <Box>
      <Typography variant="h2" sx={{ mb: 4 }}>
        Choose Your Math Adventure!
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
          gap: 2.5,
          mb: 2.5,
        }}
      >
        {operations.map(({ symbol, name, variant }) => (
          <Button
            key={symbol}
            variant={variant}
            onClick={() => onSelectOperation(symbol)}
          >
            <Typography sx={{ fontSize: '3em', fontWeight: 'bold', lineHeight: 1 }}>
              {symbol}
            </Typography>
            <Typography sx={{ fontSize: '1.2em', fontWeight: 'bold' }}>
              {name}
            </Typography>
          </Button>
        ))}
      </Box>
    </Box>
  );
}
