import { SideBar } from "@/components/SideBar";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  if (!session) return redirect("/");
  const nameAsso: string = session.user.nameAsso;

  return (
    <div className="flex ">
      <div>
        <SideBar nameAsso={nameAsso} />
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
}
