import { Icon } from "@/components/01-atoms/Icon";
import { geo } from "@/data/geo";
import useGetCurrentLocation from "@/utils/useGetCurrentLocation";
import useQueryParams from "@/utils/useQueryParams";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDebounceValue, useOnClickOutside } from "usehooks-ts";

function Search() {
  const [value, setValue] = useState("");
  const [debounced, setDebounced] = useDebounceValue("", 500);
  const { queryParams, setQueryParams } = useQueryParams<{
    latitude: number;
    longitude: number;
  }>();

  const suggestions = useMemo(
    () =>
      value
        ? geo.features
            .filter(
              (city) =>
                city.properties.name
                  .toLocaleLowerCase()
                  .startsWith(value.toLowerCase()) ||
                city.properties.adm0name
                  .toLocaleLowerCase()
                  .startsWith(value.toLowerCase())
            )
            .slice(0, 5)
        : geo.features.slice(0, 5),
    [value]
  );
  function handleSelect({
    longitude,
    latitude,
    city,
  }: {
    longitude: number;
    latitude: number;
    city: string;
  }) {
    setQueryParams({ latitude, longitude });
    setValue(city);
    setDebounced("");
  }
  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.currentTarget.value);
    setDebounced(e.currentTarget.value);
  }

  const ref = useRef<HTMLDivElement>(null);

  const handleClickOutside = () => {
    setDebounced("");
  };
  const { userLocation, getUserLocation } = useGetCurrentLocation();
  useOnClickOutside(ref, handleClickOutside);

  useEffect(() => {
    if (!queryParams.latitude || !queryParams.longitude) getUserLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (userLocation) {
      const { latitude, longitude } = userLocation;
      setValue("Current location");
      setQueryParams({
        latitude,
        longitude,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userLocation]);
  return (
    <div className=" flex items-center justify-center text-inherit w-full p-2 z-50">
      <div ref={ref} className="relative z-50  ">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 h-full aspect-square rounded-full flex justify-center items-center">
          <Icon icon="search" />
        </div>
        <div
          onClick={() => {
            getUserLocation();
          }}
          className=" cursor-pointer bg-zinc-50 bg-opacity-25 hover:bg-opacity-10 absolute top-1/2 right-0 -translate-y-1/2 h-full aspect-square rounded-r-full hover:rounded-full transition-all duration-300 flex justify-center items-center"
        >
          <Icon icon="locate-fixed" />
        </div>
        <input
          value={value}
          onChange={handleSearch}
          type="text"
          placeholder="Search ..."
          name=""
          id=""
          className="min-h-11  placeholder:text-zinc-700 rounded-full text-inherit px-16  bg-transparent border border-zinc-50 focus-within:outline-zinc-50"
        />

        {debounced && suggestions.length > 0 ? (
          <div
            className={
              "absolute w-full top-[120%] shadow-lg left-0 overflow-clip backdrop-blur-sm rounded-3xl z-50 border border-zinc-50"
            }
          >
            {suggestions.map((e) => (
              <div
                key={e.properties.geonameid}
                className="select-none cursor-pointer p-3 hover:bg-zinc-50 hover:bg-opacity-25"
                onClick={() =>
                  handleSelect({
                    longitude: e.properties.longitude,
                    latitude: e.properties.latitude,
                    city: `${e.properties.name}, ${e.properties.adm0name}`,
                  })
                }
              >
                {`${e.properties.name}, ${e.properties.adm0name}`}
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Search;
