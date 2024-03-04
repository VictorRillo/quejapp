import { HttpMethod } from "enums/HttpMethod";
import { HttpEndpoints } from "enums/HttpEndpoints";
import { ComplaintListType, ComplaintType } from "types/complaintType";
import { useRequest } from "./useRequest";

export const useGetAllComplaints = () => {
  return useRequest<ComplaintListType, ComplaintType[]>({
    endpoint: HttpEndpoints.COMPLAINTS,
    method: HttpMethod.GET,
    staleTime: 1000* 60,
    select: data => data.results.map(item => ({
      ...item,
      createdAt: new Date(item.createdAt).toLocaleDateString(),
      updatedAt: new Date(item.updatedAt).toLocaleDateString(),
    }))
  })
};
