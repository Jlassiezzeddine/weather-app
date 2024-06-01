import Loader from "@/components/01-atoms/Loader";
import HighlightBox from "@/components/02-molecules/highlightBox";
import { generateLabelFromSlug } from "@/utils/generateLabelFromSlug";

function Visibility({
  value,
  clarity,
  unit,
}: {
  value?: string;
  clarity?: string;
  unit?: string;
}) {
  return (
    <HighlightBox title="Visibility">
      {!value ? (
        <Loader />
      ) : (
        <div className="flex flex-col gap-6 justify-between h-full items-center">
          <div>
            <span className="text-6xl">{value}</span>
            <span> </span>
            <span className="text-4xl font-bold">{unit}</span>
          </div>
          <div className="text-lg">
            {clarity && generateLabelFromSlug(clarity)}
          </div>
        </div>
      )}
    </HighlightBox>
  );
}

export default Visibility;
