/* eslint-disable react/no-unescaped-entities */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  email: z.string().email({ message: "Email invalide" }),
  password: z.string().min(8, { message: "8 caractères minimums" }),
  asso: z.string().min(1, { message: "1 caractère minimum" }),
});

export default function FormRegister() {
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      asso: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setError(false);
    setLoading(true);
    const { email, password, asso } = values;

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
          name: asso,
        }),
      });

      if (response?.status !== 200) {
        setError(true);
        setLoading(false);
        toast.error("Echec de l'inscription");

        return console.log("Échec de l'authentification");
      }

      // se connecter directement après l'inscription pour utiliser session
      const signinDirectly = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: "/dashboard",
      });

      return (window.location.href = "/dashboard");
    } catch (error) {
      setError(true);
      toast.error("Echec de l'inscription");

      setLoading(false);

      console.error("error", error);
    } finally {
      setLoading(false);
      form.reset();
    }
  }

  return (
    <div className=" max-w-sm mx-auto border p-4 rounded-md mt-40 m-2">
      <h2 className="my-4 font-bold">🔐 Inscription</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="asso"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom de l'association</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="coucou@mail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mot de passe</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="************"
                    {...field}
                  />
                </FormControl>
                <FormDescription>8 caractères minimums</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {error && (
            <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive my-4">
              <ExclamationTriangleIcon className="h-4 w-4" />
              <p>Email déjà utilisé</p>
            </div>
          )}
          <Button disabled={loading} type="submit" className="flex gap-2">
            {loading && <Loader2 className="h-5 w-5 animate-spin" />}
            <p>S'inscrire</p>
          </Button>
        </form>
      </Form>
      <Link
        href="/login"
        className="text-sm text-gray-400 underline mt-8 block text-center"
      >
        Déjà un compte ?
      </Link>
    </div>
  );
}
