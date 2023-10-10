import useSWR from "swr";
import fetcher from "@/libs/fetcher";

const useFavorites = () => {
  const { data, error, isLoading, mutate } = useSWR("/api/favorite", fetcher, {
    revalidateIfStale: false,
    revalidateOnReconnect: false,
    revalidateOnFocus: false,
  });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};
export default useFavorites;
