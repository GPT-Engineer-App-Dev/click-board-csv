import { Container, Text, VStack, Button } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const Index = () => {
  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Text fontSize="2xl">Your Blank Canvas</Text>
        <Text>Chat with the agent to start making edits.</Text>
        <Button as={RouterLink} to="/kanban" colorScheme="teal" size="lg">
          Go to Kanban Board
        </Button>
        <Button as={RouterLink} to="/csv-uploader" colorScheme="teal" size="lg">
          Go to CSV Uploader
        </Button>
      </VStack>
    </Container>
  );
};

export default Index;