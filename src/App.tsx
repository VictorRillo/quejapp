import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "assets/i18n/i18n";
import Header from "components/Header/Header";
import ComplaintList from "components/ComplaintList/ComplaintList";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <ComplaintList />
    </QueryClientProvider>
  );
}
