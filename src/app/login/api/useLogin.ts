import { baseUrl } from "@/constants/constants";

import api from "@/utils/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    // 1. The actual API call
    mutationFn: async ({ data }) => {
      try {
        const response = await api.post(`${baseUrl}/auth/login/`, data);

        toast?.success("Successfully Logged In");
        return response.data;
      } catch (error) {
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
