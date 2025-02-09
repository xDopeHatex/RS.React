const Spinner = () => {
  return (
    <svg
      data-testid="spinner"
      role="img" // Add this
      aria-hidden="true" // Optional: Ensures screen readers ignore it
      className="animate-spin"
      viewBox="0 0 100 100"
      width="100"
    >
      <circle
        className="stroke-gray-500 stroke-[4] fill-blue-300"
        cx="50"
        cy="50"
        r="45"
      />
      <rect
        className="fill-white fill-opacity-50 animate-pulse"
        height="50"
        width="50"
        x="25"
        y="25"
      />
      <polygon
        className="fill-green-300 animate-spin"
        points="63,57.5 50,65 37,57 37,42.5 50,35 63,42.5"
      />
    </svg>
  );
};

export default Spinner;
