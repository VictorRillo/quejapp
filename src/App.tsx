import React from "react";
import { useGetAllComplaints } from "hooks/api/useGetAllComplaints";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import DataTable from "components/DataTable/DataTable";
import { HeaderTableType } from "types/tableType";
import "assets/i18n/i18n";
import Header from "components/Header/Header";

const queryClient = new QueryClient();

function Content() {
  const { data } = useGetAllComplaints();

  const headers: HeaderTableType[] = [
    { title: "title", key: "title" },
    { title: "description", key: "description" },
    { title: "priority", key: "priority" },
    { title: "status", key: "status" },
    { title: "creation_date", key: "createdAt" },
    { title: "last_update_date", key: "updatedAt" },
  ];

  return data ? <DataTable headers={headers} data={data} /> : <></>;
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <Content />
    </QueryClientProvider>
  );
}
