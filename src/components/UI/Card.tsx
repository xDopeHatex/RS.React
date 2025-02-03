import { ReactNode } from 'react';

const Card = ({
  title,
  imgLink,
  description,
}: {
  title: string;
  imgLink: string;
  description: string | ReactNode | ReactNode[];
}) => {
  return (
    <figure className="rounded-[10px] flex flex-col h-full shadow-md shadow-black/20 shadow-lg shadow-black/19">
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
  );
};

export default Card;
