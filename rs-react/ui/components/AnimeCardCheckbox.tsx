import Checkbox from "@/ui/components/UI/Checkbox";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationState } from "@/store/store";
import { addAnime, removeAnime } from "@/store/slices/selectedAnimeSlice";
import { AnimeItem } from "@/services/apiSlices.types";

const AnimeCardCheckbox = ({
  animeFullInfo,
  position,
}: {
  animeFullInfo: AnimeItem;
  position: "top" | "bottom";
}) => {
  const { selectedAnimeList } = useSelector(
    (state: ApplicationState) => state.selectedAnime,
  );

  const dispatch = useDispatch();

  const checked: boolean = selectedAnimeList.some(
    ({ mal_id }) => mal_id === animeFullInfo.mal_id,
  );

  const handleCheckboxChange = () => {
    if (checked) {
      dispatch(removeAnime(animeFullInfo));
    } else {
      dispatch(addAnime(animeFullInfo));
    }
  };

  return (
    <Checkbox
      position={position}
      checked={checked}
      onChange={handleCheckboxChange}
    />
  );
};

export default AnimeCardCheckbox;
