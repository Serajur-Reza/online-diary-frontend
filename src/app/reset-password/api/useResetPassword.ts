import { baseUrl } from "@/constants/constants";

import api from "@/utils/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function useResetPassword() {
  const queryClient = useQueryClient();

  return useMutation({
    // 1. The actual API call
    mutationFn: async ({ data }) => {
      try {
        const res = await api.patch(`${baseUrl}/auth/change-password`, data);

        toast?.success("Password Changed Successfully");
      } catch (error) {
        console.log(error);
        if (error?.response?.status === 400) {
          toast?.error(
            error?.response?.data?.message || "something went wrong"
          );
        } else if (error?.response?.status === 401) {
          toast?.error(
            error?.response?.data?.message || "something went wrong"
          );
        } else {
          toast?.error(error?.message || "something went wrong");
        }
      }
    },

    // 2. What to do when it works
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
    },
  });
}
