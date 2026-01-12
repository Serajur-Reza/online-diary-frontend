import { baseUrl } from "@/constants/constants";
import { getAccessToken } from "@/utils/auth";
import api from "@/utils/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useCreateRecord() {
  const queryClient = useQueryClient();
  const accessToken = getAccessToken();

  return useMutation({
    // 1. The actual API call
    mutationFn: async ({ data }) => {
      const response = await api.post(`${baseUrl}/records/`, data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    },

    // 2. What to do when it works
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["record"] });
    },
  });
}
