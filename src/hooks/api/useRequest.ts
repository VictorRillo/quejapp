import { default as axios } from 'axios';
import { useApiConfig } from "./useApiConfig";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { HttpMethod } from "enums/HttpMethod";
import { HttpEndpoints } from "enums/HttpEndpoints";

type UseQueryWithDefaultOptions<
  TQueryFnData = unknown,
  TData = TQueryFnData
> = {
  method: HttpMethod,
  endpoint?: HttpEndpoints,
  body?: string,
  fullUrl?: string
} & Omit<
  Partial<UseQueryOptions<TQueryFnData, unknown, TData>>,
  'queryKey' | 'queryFn'
>;

export const useRequest = <TQueryFnData = unknown, TData = TQueryFnData>({
  endpoint,
  method,
  body,
  fullUrl,
  ...useQueryConfig}: UseQueryWithDefaultOptions<TQueryFnData, TData>
) => {
  const { baseUrl, headers } = useApiConfig();

  const fetchRequest = async (): Promise<TQueryFnData>  => {
    const config = {
      method,
      url: fullUrl ? fullUrl : `${baseUrl}${endpoint}`,
      headers,
      data: body
    };

    try {
      const response = await axios(config);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  return useQuery<TQueryFnData, unknown, TData>({
    queryFn: fetchRequest,
    queryKey: [method, endpoint],
    ...useQueryConfig
  });
};
