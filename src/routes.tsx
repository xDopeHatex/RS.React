import { createBrowserRouter } from 'react-router-dom';
import Layout from './views/Layout';
import Details from './views/Details.tsx';
import NotFound from './views/NotFound';
import OutletWrapper from './components/UI/OutletWrapper.tsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <OutletWrapper />,
    children: [
      {
        path: 'home',
        element: <Layout />,
        children: [
          {
            path: 'details',
            element: <Details />,
          },
        ],
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);
