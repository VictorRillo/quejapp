import { HttpMethod } from "enums/HttpMethod";
import { HttpEndpoints } from "enums/HttpEndpoints";
import { ComplaintListType, ComplaintType } from "types/complaintType";
import { useRequest } from "./useRequest";
import { useTranslation } from "react-i18next";

export const useGetAllComplaints = () => {
  const { t } = useTranslation();

  return useRequest<ComplaintListType, ComplaintType[]>({
    endpoint: HttpEndpoints.COMPLAINTS,
    method: HttpMethod.GET,
    staleTime: 1000 * 60,
    select: (data) =>
      data.results.map((item) => ({
        ...item,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        status: t(item.status),
        priority: t(item.priority),
      })).sort((a, b) => { return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime() })
  });
};
