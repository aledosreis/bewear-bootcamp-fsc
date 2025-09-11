import { useMutation, useQueryClient } from "@tanstack/react-query";

import { addAddress } from "@/actions/create-shipping-address";

import { getUserAddressesQueryKey } from "../queries/use-user-addresses";

export const createShippingAddressMutationKey = () =>
  ["create-shipping-address"] as const;

export const useCreateShippingAddress = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: createShippingAddressMutationKey(),
    mutationFn: addAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getUserAddressesQueryKey(),
      });
    },
  });
};
