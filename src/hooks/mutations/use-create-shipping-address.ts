import { useMutation } from "@tanstack/react-query";

import { addAddress } from "@/actions/create-shipping-address";

export const createShippingAddressMutationKey = () =>
  ["create-shipping-address"] as const;

export const useCreateShippingAddress = () => {
  return useMutation({
    mutationKey: createShippingAddressMutationKey(),
    mutationFn: addAddress,
  });
};
