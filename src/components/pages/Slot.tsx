import { useState, memo } from 'react';
import { Box, Flex, Button, Text, Spinner, Center } from '@chakra-ui/react';

const symbols = ['🍒', '🔔', '💎', '7️⃣'];

export const Slot = memo(() => {
  const [reels, setReels] = useState([0, 0, 0]);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState('');

  const spin = () => {
    setSpinning(true);
    setResult('');

    setTimeout(() => {
      const newReels = reels.map(() =>
        Math.floor(Math.random() * symbols.length)
      );
      setReels(newReels);
      setSpinning(false);

      if (newReels[0] === newReels[1] && newReels[1] === newReels[2]) {
        setResult('当たり！');
      } else {
        setResult('はずれ');
      }
    }, 400);
  };

  return (
    <Center h="100vh">
      <Box maxW="md" mx="auto" p={4}>
        {/* タイトル */}
        <Flex justifyContent="center" mb={4}>
          {reels.map((reelIndex, i) => (
            <Box
              key={i}
              w="100px"
              h="100px"
              border="2px solid"
              borderColor="teal.500"
              display="flex"
              justifyContent="center"
              alignItems="center"
              fontSize="4em"
              mx={2}
              transition="transform 0.5s ease-in-out"
              transform={spinning ? 'rotateX(3600deg)' : 'none'}
            >
              {spinning ? <Spinner /> : symbols[reelIndex]}
            </Box>
          ))}
        </Flex>
        <Box textAlign="center">
          <Button
            justifyContent="center"
            onClick={spin}
            isLoading={spinning}
            loadingText="スピン中"
            bg="teal.500"
            color="white"
            _hover={{
              opacity: 0.8,
            }}
          >
            スピン
          </Button>
        </Box>

        <Text mt={4} fontSize="lg" textAlign="center">
          {result}
        </Text>
      </Box>
    </Center>
  );
});
