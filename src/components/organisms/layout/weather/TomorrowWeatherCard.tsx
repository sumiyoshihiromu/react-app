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

export const TomorrowWeatherCard = memo((props: Props) => {
  const { weatherData } = props;
  return (
    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
      {weatherData.map((data, index) => (
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
              {data.forecasts[1].date}
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
                {data.forecasts[1].temperature.max?.celsius}℃
              </Text>
            </HStack>
            <HStack>
              <Text>最低気温:</Text>
              <Text fontWeight="bold">
                {data.forecasts[1].temperature.min?.celsius}℃
              </Text>
            </HStack>
            <HStack>
              <Text>天気:</Text>
              <Text fontWeight="bold">{data.forecasts[1].telop}</Text>
            </HStack>
          </VStack>
        </Box>
      ))}
    </SimpleGrid>
  );
});
