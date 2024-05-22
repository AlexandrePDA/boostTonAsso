import ButtonSignOut from "./ButtonSignOut";
import {
  CircleUser,
  UsersRound,
  CalendarCheck,
  Activity,
  Lightbulb,
  Star,
  Settings2,
} from "lucide-react";
import Link from "next/link";

interface PropsSideBar {
  nameAsso: string;
}

export const SideBar = ({ nameAsso }: PropsSideBar) => {
  return (
    <aside className="sticky top-0 flex flex-col w-64 h-screen px-5 py-8 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700">
      <h2 className="mx-2 mb-4">Nom du site</h2>
      <div className="flex flex-col justify-between flex-1 mt-6">
        <nav className="flex-1 -mx-3 space-y-3 ">
          {/* HOME */}
          <Link
            className="flex items-center px-3 py-2  transition-colors duration-300 transform rounded-lg focus:bg-gray-100  hover:bg-gray-100 hover:text-gray-700"
            href="/dashboard"
          >
            <div className="flex items-center gap-2">
              <Activity />
              <span className="mx-2 text-sm font-medium">L'association</span>
            </div>
          </Link>

          {/* Dashboard */}
          <Link
            className="flex items-center px-3 py-2  transition-colors duration-300 transform focus:bg-gray-100 rounded-lg  hover:bg-gray-100 dark:hover:bg-gray-800  hover:text-gray-700"
            href="/dashboard/evenements"
          >
            <div className="flex items-center gap-2">
              <CalendarCheck />
              <span className="mx-2 text-sm font-medium">Évenements</span>
            </div>
          </Link>

          {/* USERS */}
          <Link
            className="flex items-center px-3 py-2  transition-colors duration-300 transform rounded-lg focus:bg-gray-100  hover:bg-gray-100 hover:text-gray-700"
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
            className="flex items-center px-3 py-2  transition-colors duration-300 transform rounded-lg  hover:bg-gray-100  dark:hover:text-gray-200 hover:text-gray-700 focus:bg-gray-100"
            href="/dashboard/adherents"
          >
            <div className="flex items-center gap-2">
              <UsersRound />
              <span className="mx-2 text-sm font-medium">Adhérents</span>
            </div>
          </Link>

          {/* IDEES */}
          <Link
            className="flex items-center px-3 py-2  transition-colors duration-300 transform rounded-lg  hover:bg-gray-100  dark:hover:text-gray-200 hover:text-gray-700 focus:bg-gray-100"
            href="/dashboard/idees"
          >
            <div className="flex items-center gap-2">
              <Lightbulb />
              <span className="mx-2 text-sm font-medium">Idées</span>
            </div>
          </Link>

          {/* SETTINGS */}
          <Link
            className="flex items-center px-3 py-2  transition-colors duration-300 transform rounded-lg hover:bg-gray-100 hover:text-gray-700 focus:bg-gray-100"
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
            <div className="flex items-center gap-2">
              <CircleUser />
            </div>
            <span className="text-sm font-medium ">{nameAsso}</span>
            <ButtonSignOut />
          </div>
        </div>
      </div>
    </aside>
  );
};
