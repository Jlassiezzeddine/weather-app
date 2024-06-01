import { ReactNode } from "react";

function HighlightBox({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="aspect-square max-h-72 min-h-48 w-full p-4 tablet-lg:basis-1/2 laptop:basis-1/3">
      <div className="p-4 flex gap-6 flex-col justify-between h-full w-full items-center backdrop-blur-sm border shadow-md rounded-[40px] border-zinc-50 -50 ">
        <h3 className="text-4xl text-center text-zinc-700">{title}</h3>
        <div className="w-full max-w-[75%] min-h-40 flex items-center pb-4 justify-center">
          {children}
        </div>
      </div>
    </div>
  );
}

export default HighlightBox;
