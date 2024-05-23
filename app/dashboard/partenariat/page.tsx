"use client";
import { QueryClient, QueryClientProvider } from "react-query";
import { Adherents } from "@/components/dashboard/adherents/Adherents";

const queryClient = new QueryClient();

export default function PartenariatPage() {
  return (
    <div className="border p-2 m-4 rounded-xl">
      <QueryClientProvider client={queryClient}>
        <p>Partenariat</p>
      </QueryClientProvider>
    </div>
  );
}
