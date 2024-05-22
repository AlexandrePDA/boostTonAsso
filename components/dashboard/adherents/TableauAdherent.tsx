import { fetchAdherents } from "@/lib/fetchQuery";
import { useQuery } from "react-query";

interface Adherent {
  id: string;
  name: string;
  emailAdherent: string;
  telephoneAdherent: string;
  benevolAdherent: boolean;
}

export const TableauAdherent = () => {
  const { data, isLoading, isError, error } = useQuery(
    "adherents",
    fetchAdherents
  );

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  return (
    <div className="flex flex-col mt-6">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                  >
                    Nom Prénom
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                  >
                    Téléphone
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                  >
                    Bénévole
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                  >
                    Modifier
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                {data.map((adherent: Adherent) => (
                  <tr key={adherent.id}>
                    <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                      {adherent.name}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                      {adherent.emailAdherent}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                      {adherent.telephoneAdherent}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                      {adherent.benevolAdherent ? "Oui" : "Non"}
                    </td>
                    <td className="px-4 py-4 text-sm whitespace-nowrap">
                      <button className="text-gray-500 transition-colors duration-200 dark:hover:text-red-500 dark:text-gray-300 hover:text-red-500 focus:outline-none">
                        {/* Icone de modification ici */}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* TEST */}
    </div>
  );
};
