import { baseUrl } from "@/constants/constants";
import { getAccessToken } from "@/utils/auth";
import api from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export default function useGetRecords() {
  const accessToken = getAccessToken();

  return useQuery({
    queryKey: ["record"],
    // 1. The actual API call
    queryFn: async () => {
      try {
        const response = await api.get(
          `${baseUrl}/records`,

          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        return response.data;
      } catch (error) {
        toast?.error(error?.message || "Something went wrong");
      }
    },
  });
}
