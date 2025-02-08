import { ReactNode } from 'react';
import { Link, useSearchParams } from 'react-router';

const Card = ({
  title,
  imgLink,
  description,
  id,
}: {
  title: string;
  imgLink: string;
  description: string | ReactNode | ReactNode[];
  id: number;
}) => {
  const [searchParams] = useSearchParams();
  const url = new URLSearchParams(searchParams.toString());
  url.set('id', id.toString());

  return (
    <Link to={`/details/?${url}`}>
      <figure className="rounded-[10px] flex flex-col h-full  shadow-lg ">
        <img
          className="rounded-t-[10px] h-full object-cover"
          src={imgLink}
          alt={`image of the ${title} anime`}
        />
        <figcaption className="flex flex-col gap-2 bg-[#222] text-white italic text-sm sans-serif p-1 text-center rounded-b-[10px]">
          <p>{title}</p>
          <p className="flex justify-center gap-2">{description}</p>
        </figcaption>
      </figure>
    </Link>
  );
};

export default Card;
