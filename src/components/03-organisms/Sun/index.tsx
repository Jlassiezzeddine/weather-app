import Loader from "@/components/01-atoms/Loader";
import HighlightBox from "@/components/02-molecules/highlightBox";
import Image from "next/image";

function Sun({ sunrise, sunset }: { sunrise?: Date; sunset?: Date }) {
  return (
    <HighlightBox title="Sunrise & sunset">
      {!sunrise ? (
        <Loader />
      ) : (
        <div className="flex justify-between w-full gap-8 items-center">
          <div className="text-2xl font-bold">
            <div className="relative h-full min-h-14">
              <Image
                src="/images/components/sunrise.png"
                alt="sunrise"
                fill
                className="object-contain"
              />
            </div>
            <div className="mt-2">
              {sunrise.toLocaleTimeString("fr-FR", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </div>
          <div className="text-2xl font-bold">
            <div className="relative h-full min-h-14">
              <Image
                src="/images/components/sunset.png"
                alt="sunset"
                fill
                className="object-contain"
              />
            </div>
            <div className="mt-2">
              {sunset?.toLocaleTimeString("fr-FR", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </div>
        </div>
      )}
    </HighlightBox>
  );
}

export default Sun;
