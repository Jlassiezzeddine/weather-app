"use client";
import Background from "@/components/02-molecules/background";
import Search from "@/components/02-molecules/search";
import Sun from "@/components/03-organisms/Sun";
import Humidity from "@/components/03-organisms/humidity";
import Overview from "@/components/03-organisms/overview";
import Predictions from "@/components/03-organisms/predictions";
import UvIndex from "@/components/03-organisms/uv-index";
import Visibility from "@/components/03-organisms/visibility";
import WindStatus from "@/components/03-organisms/wind-status";
import useOpenMeteo from "@/data/useOpenMeteo";
import { cn } from "@/utils/cn";

function MainTemplate() {
  const data = useOpenMeteo();
  const date = data?.time ? new Date(data?.time) : new Date();
  return (
    <main
      className={cn(
        "relative flex h-full min-h-screen w-full flex-col gap-8 p-2",
        {
          "text-zinc-950 ":
            data &&
            ["sunny", "mostly-sunny"].includes(data?.overview.description),
        },
        {
          "text-zinc-50 ":
            data && ["cloudy", "rainy"].includes(data?.overview.description),
        }
      )}
    >
      <div>
        <Background data={data} />
      </div>
      <div>
        <Search />
      </div>
      <div className="isolate tablet:flex gap-4 ">
        <div className="flex flex-col gap-4 p-2 tablet:basis-4/5 tablet-lg:basis-2/5 laptop:basis-2/5 ">
          <h2 className="text-3xl laptop:text-5xl text-center">
            <span className="capitalize">{`${date
              .toLocaleString("fr-FR", {
                weekday: "long",
                hour: "numeric",
                minute: "numeric",
              })
              .replace(" ", ", ")}`}</span>
          </h2>
          <Overview
            value={data?.["overview"]["value"]}
            description={data?.["overview"]["description"]}
            min={data?.["overview"]["min"]}
            max={data?.["overview"]["max"]}
          />
        </div>
        <div className="flex flex-col gap-4 w-full  p-1">
          <h2 className="tablet:ml-4 text-3xl laptop:text-5xl text-center tablet-lg:text-start">
            {"Todays's highlights"}
          </h2>
          <div className="flex flex-wrap overflow-y-auto tablet:max-h-[calc(100vh-200px)]">
            <UvIndex
              value={data?.["uv-index"]["value"]}
              description={data?.["uv-index"]["description"]}
            />
            <WindStatus
              value={data?.["wind-status"]["value"]}
              unit={data?.["wind-status"]["unit"]}
            />

            <Sun
              sunrise={data?.["sunrise-&-sunset"]["sunrise"]}
              sunset={data?.["sunrise-&-sunset"]["sunset"]}
            />

            <Predictions
              value={data?.["predictions"]["24-h"]}
              forecast={data?.["predictions"]["forecast"]}
            />

            <Humidity
              value={data?.["humidity"]["value"]}
              unit={data?.["humidity"]["unit"]}
              dew={data?.["humidity"]["dew-point"]}
            />

            <Visibility
              value={data?.["visibility"]["value"]}
              unit={data?.["visibility"]["unit"]}
              clarity={data?.["visibility"]["clarity"]}
            />
          </div>
        </div>
      </div>
    </main>
  );
}

export default MainTemplate;
