import { baseUrl } from "@/constants/constants";
import { getAccessToken } from "@/utils/auth";
import api from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";

export default function useGetRecords() {
  const accessToken = getAccessToken();

  return useQuery({
    queryKey: ["record"],
    // 1. The actual API call
    queryFn: async () => {
      const response = await api.get(
        `${baseUrl}/records`,

        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response.data;
    },
  });
}
