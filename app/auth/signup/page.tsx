"use client";

import { Select, SelectItem } from "@nextui-org/select";
import { SignupFormResponse, signUpUser } from "@/app/actions/auth/signup";

import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import Link from "next/link";
import React from "react";
import { genders } from "@/utils/constants/genders";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { useFormState } from "react-dom";

const initialState: SignupFormResponse = {
  message: null,
  errors: {},
};

const SignupPage = () => {
  const [state, formAction] = useFormState(signUpUser, initialState);

  useEffect(() => {
    if (state.success) {
      redirect("/auth/login");
    }
  }, [state.success]);

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="w-full h-screen px-6  md:px-16 lg:px-32 flex flex-col justify-center">
        <h2 className="font-semibold text-center text-4xl mt-24 text-slate-600">
          Crea tu cuenta
        </h2>

        <form action={formAction} className="grid gap-8 grid-cols-2">
          <div className="col-span-2">
            <div className="mt-8">
              <label
                htmlFor="code"
                className="text-md text-slate-500 font-semibold my-2"
              >
                Código
              </label>

              <div className="text-red-202300376400 mt-2">
                {state.errors.code && state.errors.code}
              </div>

              <Input
                id="code"
                name="code"
                className="mt-2"
                variant="bordered"
                type="text"
                aria-label="code"
                placeholder="Ingresa tu código de estudiante"
              />
            </div>
          </div>
          <div className="mt-2">
            <label
              htmlFor="name"
              className="text-md text-slate-500 font-semibold my-2"
            >
              Nombres
            </label>

            <div className="text-red-400 mt-2">
              {state.errors.name && state.errors.name}
            </div>

            <Input
              id="name"
              name="name"
              className="mt-2"
              variant="bordered"
              aria-label="name"
              placeholder="Nombre"
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
              {state.errors.lastname && state.errors.lastname}
            </div>

            <Input
              id="lastname"
              name="lastname"
              className="mt-2"
              aria-label="lastname"
              variant="bordered"
              placeholder="Apellidos"
            />
          </div>
          <div className="mt-2">
            <label
              htmlFor="gender"
              className="text-md text-slate-500 font-semibold my-2"
            >
              Género
            </label>

            <div className="text-red-400 mt-2">
              {state.errors.gender && state.errors.gender}
            </div>

            <Select
              id="gender"
              className="mt-2"
              variant="bordered"
              placeholder="Genero"
              size="lg"
              aria-label="gender"
              name="gender"
            >
              {genders.map((gender) => (
                <SelectItem key={gender.value} value={gender.value}>
                  {gender.label}
                </SelectItem>
              ))}
            </Select>
          </div>
          <div className="mt-2">
            <label
              htmlFor="mail"
              className="text-md text-slate-500 font-semibold my-2"
            >
              Correo
            </label>

            <div className="text-red-400 mt-2">
              {state.errors.email && state.errors.email}
            </div>

            <Input
              id="email"
              className="mt-2"
              variant="bordered"
              placeholder="Correo electrónico"
              type="email"
              name="email"
              aria-label="email"
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
              {state.errors.career && state.errors.career}
            </div>

            <Input
              id="career"
              name="career"
              className="mt-2"
              variant="bordered"
              placeholder="Carrera"
              aria-label="career"
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
              {state.errors.password && state.errors.password}
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
          <div className="mt-2">
            <label
              htmlFor="confirmPassword"
              className="text-md text-slate-500 font-semibold my-2"
            >
              Confirmar Contraseña
            </label>

            <div className="text-red-400 mt-2">
              {state.errors.confirmPassword && state.errors.confirmPassword}
            </div>

            <Input
              id="confirmPassword"
              className="mt-2 "
              variant="bordered"
              placeholder="Contraseña"
              name="confirmPassword"
              type="password"
              aria-label="confirmPassword"
            />
          </div>
          <div className="text-red-500">
            {!state.success && state.message && state.message}
          </div>
          <div className="col-span-2">
            <div className="mt-3">
              <Button
                color="primary"
                type="submit"
                className="w-full"
                size="lg"
              >
                <div className="font-semibold">Ingresar</div>
              </Button>
            </div>
            <div className="mt-8 mb-8 font-medium text-center text-slate-500">
              <p>
                ¿Ya tienes una cuenta?
                <Link href="/auth/login" className="text-primary">
                  {" "}
                  Inicia sesión
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
