import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const NameAsso = async () => {
  const session = await getServerSession(authOptions);
  if (!session) return redirect("/");

  return <span className="text-sm font-medium ">{session.user.nameAsso}</span>;
};
