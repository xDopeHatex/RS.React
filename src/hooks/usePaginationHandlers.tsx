import { useLocation, useSearchParams } from 'react-router-dom';

const usePaginationHandlers = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const changePageHandler = async (page: string) => {
    const urlSearchParams = new URLSearchParams(location.search);
    urlSearchParams.set('page', page);
    setSearchParams(urlSearchParams);
  };

  const changePerPageHandler = async (perPage: string) => {
    const urlSearchParams = new URLSearchParams(location.search);
    urlSearchParams.set('limit', perPage);
    urlSearchParams.set('page', '1');
    setSearchParams(urlSearchParams);
  };

  const prevPageHandler = async () => {
    const prevPage = (Number(searchParams.get('page')) - 1).toString();
    await changePageHandler(prevPage);
  };

  const nextPageHandler = async () => {
    const nextPage = (Number(searchParams.get('page')) + 1).toString();
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
