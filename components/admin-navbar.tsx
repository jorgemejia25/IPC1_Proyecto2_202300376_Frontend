import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/navbar";

import { Button } from "@nextui-org/button";
import Link from "next/link";
import React from "react";
import { Role } from "@/utils/enums/role";
import { getProfile } from "@/app/actions/auth/getProfile";

const AdminNavbar = async () => {
  const response = await getProfile();

  const role: Role | undefined = response.role!;

  return (
    <Navbar disableAnimation isBordered>
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarContent className="sm:hidden p-3" justify="center">
        <h1 className="text-center text-3xl text-slate-600 font-bold my-5">
          <span className="text-primary">U</span>Social{" "}
          <span className="text-lg text-slate-400">Admin</span>
        </h1>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4 mr-4" justify="center">
        <NavbarBrand className="mr-4">
          <h1 className="text-center text-3xl text-slate-600 font-bold my-5">
            <span className="text-primary">interiors</span>islife{" "}
            <span className="text-lg text-slate-400">Admin</span>
          </h1>
        </NavbarBrand>
        <NavbarItem>
          <Link href="/admin/entries" aria-current="page" color="warning">
            Posts
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/admin/users">
            Usuarios
          </Link>
        </NavbarItem>
        <NavbarItem></NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <Button as={Link} href="/admin" variant="flat">
            Generar reportes
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

export default AdminNavbar;
