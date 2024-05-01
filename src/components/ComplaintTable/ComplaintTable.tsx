import DataTable from "components/DataTable/DataTable";
import { CUSTOM_EVENT } from "enums/CustomEvent";
import { useGetAllComplaints } from "hooks/api/useGetAllComplaints";
import { useGetAuthorComplaints } from "hooks/api/useGetAuthorComplaints";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { ComplaintType } from "types/complaintType";
import { HeaderTableType } from "types/tableType";

export default function ComplaintTable({
  onRowClick,
}: {
  onRowClick?: (row: ComplaintType) => void;
}) {
  const { t } = useTranslation();
  const { data: complaints } = useGetAllComplaints();
  const { data: authorComplaints, refetch: getAuthorComplaints } =
    useGetAuthorComplaints();
  const [tableData, setTableData] = useState<ComplaintType[]>(complaints || []);
  const [authorDataLoaded, setAuthorDataLoaded] = useState(false);

  const headers: HeaderTableType[] = [
    { title: "title", key: "title", width: "20%" },
    { title: "description", key: "description", width: "40%" },
    { title: "priority", key: "priority", width: "10%" },
    { title: "status", key: "status", width: "10%" },
    { title: "creation_date", key: "createdAt", width: "10%", type: "date" },
    { title: "last_update_date", key: "updatedAt", width: "10%", type: "date" },
  ];

  useEffect(() => {
    if (complaints && !authorDataLoaded) {
      setTableData(complaints);
      setFilterButtonText(t("my_complaints"));
      setHandleFilterButtonClick(() => switchTableDataToAuthor);
      toast.success(t("complaints_success"));
    }
  }, [complaints, authorDataLoaded]);

  useEffect(() => {
    if (authorComplaints && authorDataLoaded) {
      setTableData(authorComplaints);
      setFilterButtonText(t("all_complaints"));
      setHandleFilterButtonClick(() => switchTableDataToAll);
      toast.success(t("complaints_success"));
    }
  }, [authorComplaints, authorDataLoaded]);

  const handleOnMouseOverRow = (row: any) => {
    const event = new CustomEvent(CUSTOM_EVENT.MOUSE_OVER_ROW, {
      detail: row.position,
    });
    window.dispatchEvent(event);
  };

  const switchTableDataToAuthor = () => {
    getAuthorComplaints();
    setAuthorDataLoaded(true);
  };

  const switchTableDataToAll = () => {
    setAuthorDataLoaded(false);
  };

  const [filterButtonText, setFilterButtonText] = useState(t("my_complaints"));
  const [handleFilterButtonClick, setHandleFilterButtonClick] = useState<any>(
    () => switchTableDataToAuthor,
  );

  return complaints ? (
    <DataTable
      headers={headers}
      data={tableData}
      onMouseOverRow={handleOnMouseOverRow}
      onRowClick={onRowClick}
      filterButtonText={filterButtonText}
      handleFilterButtonClick={handleFilterButtonClick}
    />
  ) : (
    <></>
  );
}
