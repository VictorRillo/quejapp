import React from "react";
import { useGetAllComplaints } from "hooks/api/useGetAllComplaints";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function Content() {
  const {data} = useGetAllComplaints();
  console.log(data)
  return <div></div>
}

export default function App() {
  return <QueryClientProvider client={queryClient}>{<Content/>}</QueryClientProvider>;
}
