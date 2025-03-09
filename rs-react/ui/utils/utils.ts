import { AnimeItem } from "@/services/apiSlices.types";

export const downloadCSV = (items: AnimeItem[]) => {
  const count = items.length;

  const fileName = `${count}_anime.csv`;

  const header = ["Name", "Description"];
  const rows = items.map((item) => [item.title, item.synopsis]);

  let csvContent = header.join(",") + "\n";
  rows.forEach((row) => {
    csvContent += row.join(",") + "\n";
  });

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
