import { ReactNode } from 'react';
import { Link, useSearchParams } from 'react-router';
import { AnimeItem } from '../../services/apiSlices.types.ts';
import AnimeCardCheckbox from '../AnimeCardCheckbox.tsx';
import { useTheme } from '../../providers/ThemeProvider.tsx';
import { twMerge } from 'tailwind-merge';

const Card = ({
  title,
  imgLink,
  description,
  id,
  animeFullInfo,
}: {
  title: string;
  imgLink: string;
  description: string | ReactNode | ReactNode[];
  id: number;
  animeFullInfo: AnimeItem;
}) => {
  const theme = useTheme();
  const [searchParams] = useSearchParams();
  const url = new URLSearchParams(searchParams.toString());
  url.set('id', id.toString());

  return (
    <Link to={`/home/details/?${url}`}>
      <figure className="rounded-[10px] flex flex-col h-full  shadow-lg ">
        <img
          className="rounded-t-[10px] h-full object-cover relative"
          src={imgLink}
          alt={`image of the ${title} anime`}
        />
        <AnimeCardCheckbox animeFullInfo={animeFullInfo} position="top" />
        <figcaption
          className={twMerge(
            'flex flex-col gap-2  italic text-sm sans-serif p-1 text-center rounded-b-[10px]',
            theme === 'light' && 'bg-dark-gray-light-theme text-white ',
            theme === 'dark' && 'bg-dark-gray-dark-theme text-black '
          )}
        >
          <p>{title}</p>
          <p className="flex justify-center gap-2">{description}</p>
        </figcaption>
      </figure>
    </Link>
  );
};

export default Card;
