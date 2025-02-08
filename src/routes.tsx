import { createBrowserRouter } from 'react-router-dom';
import Layout from './views/Layout';
import Details from './views/Details.tsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: 'details',
        element: <Details />,
      },
    ],
  },
]);
