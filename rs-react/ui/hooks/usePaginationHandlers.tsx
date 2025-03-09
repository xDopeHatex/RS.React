import { useRouter } from "next/router";

const usePaginationHandlers = () => {
  const router = useRouter();
  const { query } = router;

  const changePageHandler = async (page: string) => {
    const updatedQuery = { ...query, page };
    await router.push(
      { pathname: router.pathname, query: updatedQuery },
      undefined,
      { shallow: true },
    );
  };

  const changePerPageHandler = async (perPage: string) => {
    const updatedQuery = { ...query, limit: perPage, page: "1" };
    await router.push(
      { pathname: router.pathname, query: updatedQuery },
      undefined,
      { shallow: true },
    );
  };

  const prevPageHandler = async () => {
    const prevPage = (Number(query.page || "1") - 1).toString();
    if (Number(prevPage) >= 1) {
      await changePageHandler(prevPage);
    }
  };

  const nextPageHandler = async () => {
    const nextPage = (Number(query.page || "1") + 1).toString();
    await changePageHandler(nextPage);
  };

  return {
    nextPageHandler,
    prevPageHandler,
    changePerPageHandler,
    changePageHandler,
  };
};

export default usePaginationHandlers;
