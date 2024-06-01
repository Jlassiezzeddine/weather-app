import React from "react";
import Image from "next/image";
import { WEATHER_BACKGROUND_MAP } from "@/config/images";
import { IData } from "@/data/useOpenMeteo";

function Background({ data }: { data?: IData }) {
  return (
    <Image
      src={
        WEATHER_BACKGROUND_MAP[
          (data?.["overview"][
            "description"
          ] as keyof typeof WEATHER_BACKGROUND_MAP) ?? "backup"
        ]
      }
      alt="weather background"
      fill
      className="object-cover -z-50"
    />
  );
}

export default Background;
