import { useDispatch, useSelector } from "react-redux";
import { ApplicationState } from "@/store/store";
import Button from "@/ui/components/UI/Button";
import { removeAllAnime } from "@/store/slices/selectedAnimeSlice";
import { downloadCSV } from "@/ui/utils/utils";
import useTheme from "@/ui/hooks/useTheme";
import { twMerge } from "tailwind-merge";

const Notification = () => {
  const theme = useTheme();
  const { selectedAnimeList } = useSelector(
    (state: ApplicationState) => state.selectedAnime,
  );

  const dispatch = useDispatch();

  const handleUnselectAll = () => {
    dispatch(removeAllAnime());
  };

  return (
    <>
      {Boolean(selectedAnimeList?.length) && (
        <div
          className={twMerge(
            "absolute bottom-10 px-2 py-5 rounded-primary-border-radius  right-0 border-4  flex flex-col items-center justify-center gap-5",
            theme === "dark" &&
              "bg-secondary-color-lighter-dark-theme border-secondary-color-light-dark-theme",
            theme === "light" &&
              "bg-secondary-color-lighter-light-theme border-secondary-color-light-light-theme",
          )}
        >
          <h4
            className={twMerge(
              "text-xl",
              theme === "light" && "text-black",
              theme === "dark" && "text-white",
            )}
          >
            You have selected {selectedAnimeList?.length} anime
          </h4>
          <Button title="Unselect all" onClick={handleUnselectAll} />
          <Button
            title="Download"
            onClick={() => downloadCSV(selectedAnimeList)}
          />
        </div>
      )}
    </>
  );
};

export default Notification;
