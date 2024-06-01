"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";

export default function useQueryParams<T>() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const urlSearchParams = new URLSearchParams(searchParams?.toString());
  function setQueryParams(params: Partial<T>) {
    Object.entries(params).forEach(([key, value]) => {
      if (!value) {
        urlSearchParams.delete(key);
      } else if (typeof value === "object") {
        urlSearchParams.set(key, btoa(JSON.stringify(value)));
      } else {
        urlSearchParams.set(key, String(value));
      }
    });

    const search = urlSearchParams.toString();
    const query = search ? `?${search}` : "";
    // replace since we don't want to build a history
    router.replace(`${pathname}${query}`);
  }

  function isJsonString(str: string) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  const queryParams = useMemo(() => {
    let obj: Record<string, any> = {};
    searchParams.forEach((val, key) => {
      try {
        const data = atob(val);
        if (isJsonString(data)) {
          const parsed = JSON.parse(data);
          obj[key] = parsed;
        } else {
          obj[key] = val;
        }
      } catch (e) {
        obj[key] = val;
        // something failed
        // if you want to be specific and only catch the error which means
        // the base 64 was invalid, then check for 'e.code === 5'.
        // (because 'DOMException.INVALID_CHARACTER_ERR === 5')
      }
    });
    return obj;
  }, [searchParams]);
  return { queryParams, setQueryParams };
}
