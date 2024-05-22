"use client";

import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

const ButtonSignOut = () => {
  const handleClick = () => {
    signOut();
  };
  return (
    <Button
      className="bg-transparent text-emerald-950 hover:bg-transparent"
      onClick={handleClick}
    >
      <LogOut />
    </Button>
  );
};

export default ButtonSignOut;
