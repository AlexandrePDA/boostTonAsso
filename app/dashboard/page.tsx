"use client";
import Calendar from "@/components/Calendar";
import { QueryClient, QueryClientProvider } from "react-query";

export default function DashboardPage() {
  const queryClient = new QueryClient();

  return (
    <div className="flex flex-col p-2 m-4 xl:flex-row">
      {/* <div className="border p-2 m-4 rounded-xl"> */}
      <QueryClientProvider client={queryClient}>
        <Calendar />
        <div>Graphique</div>
      </QueryClientProvider>
    </div>
  );
}
