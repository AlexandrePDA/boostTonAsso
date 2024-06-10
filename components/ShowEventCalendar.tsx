import { Pencil, Trash2, Settings, AlarmClock, Calendar } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ModifyEventCalendarSchema } from "@/lib/formSchema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";

const months = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre",
];

const ShowEventCalendar = ({ propsCalendar }: any) => {
  const queryClient = useQueryClient();
  const [modificationEvent, setModificationEvent] = useState<boolean>(false);

  const formaterDate = (dateAFormater: any) => {
    const date = new Date(dateAFormater);
    const day = String(date.getDate()).padStart(2, "0");
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const formattedDate = `${day} ${month} ${year} à ${hours}:${minutes}`;
    return formattedDate;
  };

  const form = useForm<z.infer<typeof ModifyEventCalendarSchema>>({
    resolver: zodResolver(ModifyEventCalendarSchema),
    defaultValues: {
      title: "",
      start: "",
      end: "",
      id: "",
    },
  });

  const modifyEventCalendarMutation = useMutation(
    async (newEventCalendar: z.infer<typeof ModifyEventCalendarSchema>) => {
      const response = await fetch("/api/modifyEventCalendar", {
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
        setModificationEvent(false);
        queryClient.invalidateQueries("eventCalendar");
        const currentEvents = queryClient.getQueryData("eventCalendar");

        if (currentEvents) {
          queryClient.setQueryData("eventCalendar", []);
        }
        toast.success("Évenement ajouté avec succès ! 🎉");

        form.reset();
      },
      onError: () => {
        toast.error("Erreur, veuillez essayer plus tard.");
      },
    }
  );

  const onSubmit = (values: z.infer<typeof ModifyEventCalendarSchema>) => {
    if (values.title === "" || values.start === "" || values.end === "") {
      toast.error("Erreur, les champs sont vides");
      return;
    }

    const startDate = new Date(propsCalendar.start).toISOString().split("T")[0];
    const startEvent = `${startDate}T${values.start}:00`;
    const endDate = new Date(propsCalendar.end).toISOString().split("T")[0];
    const endEvent = `${endDate}T${values.end}:00`;

    modifyEventCalendarMutation.mutate({
      title: values.title,
      start: startEvent,
      end: endEvent,
      id: (propsCalendar as any).id,
    });
  };

  const handleDeleteEvent = async (id: String) => {
    try {
      const response = await fetch(`/api/deleteEventCalendar`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
      });
      if (response.ok) {
        toast.success("Évenement supprimé avec succès");
        queryClient.invalidateQueries("eventCalendar");
      } else {
        throw new Error("Failed to delete the adherent");
      }
    } catch (error) {
      toast.error("Erreur lors de la suppression de l'évenement ");
    }
  };

  const handleModifEvent = (id: String) => {
    setModificationEvent(true);
  };

  const handleModal = () => {
    setModificationEvent(false);
  };

  return (
    <div className="border rounded-xl p-4 mt-4">
      <div className="flex justify-between">
        {modificationEvent && (
          <div>
            Modifié l'évenement {(propsCalendar as any).title} ?
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
                <div className="flex gap-2 items-center mx-auto mt-4">
                  <Button type="submit">Enregistrer</Button>

                  <Button onClick={handleModal} variant="destructive">
                    Annuler
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        )}
        <div>
          <h3 className="text-xl">{(propsCalendar as any).title}</h3>
          <div className="flex items-center gap-2">
            <AlarmClock size={14} />
            <p>
              De
              {formaterDate((propsCalendar as any).start).split("à")[1]} à
              {formaterDate((propsCalendar as any).end).split("à")[1]}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Calendar size={14} />
            <p>Le {formaterDate((propsCalendar as any).start).split("à")[0]}</p>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost">
              {" "}
              <Settings size={18} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={() => handleModifEvent((propsCalendar as any).id)}
              >
                <div className="flex gap-2 items-center">
                  <Pencil size={14} />
                  <p>Modifier</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => handleDeleteEvent((propsCalendar as any).id)}
              >
                <div className="flex gap-2 items-center">
                  <Trash2 size={14} />
                  <p>Supprimer</p>
                </div>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {/* <p>ID de l'événement: {(propsCalendar as any).id}</p> */}
    </div>
  );
};

export default ShowEventCalendar;
