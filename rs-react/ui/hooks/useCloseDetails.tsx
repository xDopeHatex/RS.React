import { useRouter } from "next/router";

const useCloseDetails = () => {
  const router = useRouter();
  const { query } = router;

  return () => {
    const updatedQuery = { ...query };
    delete updatedQuery.id;

    router.push({ pathname: "/", query: updatedQuery }, undefined, {
      shallow: true,
    });
  };
};

export default useCloseDetails;
