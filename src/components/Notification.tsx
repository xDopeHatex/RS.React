import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '../store/store.ts';
import Button from './UI/Button.tsx';
import { removeAllAnime } from '../store/slices/selectedAnimeSlice.ts';
import { AnimeItem } from '../services/apiSlices.types.ts';

const Notification = () => {
  const { selectedAnimeList } = useSelector(
    (state: ApplicationState) => state.selectedAnime
  );

  const dispatch = useDispatch();

  const handleUnselectAll = () => {
    dispatch(removeAllAnime());
  };

  const downloadCSV = (items: AnimeItem[]) => {
    const count = items.length;

    const fileName = `${count}_anime.csv`;

    const header = ['Name', 'Description'];
    const rows = items.map((item) => [item.title, item.synopsis]);

    let csvContent = header.join(',') + '\n';
    rows.forEach((row) => {
      csvContent += row.join(',') + '\n';
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      {Boolean(selectedAnimeList?.length) && (
        <div className="absolute bottom-0 px-10 py-5 rounded-primary-border-radius bg-secondary-color-lighter right-0 border-4 border-secondary-color-light flex items-center justify-center gap-5">
          <h4 className="text-xl">
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
