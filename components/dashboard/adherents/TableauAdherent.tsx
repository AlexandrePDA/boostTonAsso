"use client";
import { fetchAdherents } from "@/lib/fetchQuery";
import { useQuery, useQueryClient } from "react-query";
import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { Trash2, Search, BadgeCheck, BadgeX } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import DataEmpty from "@/components/DataEmpty";
import { Label } from "@/components/ui/label";

interface Adherent {
  id: string;
  name: string;
  emailAdherent: string;
  telephoneAdherent: string;
  benevolAdherent: boolean;
  createdAt: Date;
}

export const TableauAdherent = () => {
  const queryClient = useQueryClient();
  const { data, isLoading, isError, error } = useQuery(
    "adherents",
    fetchAdherents
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [checkedIds, setCheckedIds] = useState<Set<string>>(new Set());
  const [showOnlyVolunteers, setShowOnlyVolunteers] = useState(false);

  const handleCheckboxChange = (email: string) => {
    setCheckedIds((prev) => {
      // tous les emails cochés sont stockés ici
      const newChecked = new Set(prev);
      if (newChecked.has(email)) {
        newChecked.delete(email);
      } else {
        newChecked.add(email);
      }
      return newChecked;
    });
  };

  if (isLoading) return <div>Chargement...</div>;
  if (isError) return <div>Error</div>;

  const filteredData = data.filter((adherent: Adherent) => {
    const matchesSearchTerm =
      adherent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      adherent.emailAdherent.toLowerCase().includes(searchTerm.toLowerCase()) ||
      adherent.telephoneAdherent
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    return showOnlyVolunteers
      ? matchesSearchTerm && adherent.benevolAdherent
      : matchesSearchTerm;
  });

  if (data.length === 0) return <DataEmpty context="adherent" />;

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/deleteAdherent`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
      });
      if (response.ok) {
        toast.success("Adherent supprimé avec succès");
        queryClient.invalidateQueries("adherents");
      } else {
        throw new Error("Failed to delete the adherent");
      }
    } catch (error) {
      toast.error("Erreur lors de la suppression de l'adhérent ");
    }
  };

  return (
    <>
      <div className="flex items-center justify-between gap-2 my-8">
        <div className="inline-block text-sm py-2 px-4 bg-gray-100 rounded-lg mr-8">
          <p>
            {data.length} {data.length === 1 ? "adhérent" : "adhérents"}
          </p>
        </div>
        <div className="flex  items-center gap-2">
          <Search />
          <Input
            type="text"
            placeholder="Chercher par nom, email ou téléphone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className=" p-2 border rounded w-[400px] "
          />
          <div className="p-2 flex items-center gap-2">
            <Switch
              id="showOnlyVolunteers"
              checked={showOnlyVolunteers}
              onCheckedChange={setShowOnlyVolunteers}
            />
            <Label htmlFor="showOnlyVolunteers" className="text-gray-600">
              Afficher uniquement les bénévoles
            </Label>
            <BadgeCheck className="text-emerald-500 size-4" />
          </div>
        </div>
      </div>

      <Table>
        <TableHeader className="bg-gray-100 ">
          <TableRow>
            <TableHead className="w-[100px]">Selection</TableHead>
            <TableHead>Nom Prénom</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Téléphone</TableHead>
            <TableHead>Bénévole</TableHead>
            <TableHead>Depuis le</TableHead>
            <TableHead className="text-right">Suppression</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData.map((adherent: Adherent) => (
            <TableRow
              key={adherent.id}
              style={{
                backgroundColor: checkedIds.has(adherent.emailAdherent)
                  ? "#f0f0f0"
                  : "transparent",
              }}
            >
              <TableCell>
                <input
                  type="checkbox"
                  value={adherent.id}
                  checked={checkedIds.has(adherent.emailAdherent)}
                  onChange={() => handleCheckboxChange(adherent.emailAdherent)}
                />
              </TableCell>
              <TableCell className="font-medium">{adherent.name}</TableCell>
              <TableCell>
                {adherent.emailAdherent === "" ? "-" : adherent.emailAdherent}
              </TableCell>
              <TableCell>
                {adherent.telephoneAdherent === ""
                  ? "-"
                  : adherent.telephoneAdherent}
              </TableCell>
              <TableCell className="text-right ">
                {adherent.benevolAdherent ? (
                  <BadgeCheck className="text-emerald-500" />
                ) : (
                  <BadgeX className="text-red-500" />
                )}
              </TableCell>
              <TableCell>
                {new Date(adherent.createdAt).toLocaleDateString()}
              </TableCell>

              <TableCell className="text-right flex items-center justify-end">
                <Trash2
                  className="hover:text-red-400 text-gray-400 cursor-pointer"
                  onClick={() => handleDelete(adherent.id)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};
