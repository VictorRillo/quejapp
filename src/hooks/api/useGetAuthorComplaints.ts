import { HttpMethod } from "enums/HttpMethod";
import { HttpEndpoints } from "enums/HttpEndpoints";
import { ComplaintListType, ComplaintType } from "types/complaintType";
import { useRequest } from "./useRequest";
import { useTranslation } from "react-i18next";

export const useGetAuthorComplaints = () => {
  const { t } = useTranslation();

  const authorObject = JSON.stringify({
    author: {
      __type: "Pointer",
      className: "_User",
      objectId: sessionStorage.getItem("user"),
    },
  });
  const endpoint = `${HttpEndpoints.COMPLAINTS}?where=${encodeURIComponent(authorObject)}`;

  return useRequest<ComplaintListType, ComplaintType[]>({
    endpoint: endpoint,
    method: HttpMethod.GET,
    staleTime: 1000 * 60,
    select: (data) =>
      data.results
        .map((item) => ({
          ...item,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
          status: t(item.status),
          priority: t(item.priority),
        }))
        .sort((a, b) => {
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        }),
  });
};
