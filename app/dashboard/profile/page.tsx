"use client";

import React, { useEffect, useState } from "react";
import {
  UpdateProfileResponse,
  updateProfile,
} from "@/app/actions/auth/updateProfile";

import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Spinner } from "@nextui-org/spinner";
import { User } from "@/utils/interfaces/user";
import { getProfile } from "@/app/actions/auth/getProfile";
import { logout } from "@/app/actions/auth/logout";
import { useFormState } from "react-dom";

const initialState: UpdateProfileResponse = {
  message: null,
  errors: {},
};

const ViewProfile = () => {
  const [user, setUser] = useState<User>();

  const [formState, formAction] = useFormState(updateProfile, initialState);

  useEffect(() => {
    (async () => {
      const userResponse = await getProfile();

      setUser(userResponse);
    })();
  }, []);

  const logoutClick = () => {
    logout();

    window.location.href = "/auth/login";
  };

  return (
    <>
      {user ? (
        <section className="px-2 py-9">
          <h2 className="font-bold text-3xl">Bienvenido, {user.name}</h2>
          <p className="text-xl text-slate-500 my-2">Actualiza tu perfil.</p>
          <form action={formAction} className="mt-12 grid gap-8 grid-cols-2">
            <div className="mt-2">
              <label
                htmlFor="name"
                className="text-md text-slate-500 font-semibold my-2"
              >
                Nombres
              </label>
              <div className="text-red-400 mt-2">
                {formState.errors.name && formState.errors.name}
              </div>
              <Input
                id="name"
                name="name"
                className="mt-2"
                variant="bordered"
                aria-label="name"
                placeholder="Nombre"
                value={user.name || ""}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
              />
            </div>
            <div className="mt-2">
              <label
                htmlFor="lastname"
                className="text-md text-slate-500 font-semibold my-2"
              >
                Apellidos
              </label>
              <div className="text-red-400 mt-2">
                {formState.errors.lastname && formState.errors.lastname}
              </div>
              <Input
                id="lastname"
                name="lastname"
                className="mt-2"
                aria-label="lastname"
                variant="bordered"
                placeholder="Apellidos"
                value={user.lastname || ""}
                onChange={(e) => setUser({ ...user, lastname: e.target.value })}
              />
            </div>
            <div className="mt-2">
              <label
                htmlFor="mail"
                className="text-md text-slate-500 font-semibold my-2"
              >
                Correo
              </label>
              <div className="text-red-400 mt-2">
                {formState.errors.email && formState.errors.email}
              </div>
              <Input
                id="email"
                className="mt-2"
                variant="bordered"
                placeholder="Correo electrónico"
                type="email"
                name="email"
                aria-label="email"
                value={user.email || ""}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            </div>
            <div className="mt-2">
              <label
                htmlFor="faculty"
                className="text-md text-slate-500 font-semibold my-2"
              >
                Facultad
              </label>
              <Input
                id="faculty"
                name="faculty"
                className="mt-2"
                variant="bordered"
                placeholder="Facultad"
                aria-label="faculty"
                value={user.faculty || ""}
                onChange={(e) => setUser({ ...user, faculty: e.target.value })}
              />
            </div>
            <div className="mt-2">
              <label
                htmlFor="career"
                className="text-md text-slate-500 font-semibold my-2"
              >
                Carrera
              </label>
              <div className="text-red-400 mt-2">
                {formState.errors.career && formState.errors.career}
              </div>
              <Input
                id="career"
                name="career"
                className="mt-2"
                variant="bordered"
                placeholder="Carrera"
                aria-label="career"
                value={user.career || ""}
                onChange={(e) => setUser({ ...user, career: e.target.value })}
              />
            </div>
            <div className="mt-2">
              <label
                htmlFor="password"
                className="text-md text-slate-500 font-semibold my-2"
              >
                Contraseña
              </label>
              <div className="text-red-400 mt-2">
                {formState.errors.password && formState.errors.password}
              </div>
              <Input
                id="password"
                className="mt-2"
                variant="bordered"
                placeholder="Contraseña"
                name="password"
                type="password"
                aria-label="password"
              />
            </div>

            {formState.success && (
              <div className="text-green-500 font-semibold text-lg">
                Usuario actualizado correctamente.
              </div>
            )}

            <div className="text-red-500 font-semibold text-lg">
              {!formState.success && formState.message && formState.message}
            </div>

            <div className="mt-2 col-span-2">
              <Button color="primary" type="submit" className="w-full">
                Actualizar perfil
              </Button>
            </div>

            <div className="mt-2 col-span-2">
              <Button color="danger" onClick={logoutClick} className="w-full">
                Cerrar sesión
              </Button>
            </div>
          </form>
        </section>
      ) : (
        <div className="flex w-full h-screen items-center justify-center">
          <Spinner />
        </div>
      )}
    </>
  );
};

export default ViewProfile;
