"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { UserRoundPlus } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AddPartenaireSchema } from "@/lib/formSchema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "sonner";
import { z } from "zod";

const PartenariatDialog = () => {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm<z.infer<typeof AddPartenaireSchema>>({
    resolver: zodResolver(AddPartenaireSchema),
    defaultValues: {
      name: "",
      secteur: "",
      contact: "",
      commentaire: "",
    },
  });

  const addPartenaireMutation = useMutation(
    async (addNewPartenaire: z.infer<typeof AddPartenaireSchema>) => {
      const response = await fetch("/api/addNewPartenaire", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(addNewPartenaire),
      });
      if (!response.ok) throw new Error("Failed to add partenaire");
      return response.json();
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("partenariats");
        toast.success("Partenaire ajouté avec succès ! 🎉");
        setIsOpen(false);
        form.reset();
      },
      onError: () => {
        toast.error("Erreur, veuillez essayer plus tard.");
      },
    }
  );

  const onSubmit = (values: z.infer<typeof AddPartenaireSchema>) => {
    if (values.name === "") {
      toast.error("Erreur");
      return;
    }
    addPartenaireMutation.mutate(values);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <UserRoundPlus />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ajouter un nouveau partenaire 🎉</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-4 py-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel className="text-right">Nom</FormLabel>
                  <FormControl>
                    <Input className="col-span-3" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contact"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel className="text-right">Contact</FormLabel>
                  <FormControl>
                    <Input className="col-span-3" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="secteur"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4 ">
                  <FormLabel className="text-right">Secteur</FormLabel>
                  <FormControl>
                    <Input className="col-span-3" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="commentaire"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel className="text-right">Commentaire</FormLabel>
                  <FormControl>
                    <Textarea className="col-span-3" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Enregistrer</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default PartenariatDialog;
