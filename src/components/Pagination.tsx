import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
} from '@heroicons/react/24/solid';

import Button from './UI/Button';
import { useLocation, useSearchParams } from 'react-router-dom';
import Selector from './UI/Selector.tsx';
import { ChangeEvent } from 'react';
import PaginationElement from './UI/PaginationElement.tsx';
import { PaginationProps } from '../views/Layout.tsx';

const Pagination = ({ pagination }: { pagination: PaginationProps }) => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const perPageOptions = [
    { name: '4', value: '4' },
    { name: '6', value: '6' },
  ];

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

  return (
    <>
      <ul className="flex flex-wrap items-center justify-end gap-6">
        <Selector
          currentValue={searchParams.get('limit') || ''}
          options={perPageOptions}
          selectName={'Items Per Page'}
          onChange={async (event: ChangeEvent<HTMLSelectElement>) =>
            await changePerPageHandler(event.target.value)
          }
        />
        <li>
          <Button
            isDisabled={pagination.isFirstPage}
            icon={<ArrowLongLeftIcon />}
            onClick={prevPageHandler}
            styles={'p-2 h-12 w-12'}
          />
        </li>
        {Number(pagination.lastPage) <= 5 && (
          <>
            {new Array(Number(pagination.lastPage)).fill(0).map((_, i) => {
              const pageNumber = i + 1;
              return (
                <PaginationElement
                  key={pageNumber}
                  isActive={Number(searchParams.get('page')) === pageNumber}
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
                  isActive={searchParams.get('page') == '1'}
                  title="1"
                  onClick={() => changePageHandler('1')}
                  styles={'p-2 h-12 w-12'}
                />
              </li>
              <PaginationElement
                isActive={searchParams.get('page') == '2'}
                name={Number(searchParams.get('page')) <= 3 ? '2' : null}
              />
              <PaginationElement
                isActive={
                  Number(searchParams.get('page')) >= 3 &&
                  Number(searchParams.get('page')) <
                    Number(pagination.lastPage) - 1
                }
                name={
                  Number(searchParams.get('page')) <= 3
                    ? '3'
                    : Number(searchParams.get('page')) >
                        Number(pagination.lastPage) - 2
                      ? (Number(pagination.lastPage) - 2).toString()
                      : searchParams.get('page')
                }
              />
              <PaginationElement
                isActive={
                  Number(searchParams.get('page')) ==
                  Number(pagination.lastPage) - 1
                }
                name={
                  Number(searchParams.get('page')) + 2 <
                  Number(pagination.lastPage)
                    ? null
                    : (Number(pagination.lastPage) - 1).toString()
                }
              />
              <li>
                <Button
                  isActive={pagination.lastPage == searchParams.get('page')}
                  title={pagination.lastPage}
                  onClick={() =>
                    changePageHandler(pagination.lastPage?.toString() || '')
                  }
                  styles={'p-2 h-12 w-12'}
                />
              </li>
            </>
          )}
        </>
        <li>
          <Button
            isDisabled={pagination.isLastPage}
            icon={<ArrowLongRightIcon />}
            onClick={nextPageHandler}
            styles={'p-2 h-12 w-12'}
          />
        </li>
      </ul>
    </>
  );
};

export default Pagination;
