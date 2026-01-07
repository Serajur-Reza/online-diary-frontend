"use client";

import { baseUrl } from "@/constants/constants";
import { getAccessToken } from "@/utils/auth";
import api from "@/utils/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useUpdateRecord() {
  const queryClient = useQueryClient();
  const accessToken = getAccessToken();

  return useMutation({
    // 1. The actual API call
    mutationFn: async ({ id, data }) => {
      const response = await api.patch(
        `${baseUrl}/records/${id}`,
        data,

        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response.data;
    },

    // 2. What to do when it works
    onSuccess: (data) => {
      // This tells TanStack Query: "The 'record' list is now old data, go get the new version"
      queryClient.invalidateQueries({ queryKey: ["record"] });
      console.log("Update successful!", data);
    },

    onError: (error) => {
      console.error("Update failed:", error);
    },
  });
}
