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
import { AddAdherentSchema } from "@/lib/formSchema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "sonner";
import { z } from "zod";

const AdherentDialog = () => {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm<z.infer<typeof AddAdherentSchema>>({
    resolver: zodResolver(AddAdherentSchema),
    defaultValues: {
      name: "",
      benevole: false,
      telephone: "",
      email: "",
    },
  });

  const addAdherentMutation = useMutation(
    async (newAdherent: z.infer<typeof AddAdherentSchema>) => {
      // Explicitly type the parameter
      const response = await fetch("/api/addNewAdherent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAdherent),
      });
      if (!response.ok) throw new Error("Failed to add adherent");
      return response.json();
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("adherents");
        toast.success("Adhérent ajouté avec succès ! 🎉");
        setIsOpen(false);
        form.reset();
      },
      onError: () => {
        toast.error("Erreur, veuillez essayer plus tard.");
      },
    }
  );

  const onSubmit = (values: z.infer<typeof AddAdherentSchema>) => {
    if (values.name === "") {
      toast.error("Erreur");
      return;
    }
    addAdherentMutation.mutate(values);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <UserRoundPlus />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ajouter un nouvel adhérent 🎉</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-4 py-4"
          >
            <FormField
              control={form.control}
              name="benevole"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel className="text-right">Bénévole</FormLabel>
                  <FormControl>
                    <Checkbox
                      className="col-span-3"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel className="text-right">Username</FormLabel>
                  <FormControl>
                    <Input className="col-span-3" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel className="text-right">Email</FormLabel>
                  <FormControl>
                    <Input className="col-span-3" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="telephone"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4 ">
                  <FormLabel className="text-right">Téléphone</FormLabel>
                  <FormControl>
                    <Input className="col-span-3" {...field} />
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

export default AdherentDialog;
