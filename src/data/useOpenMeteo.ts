import { WEATHER_TYPES_MAP } from "@/config/images";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export interface IData {
  overview: {
    value: string;
    description: keyof typeof WEATHER_TYPES_MAP;
    max: string;
    min: string;
  };
  "uv-index": {
    value: number;
    description: string;
  };
  "wind-status": {
    value: string;
    unit: string;
  };
  "sunrise-&-sunset": {
    sunrise: Date;
    sunset: Date;
  };

  predictions: {
    "24-h": string;
    forecast?: number;
  };
  humidity: {
    value: string;
    unit: string;
    "dew-point": string;
  };
  visibility: {
    value: string;
    unit: string;
    clarity: string;
  };
  time: string;
}

function useOpenMeteo(): IData | undefined {
  const searchParams = useSearchParams();
  const url = "https://api.open-meteo.com/v1/forecast";
  const params = useMemo(
    () => ({
      latitude: searchParams.get("latitude"),
      longitude: searchParams.get("longitude"),
    }),
    [searchParams]
  );

  const query = new URLSearchParams(
    Object({
      latitude: params.latitude,
      longitude: params.longitude,
      current:
        "temperature_2m,weather_code,wind_speed_10m,relative_humidity_2m,cloud_cover,rain",
      hourly: "dew_point_2m,visibility",
      daily:
        "temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_sum",
      timezone: "auto",
    })
  ).toString();

  const { data: weatherData } = useQuery({
    queryKey: ["GET_WEATHER", query],
    queryFn: () => axios.get(`${url}${query ? "?" + query : ""}`),
  });
  const [currentDew, setCurrentDew] = useState({ value: 0, unit: "" });
  const [currentVisibility, setCurrentVisibility] = useState({
    value: 0,
    unit: "",
  });
  const [cloudCover, setCloudCover] = useState({ value: 0, unit: "" });

  function getUvLevel(uvIndex: number) {
    switch (true) {
      case uvIndex < 2:
        return "low-level";
      case uvIndex < 5:
        return "medium-level";
      case uvIndex < 7:
        return "High-level";
      case uvIndex < 10:
        return "very-high-level";
      default:
        return "extremely-high-level";
    }
  }
  function getVisibilityLevel(visibility: number) {
    switch (true) {
      case visibility < 0.2:
        return "thick-fog";
      case visibility < 0.5:
        return "moderate-fog";
      case visibility < 1:
        return "light-fig";
      case visibility < 2:
        return "thin-fog-/-heavy-rain";
      case visibility < 6:
        return "haze-/-medium-rain";
      case visibility < 15:
        return "light-haze-/-light-rain";
      case visibility < 23:
        return "clear-/-drizzle";

      default:
        return "very-clear";
    }
  }
  function getCloudCoverDescription(
    rain: number,
    cloudCover: {
      value: number;
      unit: string;
    }
  ) {
    if (rain) {
      return "rainy";
    }
    switch (true) {
      case cloudCover.value < 25:
        return "sunny";
      case cloudCover.value < 50:
        return "mostly-sunny";

      default:
        return "cloudy";
    }
  }

  useEffect(() => {
    function getCurrentHourData() {
      const currentHour =
        weatherData?.data?.current?.time.split(":")[0] + ":00";
      const currentIndex =
        weatherData?.data?.hourly?.time?.indexOf(currentHour);
      return {
        currentDew: {
          value: weatherData?.data?.hourly?.dew_point_2m[currentIndex],
          unit: weatherData?.data?.hourly_units?.dew_point_2m,
        },
        currentVisibility: {
          value: weatherData?.data?.hourly?.visibility[currentIndex],
          unit: weatherData?.data?.hourly_units?.visibility,
        },
      };
    }
    const { currentDew, currentVisibility } = getCurrentHourData();
    setCurrentDew(currentDew);
    setCurrentVisibility(currentVisibility);
    setCloudCover({
      value: weatherData?.data.current.cloud_cover,
      unit: weatherData?.data.current_units.cloud_cover,
    });
  }, [weatherData?.data]);

  if (!weatherData?.data) return undefined;
  return {
    time: weatherData.data.current.time,
    overview: {
      value: `${weatherData.data.current.temperature_2m}°C`,
      description: getCloudCoverDescription(
        weatherData?.data.current.rain,
        cloudCover
      ),
      max: `${weatherData.data.daily.temperature_2m_max?.[0]}°`,
      min: `${weatherData.data.daily.temperature_2m_min?.[0]}°`,
    },
    "uv-index": {
      value: weatherData.data.daily.uv_index_max?.[0],
      description: getUvLevel(weatherData.data.daily.uv_index_max?.[0]),
    },
    "wind-status": {
      value: weatherData.data.current.wind_speed_10m,
      unit: weatherData.data.current_units.wind_speed_10m,
    },
    "sunrise-&-sunset": {
      sunrise: new Date(weatherData.data.daily.sunrise?.[0]),
      sunset: new Date(weatherData.data.daily.sunset?.[0]),
    },

    predictions: {
      "24-h": `${weatherData.data.daily.precipitation_sum?.[0]} mm \n in the last 24 h`,
      forecast: weatherData.data.daily.precipitation_sum.reduce(
        (accumulator: number, currentValue: number) =>
          accumulator + currentValue,
        0
      ),
    },
    humidity: {
      value: weatherData.data.current.relative_humidity_2m,
      unit: weatherData.data.current_units.relative_humidity_2m,
      "dew-point": `the dew point is ${currentDew.value} ${currentDew.unit}`,
    },
    visibility: {
      value: `${Math.floor(currentVisibility.value / 1000)}`,
      unit: `km`,
      clarity: getVisibilityLevel(Math.floor(currentVisibility.value / 1000)),
    },
  };
}

export default useOpenMeteo;
