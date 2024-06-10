"use client";
import ButtonSignOut from "./ButtonSignOut";
import {
  CircleUser,
  UsersRound,
  CalendarCheck,
  Activity,
  Lightbulb,
  Star,
  Settings2,
  HeartHandshake,
} from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface PropsSideBar {
  nameAsso: string;
}

export const SideBar = ({ nameAsso }: PropsSideBar) => {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 flex flex-col w-64 h-screen px-5 py-8 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700">
      <h2 className="mx-2 mb-4">Nom du site</h2>
      <div className="flex flex-col justify-between flex-1 mt-6">
        <nav className="flex-1 -mx-3 space-y-3 ">
          {/* HOME */}
          <Link
            className={`flex items-center px-3 py-2  transition-colors duration-300 transform rounded-lg focus:bg-gray-100  hover:bg-gray-100 hover:text-gray-700 ${
              pathname === "/dashboard" ? "bg-gray-100" : ""
            }`}
            href="/dashboard"
          >
            <div className="flex items-center gap-2">
              <Activity />
              <span className="mx-2 text-sm font-medium">Tableau de bord</span>
            </div>
          </Link>

          {/* Dashboard */}
          <Link
            className={`flex items-center px-3 py-2  transition-colors duration-300 transform rounded-lg focus:bg-gray-100  hover:bg-gray-100 hover:text-gray-700 ${
              pathname === "/dashboard/evenements" ? "bg-gray-100" : ""
            }`}
            href="/dashboard/evenements"
          >
            <div className="flex items-center gap-2">
              <CalendarCheck />
              <span className="mx-2 text-sm font-medium">Évenements</span>
            </div>
          </Link>

          {/* USERS */}
          <Link
            className={`flex items-center px-3 py-2  transition-colors duration-3000 transform rounded-lg focus:bg-gray-100  hover:bg-gray-100 hover:text-gray-700 ${
              pathname === "/dashboard/team" ? "bg-gray-100" : ""
            }`}
            href="/dashboard/team"
          >
            <div className="flex items-center gap-2">
              <Star />
              <span className="mx-2 text-sm font-medium">
                Équipe associative
              </span>
            </div>
          </Link>

          <Link
            className={`flex items-center px-3 py-2  transition-colors duration-300 transform rounded-lg focus:bg-gray-100  hover:bg-gray-100 hover:text-gray-700 ${
              pathname === "/dashboard/adherents" ? "bg-gray-100" : ""
            }`}
            href="/dashboard/adherents"
          >
            <div className="flex items-center gap-2">
              <UsersRound />
              <span className="mx-2 text-sm font-medium">Adhérents</span>
            </div>
          </Link>

          <Link
            className={`flex items-center px-3 py-2  transition-colors duration-300 transform rounded-lg focus:bg-gray-100  hover:bg-gray-100 hover:text-gray-700 ${
              pathname === "/dashboard/partenariat" ? "bg-gray-100" : ""
            }`}
            href="/dashboard/partenariat"
          >
            <div className="flex items-center gap-2">
              <HeartHandshake />
              <span className="mx-2 text-sm font-medium">Partenaires</span>
            </div>
          </Link>

          {/* IDEES */}
          <Link
            className={`flex items-center px-3 py-2  transition-colors duration-300 transform rounded-lg focus:bg-gray-100  hover:bg-gray-100 hover:text-gray-700 ${
              pathname === "/dashboard/idees" ? "bg-gray-100" : ""
            }`}
            href="/dashboard/idees"
          >
            <div className="flex items-center gap-2">
              <Lightbulb />
              <span className="mx-2 text-sm font-medium">Idées</span>
            </div>
          </Link>

          {/* SETTINGS */}
          <Link
            className={`flex items-center px-3 py-2  transition-colors duration-300 transform rounded-lg focus:bg-gray-100  hover:bg-gray-100 hover:text-gray-700 ${
              pathname === "/dashboard/parametres" ? "bg-gray-100" : ""
            }`}
            href="/dashboard/parametres"
          >
            <div className="flex items-center gap-2">
              <Settings2 />
              <span className="mx-2 text-sm font-medium">Paramètres</span>
            </div>
          </Link>
        </nav>

        <div className="mt-6">
          <div className="flex items-center justify-between mt-6">
            <div className="flex gap-2 items-center">
              <div className="flex items-center gap-2">
                <CircleUser />
              </div>
              <span className="text-sm font-medium">{nameAsso}</span>
            </div>
            <ButtonSignOut />
          </div>
        </div>
      </div>
    </aside>
  );
};
