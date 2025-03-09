import { FormEvent, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useGetAnimeListQuery } from "@/services/apiSlices";

const useFetchAnime = () => {
  const animeNameRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();
  const { query } = router;

  // Use state to store anime name (avoid direct localStorage access)
  const [animeName, setAnimeName] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Only run on the client side
      setAnimeName(
        (query.q as string) || localStorage.getItem("animeName") || "",
      );
    }
  }, [query.q]); // Update when query.q changes

  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 4;

  const { data, isLoading, isError, error } = useGetAnimeListQuery(
    { q: animeName, page, limit },
    { refetchOnMountOrArgChange: true },
  );

  useEffect(() => {
    if (router.isReady && typeof window !== "undefined") {
      if (animeNameRef.current !== null && animeNameRef.current.value === "") {
        animeNameRef.current.value = animeName;
      }

      if (!query.q && localStorage.getItem("animeName")) {
        router.push(
          {
            pathname: router.pathname,
            query: { q: animeName, limit: "4", page: "1" },
          },
          undefined,
          { shallow: true },
        );
      } else if (!query.q && !localStorage.getItem("animeName")) {
        router.push(
          {
            pathname: router.pathname,
            query: { q: "", limit: "4", page: "1" },
          },
          undefined,
          { shallow: true },
        );
      }
    }
  }, [router.isReady, animeName]);

  const getAnimeList = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const inputElement = form.elements[0] as HTMLInputElement;

    if (typeof window !== "undefined") {
      localStorage.setItem("animeName", inputElement.value);
    }

    setAnimeName(inputElement.value); // Update state to prevent server-side issues

    router.push(
      {
        pathname: router.pathname,
        query: { q: inputElement.value, limit: "4", page: "1" },
      },
      undefined,
      { shallow: true },
    );
  };

  return {
    animeNameRef,
    getAnimeList,
    animeList: data?.data,
    isLoading,
    isError,
    error,
    pagination: data
      ? {
          isFirstPage: data.pagination.current_page == 1,
          isLastPage: !data.pagination.has_next_page,
          lastPage: data.pagination.last_visible_page,
        }
      : null,
  };
};

export default useFetchAnime;
