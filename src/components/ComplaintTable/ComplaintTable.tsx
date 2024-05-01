import DataTable from "components/DataTable/DataTable";
import { CUSTOM_EVENT } from "enums/CustomEvent";
import { useGetAllComplaints } from "hooks/api/useGetAllComplaints";
import React from "react";
import { HeaderTableType } from "types/tableType";

export default function ComplaintTable() {
  const { data: complaints } = useGetAllComplaints();

  const headers: HeaderTableType[] = [
    { title: "title", key: "title", width: "20%" },
    { title: "description", key: "description", width: "40%" },
    { title: "priority", key: "priority", width: "10%" },
    { title: "status", key: "status", width: "10%" },
    { title: "creation_date", key: "createdAt", width: "10%", type: "date"},
    { title: "last_update_date", key: "updatedAt", width: "10%", type: "date"},
  ];

  const handleOnMouseOverRow = (row: any) => {
    const event = new CustomEvent(CUSTOM_EVENT.MOUSE_OVER_ROW, { detail: row.position });
    window.dispatchEvent(event);
  };

  return complaints ? (
    <DataTable
      headers={headers}
      data={complaints}
      onMouseOverRow={handleOnMouseOverRow}
    />
  ) : (
    <></>
  );
}
