"use client";

import {
  HomeIcon,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
  // ShoppingBagIcon,
  TruckIcon,
} from "lucide-react";
import Link from "next/link";

import { authClient } from "@/lib/auth-client";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

const Menu = () => {
  const { data: session } = authClient.useSession();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <div className="px-5">
          {session?.user ? (
            <>
              <div className="flex justify-between space-y-6">
                <div className="flex items-center gap-6">
                  <Avatar>
                    <AvatarImage
                      src={session.user.image as string | undefined}
                    />
                    <AvatarFallback>
                      {session?.user?.name?.split(" ")?.[0]?.[0]}
                      {session?.user?.name?.split(" ")?.[1]?.[0]}
                    </AvatarFallback>
                  </Avatar>

                  <div>
                    <h3 className="font-semibold">{session.user.name}</h3>
                    <span className="text-muted-foreground block text-xs">
                      {session.user.email}
                    </span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => authClient.signOut()}
                >
                  <LogOutIcon />
                </Button>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-between">
              <h2 className="font-semibold">Olá, faça seu login</h2>
              <Button size="icon" asChild variant="outline">
                <Link href="/authentication">
                  <LogInIcon />
                </Link>
              </Button>
            </div>
          )}

          <Separator className="mt-6" />

          <div className="mt-6 flex flex-col gap-3">
            <Link href="/" className="flex gap-3 px-4 py-3">
              <HomeIcon />
              Início
            </Link>
            <Link href="/my-orders" className="flex gap-3 px-4 py-3">
              <TruckIcon />
              Meus Pedidos
            </Link>
            {/* <Link href="/cart" className="flex gap-3 px-4 py-3">
              <ShoppingBagIcon />
              Carrinho
            </Link> */}
          </div>

          <Separator className="mt-6" />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Menu;
