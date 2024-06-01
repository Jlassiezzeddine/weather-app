import Sun from "@/components/03-organisms/Sun";
import Humidity from "@/components/03-organisms/humidity";
import Overview from "@/components/03-organisms/overview";
import Predictions from "@/components/03-organisms/predictions";
import UvIndex from "@/components/03-organisms/uv-index";
import Visibility from "@/components/03-organisms/visibility";
import WindStatus from "@/components/03-organisms/wind-status";
import { WEATHER_BACKGROUND_MAP } from "@/config/images";
import { IData } from "./useOpenMeteo";
import Background from "@/components/02-molecules/background";

function useWidgetData(data?: IData) {
  return {
    background: <Background data={data} />,
    overview: (
      <Overview
        value={data?.["overview"]["value"]}
        description={data?.["overview"]["description"]}
        min={data?.["overview"]["min"]}
        max={data?.["overview"]["max"]}
      />
    ),
    "uv-index": (
      <UvIndex
        value={data?.["uv-index"]["value"]}
        description={data?.["uv-index"]["description"]}
      />
    ),
    "wind-status": (
      <WindStatus
        value={data?.["wind-status"]["value"]}
        unit={data?.["wind-status"]["unit"]}
      />
    ),
    "sunrise-&-sunset": (
      <Sun
        sunrise={data?.["sunrise-&-sunset"]["sunrise"]}
        sunset={data?.["sunrise-&-sunset"]["sunset"]}
      />
    ),
    predictions: (
      <Predictions
        value={data?.["predictions"]["24-h"]}
        forecast={data?.["predictions"]["forecast"]}
      />
    ),
    humidity: (
      <Humidity
        value={data?.["humidity"]["value"]}
        unit={data?.["humidity"]["unit"]}
        dew={data?.["humidity"]["dew-point"]}
      />
    ),
    visibility: (
      <Visibility
        value={data?.["visibility"]["value"]}
        unit={data?.["visibility"]["unit"]}
        clarity={data?.["visibility"]["clarity"]}
      />
    ),
  };
}

export default useWidgetData;
