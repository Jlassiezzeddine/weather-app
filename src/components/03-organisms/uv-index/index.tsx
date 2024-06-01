import { generateLabelFromSlug } from "@/utils/generateLabelFromSlug";
import React from "react";
import Image from "next/image";
import HighlightBox from "@/components/02-molecules/highlightBox";
import Loader from "@/components/01-atoms/Loader";
import Progress from "@/components/02-molecules/progress";
function UvIndex({
  value,
  description,
}: {
  value?: number;
  description?: string;
}) {
  return (
    <HighlightBox title="Uv index">
      {!value ? (
        <Loader />
      ) : (
        <div className="flex flex-col items-center gap-6 justify-center h-full">
          <div className="relative">
            <Progress value={value} />
            <div className="text-5xl absolute bottom-0 left-1/2 -translate-x-1/2 ">
              {value}
            </div>
          </div>
          <div className="text-lg text-center">
            {description && generateLabelFromSlug(description)}
          </div>
        </div>
      )}
    </HighlightBox>
  );
}

export default UvIndex;
