import axios from "axios";
import { useApiConfig } from "./useApiConfig";
import { ComplaintFormType } from "types/complaintType";
import { HttpEndpoints } from "enums/HttpEndpoints";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { HttpMethod } from "enums/HttpMethod";

const usePostComplaint = () => {
  const { baseUrl, headers } = useApiConfig();
  const queryClient = useQueryClient();

  const createComplaint = async (complaint: ComplaintFormType) => {
    const url = `${baseUrl}${HttpEndpoints.COMPLAINTS}`;

    const config = {
      method: "POST",
      url,
      headers,
      data: complaint,
    };

    const response = await axios(config);
    return response.data;
  };

  return useMutation({
    mutationFn: createComplaint,
    onSuccess: () =>
      queryClient.invalidateQueries({
        predicate: (query) => {
          const key = query.queryKey;
          return (
            Array.isArray(key) &&
            key[0] === HttpMethod.GET &&
            key[1].startsWith(HttpEndpoints.COMPLAINTS)
          );
        }
      })
  });
};

export default usePostComplaint;
