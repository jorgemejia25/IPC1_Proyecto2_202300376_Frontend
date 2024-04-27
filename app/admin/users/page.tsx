"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";

import { Button } from "@nextui-org/button";
import FileInput from "@/components/file-upload";
import Link from "next/link";
import Papa from "papaparse";
import { Spinner } from "@nextui-org/spinner";
import { User } from "@/utils/interfaces/user";
import { deleteUser } from "@/app/actions/admin/deleteUser";
import { getUsers } from "@/app/actions/admin/getUsers";
import { loadUsersFromJson } from "@/app/actions/admin/loadUsersFromJson";
import { useFormState } from "react-dom";

const columns = [
  {
    key: "code",
    label: "Código",
  },
  {
    key: "name",
    label: "Nombre",
  },
  {
    key: "lastname",
    label: "Apellido",
  },
  {
    key: "email",
    label: "Correo",
  },
  {
    key: "career",
    label: "Carrera",
  },
  {
    key: "faculty",
    label: "Facultad",
  },
  {
    key: "role",
    label: "Rol",
  },
  {
    key: "gender",
    label: "Género",
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

const UsersPage = () => {
  const [users, setUsers] = useState<User[] | null>(null);

  const [formState, formAction] = useFormState(loadUsersFromJson, initialState);

  const deleteUserClick = async (code: string) => {
    const response = await deleteUser(code);

    if (response) {
      const newUsers = await getUsers();

      setUsers(newUsers);
    }
  };

  const exportUsers = async () => {
    const users = await getUsers();

    const csv = Papa.unparse(users);

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "users.csv";
    a.click();
  };

  useEffect(() => {
    (async () => {
      const response = await getUsers();

      setUsers(response);
    })();
  }, []);

  useEffect(() => {
    if (formState.success) {
      (async () => {
        const response = await getUsers();

        setUsers(response);
      })();
    }
  }, [formState]);

  const renderCell = React.useCallback((user: any, columnKey: any) => {
    const cellValue = user[columnKey];

    if (columnKey === "acciones") {
      return (
        <div className="flex gap-2">
          <Link href={`/admin/users/${user._id}`}>
            <Button color="default" size="sm" variant="flat">
              Ver
            </Button>
          </Link>
          <Button
            color="danger"
            size="sm"
            variant="flat"
            onClick={() => deleteUserClick(user._id)}
          >
            Eliminar
          </Button>
        </div>
      );
    }

    return <span>{cellValue}</span>;
  }, []);

  return (
    <section>
      <h2 className="pt-9 text-4xl text-slate-500 font-semibold">Usuarios</h2>
      <h4 className="pt-4 pb-9 text-xl text-slate-400 font-medium">
        Carma masiva y visualización de usuarios
      </h4>

      {formState.success && (
        <div className="w-full  text-green-400">{formState.message}</div>
      )}

      {!formState.success && formState.message && (
        <div className="w-full  text-red-400">{formState.message}</div>
      )}

      <form className="my-5" action={formAction}>
        <FileInput
          id="file"
          name="file"
          buttonText="Cargar archivo JSON"
          fileTypes=".json"
          color="default"
          onFileChange={() => {}}
        />

        <Button
          color="primary"
          className="w-full mt-4"
          variant="flat"
          size="lg"
          type="submit"
        >
          Guardar archivo cargado
        </Button>
      </form>

      <div className="py-6">
        <Button color="success" size="sm" variant="flat" onClick={exportUsers}>
          Exportar usuarios
        </Button>
      </div>

      {users ? (
        <Table aria-label="Usuarios">
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.key}>{column.label}</TableColumn>
            )}
          </TableHeader>
          <TableBody items={users}>
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

export default UsersPage;
