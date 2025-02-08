import { useSearchParams, useNavigate } from 'react-router';
import { useEffect, useRef, useState } from 'react';
import { getAnimeById } from '../services/api.ts';
import { AxiosError } from 'axios';
import Spinner from '../components/UI/Spinner.tsx';
import Button from '../components/UI/Button.tsx';

interface DetailsData {
  title: string;
  title_english: string;
  episodes: number;
  status: string;
  aired: {
    prop: {
      from: {
        day: number;
        month: number;
        year: number;
      };
      to: {
        day: number;
        month: number;
        year: number;
      };
    };
  };
  score: number;
  synopsis: string;
  images: { jpg: { large_image_url: string } };
}

const Details = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const sideBarRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const [detailsData, setDetailsData] = useState<DetailsData>();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (id) {
          const {
            data: { data },
          }: { data: { data: DetailsData } } = await getAnimeById(id);
          console.log('DATA!>>', data);
          setDetailsData(data);
        }
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          setErrorMessage(error.message);
        } else {
          setErrorMessage('An unknown error occurred');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const closeHandler = () => {
    const url = new URLSearchParams(searchParams.toString());
    url.delete('id');
    navigate(`/?${url}`);
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
    <>
      {errorMessage && errorMessage}
      {isLoading && !errorMessage && (
        <div className="grid place-content-center w-full">
          <Spinner />
        </div>
      )}
      {!isLoading && detailsData && !errorMessage && (
        <div ref={sideBarRef} className="h-[40rem] p-4 w-full relative">
          <img
            className="rounded-[10px] h-full object-cover absolute w-full"
            src={detailsData?.images?.jpg?.large_image_url}
            alt={`image of the ${detailsData.title} anime`}
          />
          <div className="absolute rounded-t-[10px] z-10 w-full flex flex-col gap-4 bg-black">
            <p className="text-white">Title - {detailsData.title}</p>
            <p className="text-white"> Score - {detailsData.score}</p>
            <p className="text-white"> Status - {detailsData.status}</p>
            <p className="text-white">
              {' '}
              Aired from {detailsData.aired.prop.from.year}.
              {detailsData.aired.prop.from.month}.
              {detailsData.aired.prop.from.day} to{' '}
              {detailsData.aired.prop.to.year}.{detailsData.aired.prop.to.month}
              .{detailsData.aired.prop.to.day}{' '}
            </p>
          </div>
          <Button
            title={'close'}
            onClick={closeHandler}
            styles="absolute bottom-0 right-0 "
          />
        </div>
      )}
    </>
  );
};

export default Details;
