import { ReactNode } from 'react';
import { Link, useSearchParams } from 'react-router';
import { AnimeItem } from '../../services/apiSlices.types.ts';
import AnimeCardCheckbox from '../AnimeCardCheckbox.tsx';

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
        <figcaption className="flex flex-col gap-2 bg-[#222] text-white italic text-sm sans-serif p-1 text-center rounded-b-[10px]">
          <p>{title}</p>
          <p className="flex justify-center gap-2">{description}</p>
        </figcaption>
      </figure>
    </Link>
  );
};

export default Card;
