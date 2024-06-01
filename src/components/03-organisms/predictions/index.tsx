import Loader from "@/components/01-atoms/Loader";
import HighlightBox from "@/components/02-molecules/highlightBox";

function Predictions({
  value,
  forecast,
}: {
  value?: string;
  forecast?: string;
}) {
  const mainValue = value?.split("\n");
  return (
    <HighlightBox title="Predictions">
      {!value ? (
        <Loader />
      ) : (
        <div className="flex flex-col gap-6 items-center justify-between h-full">
          <div>
            <div className="text-3xl font-bold text-center whitespace-pre-wrap">
              {mainValue?.[0]}
            </div>
            <div className="text-xl text-center whitespace-pre-wrap">
              {mainValue?.[1]}
            </div>
          </div>
          <div className="text-center text-lg">{forecast}</div>
        </div>
      )}
    </HighlightBox>
  );
}

export default Predictions;
