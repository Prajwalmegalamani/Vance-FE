import { useMutation, UseMutationOptions } from "@tanstack/react-query";

export const useSmartMutation = (
  mutationFn: () => Promise<any>,
  options: UseMutationOptions
) => {
  const { data, error, isPending, isError, ...rest } = useMutation({
    ...options,
    mutationFn,

    retry: false,
  });

  return { data, error, isPending, isError, ...rest };
};
