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

const MainNavbar = async () => {
  return (
    <Navbar disableAnimation isBordered className="absolute">
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
        <NavbarItem></NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <Button as={Link} href="/auth/login" variant="ghost">
            Iniciar Sesión
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} href="/auth/signup" variant="flat">
            Registrarse
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        <NavbarMenuItem>Iniciar Sesión</NavbarMenuItem>
        <NavbarMenuItem>Registrase</NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
};

export default MainNavbar;
