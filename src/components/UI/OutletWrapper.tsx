import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';

const OutletWrapper = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === '/') {
      navigate('/home');
    }
  }, []);

  return (
    <>
      <Outlet />
    </>
  );
};

export default OutletWrapper;
