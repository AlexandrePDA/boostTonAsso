import AdherentDialog from "./AdherentDialog";
import { TableauAdherent } from "./TableauAdherent";

export const Adherents = () => {
  return (
    <section className=" container p-4 mx-auto">
      <div className="flex flex-col justify-between gap-x-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
              Adhérents
            </h2>
          </div>
          <AdherentDialog />
        </div>
        <TableauAdherent />
      </div>
    </section>
  );
};
