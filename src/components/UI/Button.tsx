const Button = ({
  title,
  type,
  onClick,
}: {
  title: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
}) => {
  return (
    <button
      className="rounded-primary-border-radius bg-primary-color text-white px-5 py-2 transition-all duration-transition-duration hover:bg-secondary-color active:scale-110 cursor-pointer"
      type={type}
      onClick={onClick || undefined}
    >
      {title}
    </button>
  );
};

export default Button;
