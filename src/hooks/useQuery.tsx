import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export const useSmartQuery = (
  queryKey: string[],
  queryFn: () => Promise<any>,
  options: UseQueryOptions
) => {
  const { data, error, isPending, isError, ...rest } = useQuery({
    ...options,
    queryKey,
    queryFn,

    retry: false,
    staleTime: 0,
  });

  return { data, error, isPending, isError, ...rest };
};
