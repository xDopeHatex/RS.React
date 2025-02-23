import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

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
