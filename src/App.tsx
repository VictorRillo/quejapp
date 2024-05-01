import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "assets/i18n/i18n";
import Header from "components/Header/Header";
import ComplaintList from "components/ComplaintList/ComplaintList";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});
const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <ComplaintList />
    </QueryClientProvider>
  );
}
