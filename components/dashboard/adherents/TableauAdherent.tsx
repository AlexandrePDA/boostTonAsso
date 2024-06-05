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
import { useEffect, useState } from "react";
import {
  Trash2,
  Search,
  BadgeCheck,
  BadgeX,
  Mail,
  RotateCw,
} from "lucide-react";
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

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "c" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        const emailsToCopy = Array.from(checkedIds).join(", ");
        navigator.clipboard
          .writeText(emailsToCopy)
          .then(() => toast.success("Emails copiés avec succès!"))
          .catch((err) => toast.error("Erreur lors de la copie des emails"));
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [checkedIds]);

  const handleCheckboxChange = (email: string) => {
    if (email !== "") {
      setCheckedIds((prev) => {
        const newChecked = new Set(prev);
        if (newChecked.has(email)) {
          newChecked.delete(email);
        } else {
          newChecked.add(email);
        }
        newChecked.delete("");
        return newChecked;
      });
    } else {
      toast.error("Cet adhérent n'a pas d'email");
    }
  };

  const handleAllCheckboxes = (checked: boolean) => {
    if (checked && data) {
      const allEmails = new Set<string>(
        data.map((adherent: Adherent) => adherent.emailAdherent)
      );
      allEmails.delete("");
      setCheckedIds(allEmails);
    } else {
      setCheckedIds(new Set<string>());
    }
  };

  if (isLoading)
    return (
      <div className="flex h-screen items-center justify-center">
        <RotateCw className="size-8 animate-spin text-gray-500" />
      </div>
    );
  if (isError) return <div>Erreur lors du chargement des adhérents</div>;

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

      <div className="flex items-center gap-2 border bg-slate-50  rounded-lg p-2 mb-4  cursor-pointer">
        <Mail className="w-4 h-4 text-gray-500 " />
        {checkedIds.size > 0 ? (
          <>
            <p className="text-sm text-gray-500">
              {Array.from(checkedIds).join(", ")}
            </p>
            <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 ">
              <span className="text-lg">⌘</span>C
            </kbd>
          </>
        ) : (
          <p className="text-sm text-gray-500">
            Selectionner un ou plusieurs adhérents pour copier leurs emails
          </p>
        )}
      </div>

      <Table>
        <TableHeader className="bg-gray-100 ">
          <TableRow>
            <TableHead className="w-[100px]">
              <input
                type="checkbox"
                onChange={(e) => handleAllCheckboxes(e.target.checked)}
              />
            </TableHead>
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
