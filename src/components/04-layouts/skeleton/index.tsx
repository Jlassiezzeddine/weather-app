import React from "react";

function Skeleton() {
  return (
    <main
      className={"relative flex h-full min-h-screen w-full flex-col gap-8 p-2"}
    >
      <div>
        <div className=" flex items-center justify-center text-inherit w-full p-2 z-50">
          <div className="h-11 w-full bg-yellow-300"></div>
        </div>
      </div>
      <div className="isolate tablet:flex gap-4 ">
        <div className="flex flex-col gap-4 p-2 tablet:basis-4/5 tablet-lg:basis-2/5 laptop:basis-2/5 ">
          <h2 className="text-3xl laptop:text-5xl text-center">
            <span className="capitalize">{`${new Date(Date.now())
              .toLocaleString("fr-FR", {
                weekday: "long",
                hour: "numeric",
                minute: "numeric",
              })
              .replace(" ", ", ")}`}</span>
          </h2>
          <div className="flex h-full  justify-center rounded-[40px] shadow-md backdrop-blur-lg border border-zinc-50 p-4 pb-8 m-3"></div>
        </div>
        <div className="flex flex-col gap-4 w-full  p-1">
          <h2 className="tablet:ml-4 text-3xl laptop:text-5xl text-center tablet-lg:text-start">
            {"Todays's highlights"}
          </h2>
          <div className="flex flex-wrap overflow-y-auto tablet:max-h-[calc(100vh-200px)]">
            <div className="bg-red-500 aspect-square max-h-72 min-h-48 w-full p-4 tablet-lg:basis-1/2 laptop:basis-1/3"></div>
            <div className="bg-red-500 aspect-square max-h-72 min-h-48 w-full p-4 tablet-lg:basis-1/2 laptop:basis-1/3"></div>
            <div className="bg-red-500 aspect-square max-h-72 min-h-48 w-full p-4 tablet-lg:basis-1/2 laptop:basis-1/3"></div>
            <div className="bg-red-500 aspect-square max-h-72 min-h-48 w-full p-4 tablet-lg:basis-1/2 laptop:basis-1/3"></div>
            <div className="bg-red-500 aspect-square max-h-72 min-h-48 w-full p-4 tablet-lg:basis-1/2 laptop:basis-1/3"></div>
            <div className="bg-red-500 aspect-square max-h-72 min-h-48 w-full p-4 tablet-lg:basis-1/2 laptop:basis-1/3"></div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Skeleton;
