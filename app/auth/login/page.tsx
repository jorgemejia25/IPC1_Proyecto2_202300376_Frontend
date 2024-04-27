"use client";

import { LoginResponse, login } from "@/app/actions/auth/login";
import React, { useEffect } from "react";

import { Button } from "@nextui-org/button";
import Image from "next/image";
import { Input } from "@nextui-org/input";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useFormState } from "react-dom";

const initialState: LoginResponse = {
  message: null,
};

const LoginPage = () => {
  const [state, formAction] = useFormState(login, initialState);

  useEffect(() => {
    if (state.success) {
      redirect("/dashboard");
    }
  });

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <form
        action={formAction}
        className="w-full h-screen md:w-1/2 px-6  md:px-16 lg:px-32 flex flex-col justify-center"
      >
        <h1 className="text-center text-5xl text-slate-600 font-bold my-5">
          <span className="text-primary">U</span>Social
        </h1>
        <p className="text-center text-xl font-medium text-slate-400 mb-12">
          La red social más grande para todos los encapuchados
        </p>
        <h2 className="font-semibold text-4xl text-slate-600">Inicia sesión</h2>
        <p className="text-xl text-slate-500 my-4">
          Ingresa tus datos para continuar
        </p>
        <div className="mt-10">
          <label
            htmlFor="code"
            className="text-md text-slate-500 font-semibold my-2"
          >
            Código
          </label>

          <Input
            id="code"
            name="code"
            aria-label="Codigo"
            className="mt-2"
            variant="bordered"
            type="text"
            placeholder="Ingresa tu código de estudiante"
          />
        </div>
        <div className="mt-7">
          <label
            htmlFor="password"
            className="text-md text-slate-500 font-semibold my-2"
          >
            Contraseña
          </label>

          <Input
            id="password"
            name="password"
            type="password"
            aria-label="Contraseña"
            className="mt-2 "
            variant="bordered"
            placeholder="Contraseña"
          />
        </div>

        {state.message && !state.success && (
          <div className="text-red-500 text-sm mt-5 text-center font-medium ">
            No se pudo iniciar sesión.
          </div>
        )}

        <div className="mt-10">
          <Button color="primary" className="w-full" type="submit" size="lg">
            <div className="font-semibold">Ingresar</div>
          </Button>
        </div>
        <div className="mt-8 mb-8 fohttps://open.spotify.com/track/4wWf2hSQwmVc1lCWHAMTUR?si=34e7ef4b26a04747nt-medium text-center text-slate-500">
          <p>
            ¿No tienes una cuenta?
            <Link href="/auth/signup" className="text-primary">
              {" "}
              Regístrate
            </Link>
          </p>
        </div>
      </form>
      <div className="w-full md:w-1/2 h-full hidden md:flex py-10 md:pr-10 lg:pr-20">
        <div className="w-full h-full relative rounded-3xl overflow-hidden">
          <Image
            src="/login.gif"
            alt="imagen de login"
            layout="fill"
            objectFit="cover"
          />
          <div
            className="bg-primary-400 opacity-50"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              height: "100%",
              width: "100%",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
