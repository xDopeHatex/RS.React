import { useSearchParams, useNavigate } from 'react-router';
import { useEffect, useRef } from 'react';
import Spinner from '../components/UI/Spinner.tsx';
import Button from '../components/UI/Button.tsx';
import { useGetAnimeByIdQuery } from '../services/apiSlices.ts';
import AnimeCardCheckbox from '../components/AnimeCardCheckbox.tsx';

const Details = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const sideBarRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useGetAnimeByIdQuery({
    id: Number(id),
  });

  const closeHandler = () => {
    const url = new URLSearchParams(searchParams.toString());
    url.delete('id');
    navigate(`/home/?${url}`);
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        sideBarRef.current &&
        !sideBarRef.current.contains(e.target as Node)
      ) {
        closeHandler();
      }
    };
    document.addEventListener('mousedown', handler);
    return () => {
      document.removeEventListener('mousedown', handler);
    };
  });

  return (
    <div data-testid="details" className="w-full h-full">
      {isError && error?.toString()}
      {isLoading && !isError && (
        <div className="grid place-content-center w-full">
          <Spinner />
        </div>
      )}
      {!isLoading && data && !isError && (
        <div ref={sideBarRef} className="h-[40rem] p-4 w-full relative">
          <AnimeCardCheckbox animeFullInfo={data?.data} position="bottom" />
          <img
            className="rounded-[10px] h-full object-cover absolute w-full"
            src={data?.data?.images?.jpg?.large_image_url}
            alt={`image of the ${data?.data?.title} anime`}
          />
          <div className="absolute rounded-t-[10px] z-10 w-full flex flex-col gap-4 bg-black">
            <p className="text-white">Title - {data?.data?.title}</p>
            <p className="text-white"> Score - {data?.data?.score}</p>
            <p className="text-white"> Status - {data?.data?.status}</p>
            <p className="text-white">
              {' '}
              Aired from {data?.data?.aired.prop.from.year}.
              {data?.data?.aired.prop.from.month}.
              {data?.data?.aired.prop.from.day} to{' '}
              {data?.data?.aired.prop.to.year}.{data?.data?.aired.prop.to.month}
              .{data?.data?.aired.prop.to.day}{' '}
            </p>
          </div>
          <Button
            title={'close'}
            onClick={closeHandler}
            styles="absolute bottom-0 right-0 "
          />
        </div>
      )}
    </div>
  );
};

export default Details;
