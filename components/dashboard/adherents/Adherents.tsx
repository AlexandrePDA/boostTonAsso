import AdherentDialog from "./AdherentDialog";
import { TableauAdherent } from "./TableauAdherent";

export const Adherents = () => {
  return (
    <section className=" container p-4 mx-auto">
      <div className="flex flex-col justify-between gap-x-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-medium text-gray-800 dark:text-white">
              Adhérents
            </h2>

            <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">
              0 adhérents
            </span>
          </div>
          <AdherentDialog />
        </div>
        <TableauAdherent />
      </div>
    </section>
  );
};
