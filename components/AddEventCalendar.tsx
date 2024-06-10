"use client";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AddEventCalendarSchema } from "@/lib/formSchema";
import { Textarea } from "@/components/ui/textarea";
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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet";

interface AddEventCalendarProps {
  open: boolean;
  date: string;
}

const AddEventCalendar = ({ open, date }: AddEventCalendarProps) => {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  console.log(date);

  useEffect(() => {
    if (open !== false && date !== "") {
      setIsOpen(true);
    }
  }, [open, date]);

  const form = useForm<z.infer<typeof AddEventCalendarSchema>>({
    resolver: zodResolver(AddEventCalendarSchema),
    defaultValues: {
      title: "",
      start: "",
      end: "",
    },
  });

  const addEventCalendarMutation = useMutation(
    async (newEventCalendar: z.infer<typeof AddEventCalendarSchema>) => {
      const response = await fetch("/api/addNewEventCalendar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEventCalendar),
      });
      if (!response.ok) throw new Error("Failed to add event");
      return response.json();
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("eventCalendar");
        const currentEvents = queryClient.getQueryData("eventCalendar");

        if (currentEvents) {
          queryClient.setQueryData("eventCalendar", []);
        }
        toast.success("Évenement ajouté avec succès ! 🎉");
        setIsOpen(false);
        form.reset();
      },
      onError: () => {
        toast.error("Erreur, veuillez essayer plus tard.");
      },
    }
  );

  const onSubmit = (values: z.infer<typeof AddEventCalendarSchema>) => {
    if (
      values.title === "" ||
      values.start === "" ||
      values.end === "" ||
      date === ""
    ) {
      toast.error("Erreur, les champs sont vides");
      return;
    }
    const startEvent = `${date}T${values.start}:00`;
    const endEvent = `${date}T${values.end}:00`;

    addEventCalendarMutation.mutate({
      title: values.title,
      start: startEvent,
      end: endEvent,
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Ajouter un évenement 📅</SheetTitle>
        </SheetHeader>
        <SheetDescription>
          <h2>Le {date.split("-").reverse().join("/")}</h2>
        </SheetDescription>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-4 py-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel className="text-right">Titre</FormLabel>
                  <FormControl>
                    <Textarea className="col-span-3" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="start"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel className="text-right">Heure début</FormLabel>
                  <FormControl>
                    <Input type="time" className="col-span-3" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="end"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel className="text-right">Heure fin</FormLabel>
                  <FormControl>
                    <Input type="time" className="col-span-3" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Enregistrer</Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};

export default AddEventCalendar;
