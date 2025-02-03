export default function Spinner() {
  return (
    <svg viewBox="0 0 100 100" width="100" className="animate-spin">
      <circle
        cx="50"
        cy="50"
        r="45"
        className="stroke-gray-500 stroke-[4] fill-blue-300"
      />
      <rect
        x="25"
        y="25"
        width="50"
        height="50"
        className="fill-white fill-opacity-50 animate-pulse"
      />
      <polygon
        points="63,57.5 50,65 37,57 37,42.5 50,35 63,42.5"
        className="fill-green-300 animate-spin"
      />
    </svg>
  );
}
