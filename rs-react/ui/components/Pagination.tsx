import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
} from "@heroicons/react/24/solid";
import { useRouter } from "next/router";
import Button from "@/ui/components/UI/Button";
import Selector from "@/ui/components/UI/Selector";
import { ChangeEvent } from "react";
import PaginationElement from "@/ui/components/UI/PaginationElement";
import { PaginationProps } from "@/ui/views/Layout";
import usePaginationHandlers from "@/ui/hooks/usePaginationHandlers";

const Pagination = ({ pagination }: { pagination: PaginationProps }) => {
  const router = useRouter();
  const { query } = router; // Replaces useSearchParams()

  const {
    prevPageHandler,
    changePerPageHandler,
    nextPageHandler,
    changePageHandler,
  } = usePaginationHandlers();

  const perPageOptions = [
    { name: "4", value: "4" },
    { name: "6", value: "6" },
  ];

  const currentPage = Array.isArray(query.page)
    ? Number(query.page[0])
    : Number(query.page);

  return (
    <>
      <ul
        className="flex flex-wrap items-center justify-end gap-6"
        data-testid="pagination"
      >
        <Selector
          currentValue={(query.limit as string) || ""}
          options={perPageOptions}
          selectName={"Items Per Page"}
          onChange={async (event: ChangeEvent<HTMLSelectElement>) =>
            await changePerPageHandler(event.target.value)
          }
        />
        <li>
          <Button
            testId="prevButton"
            isDisabled={pagination.isFirstPage}
            icon={<ArrowLongLeftIcon />}
            onClick={prevPageHandler}
            styles={"p-2 h-12 w-12"}
          />
        </li>
        {Number(pagination.lastPage) <= 5 && (
          <>
            {new Array(Number(pagination.lastPage)).fill(0).map((_, i) => {
              const pageNumber = i + 1;
              return (
                <PaginationElement
                  key={pageNumber}
                  isActive={Number(query.page) === pageNumber}
                  name={pageNumber.toString()}
                />
              );
            })}
          </>
        )}
        <>
          {Number(pagination.lastPage) > 5 && (
            <>
              <li>
                <Button
                  isActive={query.page == "1"}
                  title="1"
                  onClick={() => changePageHandler("1")}
                  styles={"p-2 h-12 w-12"}
                />
              </li>
              <PaginationElement
                isActive={query.page == "2"}
                name={Number(query.page) <= 3 ? "2" : null}
              />
              <PaginationElement
                isActive={
                  Number(query.page) >= 3 &&
                  Number(query.page) < Number(pagination.lastPage) - 1
                }
                name={
                  currentPage <= 3
                    ? "3"
                    : currentPage > Number(pagination.lastPage) - 2
                      ? (Number(pagination.lastPage) - 2).toString()
                      : currentPage.toString()
                }
              />
              <PaginationElement
                isActive={
                  Number(query.page) === Number(pagination.lastPage) - 1
                }
                name={
                  Number(query.page) + 2 < Number(pagination.lastPage)
                    ? null
                    : (Number(pagination.lastPage) - 1).toString()
                }
              />
              <li>
                <Button
                  isActive={pagination.lastPage == currentPage}
                  title={pagination.lastPage}
                  onClick={() =>
                    changePageHandler(pagination.lastPage?.toString() || "")
                  }
                  styles={"p-2 h-12 w-12"}
                />
              </li>
            </>
          )}
        </>
        <li>
          <Button
            testId="nextButton"
            isDisabled={pagination.isLastPage}
            icon={<ArrowLongRightIcon />}
            onClick={nextPageHandler}
            styles={"p-2 h-12 w-12"}
          />
        </li>
      </ul>
    </>
  );
};

export default Pagination;
