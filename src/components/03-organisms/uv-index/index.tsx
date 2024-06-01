import { generateLabelFromSlug } from "@/utils/generateLabelFromSlug";
import React from "react";
import Image from "next/image";
import HighlightBox from "@/components/02-molecules/highlightBox";
import Loader from "@/components/01-atoms/Loader";
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
            <div className="text-6xl ">{value}</div>
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
