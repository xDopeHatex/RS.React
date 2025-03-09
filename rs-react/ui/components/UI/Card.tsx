import { ReactNode } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { AnimeItem } from "@/services/apiSlices.types";
import AnimeCardCheckbox from "@/ui/components/AnimeCardCheckbox";
import useTheme from "@/ui/hooks/useTheme";
import { twMerge } from "tailwind-merge";

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
  const router = useRouter();
  const url = new URLSearchParams(router.query as Record<string, string>);
  url.set("id", id.toString());

  return (
    <Link href={`/home/details/?${url}`}>
      <figure className="rounded-[10px] flex flex-col h-full  shadow-lg ">
        <img
          className="rounded-t-[10px] h-full object-cover relative"
          src={imgLink}
          alt={`image of the ${title} anime`}
        />
        <AnimeCardCheckbox animeFullInfo={animeFullInfo} position="top" />
        <figcaption
          className={twMerge(
            "flex flex-col gap-2  italic text-sm sans-serif p-1 text-center rounded-b-[10px]",
            theme === "light" && "bg-dark-gray-light-theme text-white ",
            theme === "dark" && "bg-dark-gray-dark-theme text-black ",
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
