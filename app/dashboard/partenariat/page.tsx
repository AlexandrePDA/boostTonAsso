"use client";
import { QueryClient, QueryClientProvider } from "react-query";
import { Partenariats } from "@/components/dashboard/partenariats/Partenariats";

const queryClient = new QueryClient();

export default function PartenariatPage() {
  return (
    <div className="border p-2 m-4 rounded-xl">
      <QueryClientProvider client={queryClient}>
        <Partenariats />
      </QueryClientProvider>
    </div>
  );
}
