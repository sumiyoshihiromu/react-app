import {
  Box,
  Heading,
  HStack,
  Image,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react';
import { memo } from 'react';
import { WeatherData } from '../../../../types/api/weather';

type Props = {
  weatherData: Array<WeatherData>;
};

export const TodayWeatherCard = memo((props: Props) => {
  const { weatherData } = props;
  return (
    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
      {weatherData &&
        weatherData.map((data, index) => (
          <Box
            key={index}
            p={4}
            borderWidth="2px"
            borderRadius="md"
            borderColor="teal"
            boxShadow="sm"
          >
            <Heading as="h2" size="md" mb={2}>
              {data.location.city}
            </Heading>
            <VStack align="start">
              <Text fontSize="sm" color="gray.500">
                {data.forecasts[0].date}
              </Text>
              <Image
                src={data.forecasts[0].image.url}
                alt={data.forecasts[0].image.title}
                boxSize="50px"
                objectFit="contain"
              />
              <HStack>
                <Text>最高気温:</Text>
                <Text fontWeight="bold">
                  {data.forecasts[0].temperature.max?.celsius
                    ? `$
                  {data.forecasts[0].temperature.max?.celsius}℃`
                    : '取得できませんでした'}
                </Text>
              </HStack>
              <HStack>
                <Text>天気:</Text>
                <Text fontWeight="bold">
                  {data.forecasts[0].detail?.weather}
                </Text>
              </HStack>
            </VStack>
          </Box>
        ))}
    </SimpleGrid>
  );
});
