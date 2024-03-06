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
    return response.data; // You can adjust this based on your API response structure
  };

  return useMutation({
    mutationFn: createComplaint,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [HttpMethod.GET, HttpEndpoints.COMPLAINTS],
      }),
  });
};

export default usePostComplaint;
