import React from "react";
import { useGetAllComplaints } from "hooks/api/useGetAllComplaints";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import DataTable from "components/DataTable";
import { HeaderTableType } from "types/tableType";

const queryClient = new QueryClient();

function Content() {
  const { data } = useGetAllComplaints();

  console.log(data);

  const headers: HeaderTableType[] = [
    { title: "Title", key: "title" },
    { title: "Description", key: "description" },
    { title: "Priority", key: "priority" },
    { title: "Status", key: "status" },
    { title: "Creation date", key: "createdAt" },
    { title: "Last update date", key: "updatedAt" },
  ];

  return data ? <DataTable headers={headers} data={data}/> : <></>;
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Content />
    </QueryClientProvider>
  );
}
