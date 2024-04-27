"use client";

import React, { useEffect, useState } from "react";
import { Select, SelectItem } from "@nextui-org/select";

import { Button } from "@nextui-org/button";
import { Checkbox } from "@nextui-org/checkbox";
import FileInput from "@/components/file-upload";
import Image from "next/image";
import { Textarea } from "@nextui-org/input";
import { createEntry } from "@/app/actions/entries/createEntry";
import { postCategories } from "@/utils/constants/post-categories";
import { redirect } from "next/navigation";
import { useFormState } from "react-dom";

const initialState = {
  message: null,
  errors: {},
};

const CreatePostPage = () => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const onFileChange = (file: File) => {
    const url = URL.createObjectURL(file);

    setPreviewUrl(url);
  };

  const [formState, formAction] = useFormState(createEntry, initialState);

  useEffect(() => {
    if (formState.success) {
      // redirect with query param to show a success message
      redirect("/dashboard/entries?success=true");
    }
  }, [formState]);

  return (
    <section className="px-2 py-9">
      <h2 className="font-bold text-3xl">Crea un nuevo post.</h2>
      <p className="text-xl text-slate-500 my-2">
        Comparte algo con la universidad.
      </p>

      <form className="mt-12 grid gap-8 grid-cols-2" action={formAction}>
        <div className="col-span-2 mt-2">
          <label
            htmlFor="description"
            className="text-md text-slate-500 font-semibold my-2"
          >
            Descripción
          </label>
          <Textarea
            id="description"
            name="description"
            aria-label="description"
            variant="bordered"
            placeholder="Ingresa la descripción del post."
            className="w-full mt-4"
            isInvalid={!!formState.errors.description}
            errorMessage={formState.errors.description}
          />
        </div>
        <div className="mt-2">
          <label
            htmlFor="category"
            className="text-md text-slate-500 font-semibold my-2"
          >
            Categoría
          </label>

          <Select
            id="category"
            name="category"
            className="mt-2"
            variant="bordered"
            aria-label="category"
            placeholder="Selecciona una categoría"
            size="lg"
            isInvalid={!!formState.errors.category}
            errorMessage={formState.errors.category}
          >
            {postCategories.map((category) => (
              <SelectItem key={category.value} value={category.value}>
                {category.label}
              </SelectItem>
            ))}
          </Select>
        </div>
        <div className="mt-2 justify-center">
          <label
            className="text-md text-slate-500 font-semibold my-2"
            htmlFor="anonymous"
          >
            Opciones
          </label>

          <div className="mt-4">
            <Checkbox name="anonymous" id="anonymous">
              Publicar de manera anónima
            </Checkbox>
          </div>
        </div>
        <div className="mt-2 col-span-2">
          <label
            className="text-md text-slate-500 font-semibold my-2"
            htmlFor="name"
          >
            Imágen (Opcional)
          </label>

          <FileInput
            id="file"
            name="file"
            className="mt-2"
            onFileChange={onFileChange}
          />
        </div>

        <div className="mt-2 col-span-2">
          {previewUrl && (
            <div>
              <label className="text-md text-slate-500 font-semibold my-2">
                Vista previa
              </label>
              <Image
                src={previewUrl}
                width={250}
                height={250}
                objectFit="cover"
                alt="Preview"
                className="mt-2 rounded-md"
              />
            </div>
          )}
        </div>

        <div className="mt-5 col-span-2">
          <Button color="primary" className="w-full" size="lg" type="submit">
            Crear Post
          </Button>
        </div>
      </form>
    </section>
  );
};

export default CreatePostPage;
