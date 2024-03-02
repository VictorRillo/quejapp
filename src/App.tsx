import { QueryClient, QueryClientProvider } from "react-query";
import React from "react";

const queryClient = new QueryClient();

export default function App() {
  return <QueryClientProvider client={queryClient}>asdsa</QueryClientProvider>;
}
