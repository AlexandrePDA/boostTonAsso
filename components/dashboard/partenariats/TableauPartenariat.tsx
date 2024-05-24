"use client";
import { fetchPartenariats } from "@/lib/fetchQuery";
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
import { useState } from "react";
import { Trash2, Search, BadgeCheck, BadgeX } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import DataEmpty from "@/components/DataEmpty";

interface Partenariat {
  id: string;
  namePartenariat: string;
  secteur: string;
  contact: string;
  commentaire: string;
  createdAt: Date;
}

export const TableauPartenariat = () => {
  const queryClient = useQueryClient();

  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading, error } = useQuery(
    "partenariats",
    fetchPartenariats
  );

  if (isLoading) return <div>Chargement...</div>;
  if (error) return <div>Error</div>;

  const filteredData = data.filter((partenaire: Partenariat) => {
    return (
      partenaire.namePartenariat
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      partenaire.secteur.toLowerCase().includes(searchTerm.toLowerCase()) ||
      partenaire.contact.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  if (data.length === 0) return <DataEmpty context="partenariat" />;

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/deletePartenaire`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
      });
      if (response.ok) {
        toast.success("Partenaire supprimé avec succès");
        queryClient.invalidateQueries("partenariats");
      } else {
        throw new Error("Failed to delete the partenaire");
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
            {filteredData.length}{" "}
            {filteredData.length === 1 ? "partenaire" : "partenaires"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Search />
          <Input
            type="text"
            placeholder="Chercher par nom, contact ou secteur..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className=" p-2 border rounded w-[400px] "
          />
        </div>
      </div>

      <Table>
        <TableHeader className="bg-gray-100 ">
          <TableRow>
            <TableHead>Partenaire</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Secteur</TableHead>
            <TableHead>Commentaire</TableHead>
            <TableHead>Depuis le</TableHead>
            <TableHead className="text-right">Suppression</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData.map((partenariat: Partenariat) => (
            <TableRow key={partenariat.id}>
              <TableCell className="font-medium">
                {partenariat.namePartenariat}
              </TableCell>
              <TableCell>
                {partenariat.contact === "" ? "-" : partenariat.contact}
              </TableCell>
              <TableCell>{partenariat.secteur}</TableCell>
              <TableCell>{partenariat.commentaire}</TableCell>
              <TableCell>
                {new Date(partenariat.createdAt).toLocaleDateString()}
              </TableCell>

              <TableCell className="text-right flex items-center justify-end">
                <Trash2
                  className="hover:text-red-400 text-gray-400 cursor-pointer"
                  onClick={() => handleDelete(partenariat.id)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};
