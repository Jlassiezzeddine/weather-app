import { Icon } from "@/components/01-atoms/Icon";
import Loader from "@/components/01-atoms/Loader";
import { WEATHER_TYPES_MAP } from "@/config/images";
import { generateLabelFromSlug } from "@/utils/generateLabelFromSlug";
import Image from "next/image";

function Overview({
  value,
  description,
  min,
  max,
}: {
  value?: string;
  description?: string;
  min?: string;
  max?: string;
}) {
  return (
    <div className="flex h-full justify-center rounded-[40px] shadow-md backdrop-blur-lg border border-zinc-50 p-4 pb-8 m-3">
      {value ? (
        <div className="flex flex-col gap-6 items-center">
          <div className="aspect-square relative w-3/5 ">
            <Image
              src={
                WEATHER_TYPES_MAP[description as keyof typeof WEATHER_TYPES_MAP]
              }
              alt="weather overview"
              fill
              className="object-contain"
            />
          </div>
          <div className="grid gap-8">
            <h3 className="text-8xl text-center">{value}</h3>
            <div className="text-4xl text-center">
              {description && generateLabelFromSlug(description)}
            </div>
            <div className="flex justify-between w-full">
              <div className="text-5xl flex items-center gap-4">
                <Icon icon="arrow-up" size="lg" /> {max}
              </div>
              <div className="text-5xl flex items-center gap-4">
                <Icon icon="arrow-down" size="lg" />
                {min}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex justify-center items-center ">
          <Loader />
        </div>
      )}
    </div>
  );
}

export default Overview;
