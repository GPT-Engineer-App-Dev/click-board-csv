import React from 'react';
import { Box, Button, Container } from '@chakra-ui/react';
import confetti from 'canvas-confetti';

const ConfettiPage = () => {
  const handleClick = () => {
    confetti({
      particleCount: 200,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  return (
    <Container centerContent>
      <Box textAlign="center" py={10} px={6}>
        <Button colorScheme="teal" size="lg" onClick={handleClick}>
          Click me for Confetti!
        </Button>
      </Box>
    </Container>
  );
};

export default ConfettiPage;