import { memo, useState, useEffect } from 'react';
import { Box, Heading, Spinner, Button } from '@chakra-ui/react';
import axios from 'axios';
import { useMessage } from '../../hooks/useMessage';
import { TodayWeatherCard } from '../organisms/layout/weather/TodayWeatherCard';
import { TomorrowWeatherCard } from '../organisms/layout/weather/TomorrowWeatherCard';
import { WeatherData } from '../../types/api/weather';

export const Weather = memo(() => {
  const [weatherData, setWeatherData] = useState<Array<WeatherData>>([]);
  const [loading, setLoading] = useState(true);
  const [showToday, setShowToday] = useState(true);
  const prefectures = [130010, 140010, 110010]; // 都道府県のIDを配列に格納
  const { showMessage } = useMessage();

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const promises = prefectures.map((prefecture) =>
          axios.get(
            `https://weather.tsukumijima.net/api/forecast/city/${prefecture}`
          )
        );
        const responses = await Promise.all(promises);
        setWeatherData(responses.map((response) => response.data));
      } catch (e) {
        showMessage({
          title: '天気情報が取得できませんでした。',
          status: 'error',
        });
        console.log(e);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [prefectures, showMessage]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" h="100vh">
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <Box p={4}>
      <Heading as="h1" size="lg" mb={4} textAlign="center">
        {showToday ? '今日の天気' : '明日の天気'}
      </Heading>

      <Box textAlign="center">
        <Button
          colorScheme="teal"
          onClick={() => setShowToday(!showToday)}
          mb={4}
        >
          {showToday ? '明日の天気を表示' : '今日の天気を表示'}
        </Button>
      </Box>

      {showToday && <TodayWeatherCard weatherData={weatherData} />}

      {!showToday && <TomorrowWeatherCard weatherData={weatherData} />}
    </Box>
  );
});
