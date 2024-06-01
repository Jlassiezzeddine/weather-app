import Loader from "@/components/01-atoms/Loader";
import HighlightBox from "@/components/02-molecules/highlightBox";

function WindStatus({ value, unit }: { value?: string; unit?: string }) {
  return (
    <HighlightBox title="Wind status">
      {!value ? (
        <Loader />
      ) : (
        <div className="flex flex-col gap-6 items-center justify-center h-full">
          <div className="text-center">
            <span className="text-6xl">{value}</span>
            <span> </span>
            <span className="text-4xl font-bold">{unit}</span>
          </div>
          <div>{}</div>
        </div>
      )}
    </HighlightBox>
  );
}

export default WindStatus;
