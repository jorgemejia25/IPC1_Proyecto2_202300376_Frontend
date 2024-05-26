import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/navbar";
import React, { useEffect, useState } from "react";

import { Button } from "@nextui-org/button";
import Link from "next/link";
import { Role } from "@/utils/enums/role";
import { getProfile } from "@/app/actions/auth/getProfile";

const DashboardNavbar = async () => {
  const response = await getProfile();

  const role: Role | undefined = response.role!;

  return (
    <Navbar disableAnimation isBordered>
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarContent className="sm:hidden p-3" justify="center">
        <h1 className="text-center text-3xl text-slate-600 font-bold my-5">
          <span className="text-primary">interiors</span>islife
        </h1>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4 mr-4" justify="center">
        <NavbarBrand className="mr-4">
          <h1 className="text-center text-3xl text-slate-600 font-bold my-5">
            <span className="text-primary">interiors</span>islife
          </h1>
        </NavbarBrand>
        <NavbarItem>
          <Link href="/dashboard" aria-current="page" color="warning">
            Tendencias
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/dashboard/entries">
            Recientes
          </Link>
        </NavbarItem>
        <NavbarItem></NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="/dashboard/profile">Perfil</Link>
        </NavbarItem>
        {role === Role.Admin && (
          <NavbarItem>
            <Button as={Link} href="/admin" variant="ghost">
              Admin
            </Button>
          </NavbarItem>
        )}
        <NavbarItem>
          <Button as={Link} href="/dashboard/entries/create" variant="flat">
            Crear un Post
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        <NavbarMenuItem>Inicio</NavbarMenuItem>
        <NavbarMenuItem>Tendencias</NavbarMenuItem>
        <NavbarMenuItem>Perfil</NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
};

export default DashboardNavbar;
