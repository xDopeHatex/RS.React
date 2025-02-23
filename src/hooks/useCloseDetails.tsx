import { useNavigate, useSearchParams } from 'react-router-dom';

const useCloseDetails = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  return () => {
    const url = new URLSearchParams(searchParams.toString());
    url.delete('id');
    navigate(`/home/?${url}`);
  };
};

export default useCloseDetails;
