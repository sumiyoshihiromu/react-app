type Temperature = {
  celsius: string | null;
  fahrenheit: string | null;
};

type ChanceOfRain = {
  T00_06: string;
  T06_12: string;
  T12_18: string;
  T18_24: string;
};

type Image = {
  title: string;
  url: string;
  width: number;
  height: number;
};

type Forecast = {
  date: string;
  dateLabel: string;
  telop: string;
  detail?: {
    // detailは省略可能なプロパティ
    weather: string | null;
    wind: string | null;
    wave: string | null;
  };
  temperature: {
    min: Temperature | null;
    max: Temperature | null;
  };
  chanceOfRain: ChanceOfRain;
  image: Image;
};

type Location = {
  area: string;
  prefecture: string;
  city: string;
  district?: string; // districtは省略可能なプロパティ
};

type CopyrightProvider = {
  link: string;
  name: string;
  note: string;
};

type Copyright = {
  title: string;
  link: string;
  image: Image;
  provider: CopyrightProvider[];
};

export type WeatherData = {
  publicTime: string;
  publicTimeFormatted: string;
  publishingOffice: string;
  title: string;
  link: string;
  description: {
    publicTime: string;
    publicTimeFormatted: string;
    headlineText: string;
    bodyText: string;
    text: string;
  };
  forecasts: Forecast[];
  location: Location;
  copyright: Copyright;
};
