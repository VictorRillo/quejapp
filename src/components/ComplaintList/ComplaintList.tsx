import DataTable from "components/DataTable/DataTable";
import { useGetAllComplaints } from "hooks/api/useGetAllComplaints";
import React from "react";
import { HeaderTableType } from "types/tableType";

export default function ComplaintList() {
    const { data } = useGetAllComplaints();
  
    const headers: HeaderTableType[] = [
      { title: "title", key: "title", width: '20%' },
      { title: "description", key: "description", width: '40%' },
      { title: "priority", key: "priority", width: '10%' },
      { title: "status", key: "status", width: '10%' },
      { title: "creation_date", key: "createdAt", width: '10%' },
      { title: "last_update_date", key: "updatedAt", width: '10%' },
    ];
  
    return data ? <DataTable headers={headers} data={data} /> : <></>;
  }
  