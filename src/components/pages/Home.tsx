import { Center, Text } from '@chakra-ui/react';
import { useState, useEffect, memo } from 'react';

export const Home = memo(() => {
  const text = 'Welcome to ユーザー管理アプリ';
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayedText(text.substring(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      } else {
        // 全文字表示後、タイマーを停止
        clearInterval(timer);
      }
    }, 100);

    return () => clearInterval(timer);
  }, [currentIndex]);

  return (
    <Center h="100vh">
      <Text fontSize="3em">{displayedText}</Text>
    </Center>
  );
});
