import Loader from "@/components/01-atoms/Loader";
import HighlightBox from "@/components/02-molecules/highlightBox";

function Humidity({
  value,
  unit,
  dew,
}: {
  value?: string;
  unit?: string;
  dew?: string;
}) {
  return (
    <HighlightBox title="Humidity">
      {!value ? (
        <Loader />
      ) : (
        <div className="flex flex-col gap-6 justify-between h-full items-center">
          <div>
            <span className="text-6xl">{value}</span>
            <span> </span>
            <span className="text-4xl font-bold">{unit}</span>
          </div>
          <div className="text-lg text-center">{dew}</div>
        </div>
      )}
    </HighlightBox>
  );
}

export default Humidity;
