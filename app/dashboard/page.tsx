import Calendar from "@/components/Calendar";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) return redirect("/");

  return (
    <div className="flex border m-4 rounded-xl  p-4">
      <Calendar />
    </div>
  );
}
