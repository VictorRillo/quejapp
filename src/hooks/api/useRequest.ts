import { default as axios } from 'axios';
import { useApiConfig } from "./useApiConfig";
import { QueryObserverOptions, useQuery } from "@tanstack/react-query";
import { HttpMethod } from "enums/HttpMethod";
import { HttpEndpoints } from "enums/HttpEndpoints";


export const useRequest = (
  endpoint: HttpEndpoints,
  method: HttpMethod,
  body = undefined,
  options: QueryObserverOptions = {
    queryKey: []
  }
) => {
  const { baseUrl, headers } = useApiConfig();

  const fetchRequest = async () => {
    const config = {
      method,
      url: `${baseUrl}${endpoint}`,
      headers,
      data: body
    };

    try {
      const response = await axios(config);
      return response.data;
    } catch (error) {
      // Handle error (e.g., show a toast message or log it)
      throw error;
    }
  };

  return useQuery({
    queryFn: fetchRequest,
    ...options,
    queryKey: [method, endpoint]
  });
};
