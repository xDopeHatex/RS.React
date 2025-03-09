import { ReactNode, useState } from "react";
import { useRouter } from "next/router";
import SearchBar from "@/ui/components/SearchBar";
import Header from "@/ui/components/Header";
import Wrapper from "@/ui/components/UI/Wrapper";
import Card from "@/ui/components/UI/Card";
import Spinner from "@/ui/components/UI/Spinner";
import ErrorComponent from "@/ui/components/ErrorComponent";
import Button from "@/ui/components/UI/Button";
import Pagination from "@/ui/components/Pagination";
import { twMerge } from "tailwind-merge";
import useFetchAnime from "@/ui/hooks/useFetchAnime";
import Notification from "@/ui/components/Notification";
import useTheme from "@/ui/hooks/useTheme";

export interface PaginationProps {
  isFirstPage: boolean;
  isLastPage: boolean;
  lastPage: null | number;
}

const Layout = ({ children }: { children: ReactNode }) => {
  const [isShowErrorComponent, setIsShowErrorComponent] = useState(false);
  const router = useRouter();
  const { query } = router; // Replaces useSearchParams()
  const theme = useTheme();

  const {
    animeList,
    getAnimeList,
    pagination,
    isError,
    isLoading,
    error,
    animeNameRef,
  } = useFetchAnime();

  return (
    <div
      data-testid="layout"
      className={twMerge(
        "h-screen w-screen relative",
        theme === "dark" && "bg-black",
      )}
    >
      <Header />
      <SearchBar
        ref={animeNameRef}
        placeholder={"Type what kind of anime are you looking for?"}
        name={"search"}
        onSubmit={getAnimeList}
      />
      <Wrapper>
        <div className="flex justify-center">
          <div>
            {isError ? (
              <h2>{error?.toString()}</h2>
            ) : !isLoading && animeList?.length === 0 ? (
              <h2>Sorry, there is nothing to show. Try again</h2>
            ) : isLoading ? (
              <div className="grid place-content-center w-full">
                <Spinner />
              </div>
            ) : (
              <div
                className={twMerge(
                  "w-full grid gap-20 grid-cols-3 grid-rows-1",
                  query.limit === "6" ? "grid-cols-3" : "grid-cols-2", // Replaced searchParams.get("limit")
                )}
              >
                {animeList?.map((anime, index) => (
                  <div className="max-h-[250px]" key={index}>
                    <Card
                      animeFullInfo={anime}
                      id={anime.mal_id}
                      description={anime.genres.map(({ name }) => (
                        <span key={name}>{name}</span>
                      ))}
                      title={
                        anime.title_english ||
                        anime.title ||
                        anime.title_japanese
                      }
                      imgLink={anime.images.jpg.large_image_url}
                    />
                  </div>
                ))}
              </div>
            )}
            <div className="flex justify-between items-center pt-20">
              <Button
                testId="errorButton"
                title={"Error Boundary Test"}
                onClick={() => setIsShowErrorComponent(true)}
              />
              {isShowErrorComponent && <ErrorComponent />}
              {animeList?.length && pagination ? (
                <Pagination pagination={pagination} />
              ) : null}
            </div>
          </div>
          {children}
        </div>
      </Wrapper>
      <Notification />
    </div>
  );
};

export default Layout;
