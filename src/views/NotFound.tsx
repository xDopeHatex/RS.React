import { Link } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import useTheme from '../hooks/useTheme.tsx';

export default function NotFound() {
  const theme = useTheme();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-4xl font-bold text-red-500">404</h1>
      <p className="text-lg text-gray-600">Page Not Found</p>
      <Link
        to="/home"
        className={twMerge(
          'mt-4 px-4 py-2 rounded-lg',
          theme === 'dark' && 'text-black bg-blue-100',
          theme === 'light' && 'text-white bg-blue-500'
        )}
      >
        Go Home
      </Link>
    </div>
  );
}
