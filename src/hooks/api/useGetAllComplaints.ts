import { QueryObserverOptions } from "@tanstack/react-query";
import { useRequest } from "./useRequest";
import { HttpMethod } from "enums/HttpMethod";
import { HttpEndpoints } from "enums/HttpEndpoints";

export const useGetAllComplaints = () => {
  return useRequest(HttpEndpoints.COMPLAINTS, HttpMethod.GET, undefined, { staleTime: 1000 * 60 } as QueryObserverOptions);
};
