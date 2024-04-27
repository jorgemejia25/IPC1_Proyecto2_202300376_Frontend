"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  getKeyValue,
} from "@nextui-org/table";

import { Button } from "@nextui-org/button";
import { Entry } from "@/utils/interfaces/entry";
import FileInput from "@/components/file-upload";
import Link from "next/link";
import Papa from "papaparse";
import { Spinner } from "@nextui-org/spinner";
import { User } from "@nextui-org/user";
import { deleteEntry } from "@/app/actions/admin/deleteEntry";
import { getEntries } from "@/app/actions/entries/getEntries";
import { loadEntriesFromJson } from "@/app/actions/admin/loadEntriesFromJson";
import { useFormState } from "react-dom";

const columns = [
  {
    key: "user",
    label: "Usuario",
  },
  {
    key: "description",
    label: "Descripción",
  },
  {
    key: "category",
    label: "Categoría",
  },
  {
    key: "createdAt",
    label: "Fecha",
  },
  {
    key: "anonymous",
    label: "Anónimo",
  },
  {
    key: "acciones",
    label: "Acciones",
  },
];

const initialState = {
  message: null,
  errors: {},
};

const EntriesPage = () => {
  const [posts, setPosts] = useState<Entry[]>();

  const [formState, formAction] = useFormState(
    loadEntriesFromJson,
    initialState
  );

  const deleteEntryClick = async (entryId: string) => {
    const response = await deleteEntry(entryId);

    if (response) {
      const newPosts = await getEntries();

      setPosts(newPosts);
    }
  };

  useEffect(() => {
    (async () => {
      const response = await getEntries();

      setPosts(response);
    })();
  }, []);

  useEffect(() => {
    if (formState.message) {
      (async () => {
        const response = await getEntries();

        setPosts(response);
      })();
    }
  }, [formState.message]);

  const renderCell = React.useCallback((post: any, columnKey: any) => {
    const cellValue = post[columnKey];

    if (columnKey === "user") {
      return (
        <>
          <User
            name={
              cellValue
                ? cellValue.name + " " + cellValue.lastname
                : "Usuario Eliminado"
            }
          ></User>
        </>
      );
    }

    if (columnKey === "createdAt") {
      return <span>{new Date(cellValue).toLocaleDateString()}</span>;
    }

    if (columnKey === "anonymous") {
      return <span>{cellValue ? "Sí" : "No"}</span>;
    }

    if (columnKey === "acciones") {
      return (
        <div className="flex gap-2">
          <Link href={`/admin/entries/${post._id}`}>
            <Button color="default" size="sm" variant="flat">
              Ver
            </Button>
          </Link>
          <Button
            color="danger"
            size="sm"
            onClick={() => deleteEntryClick(post._id)}
          >
            Eliminar
          </Button>
        </div>
      );
    }

    return <span>{cellValue}</span>;
  }, []);

  const exportEntries = async () => {
    const users = await getEntries();

    const csv = Papa.unparse(users);

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "entries.csv";
    a.click();
  };

  return (
    <section>
      <h2 className="pt-9 text-4xl text-slate-500 font-semibold">Posts</h2>

      <h4 className="pt-4 pb-9 text-xl text-slate-400 font-medium">
        Carma masiva y visualización de posts
      </h4>

      {formState.success && (
        <div className="w-full  text-green-400">{formState.message}</div>
      )}

      {!formState.success && formState.message && (
        <div className="w-full  text-red-400">{formState.message}</div>
      )}

      <form className="my-5" action={formAction}>
        <FileInput
          buttonText="Cargar posts"
          name="file"
          fileTypes=".json"
          id="file"
          color="default"
          onFileChange={() => {}}
        />
        <Button
          color="primary"
          className="w-full my-4"
          variant="flat"
          size="lg"
          type="submit"
        >
          Guardar archivo cargado
        </Button>
      </form>

      <div className="py-6">
        <Button
          color="success"
          size="sm"
          variant="flat"
          onClick={exportEntries}
        >
          Exportar posts
        </Button>
      </div>

      {posts ? (
        <Table>
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.key}>{column.label}</TableColumn>
            )}
          </TableHeader>
          <TableBody items={posts}>
            {(item) => (
              <TableRow key={item._id}>
                {(columnKey) => (
                  <TableCell>{renderCell(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      ) : (
        <div className="flex w-full items-center justify-center">
          <Spinner />
        </div>
      )}
    </section>
  );
};

export default EntriesPage;
