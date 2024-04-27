import React from "react";
import { getUser } from "@/app/actions/admin/getUser";

const UserPage = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const user = await getUser(params.id);

  return (
    <div className="flex items-center justify-center w-full">
      <div className="py-12 grid grid-cols-2 gap-7">
        <div className="col-span-2 text-center">
          <p className="text-3xl font-semibold">
            Usuario: {user.name} {user.lastname}
          </p>
        </div>
        <div>
          <p className="text-xl font-semibold">Nombre</p>
          <p>{user.name}</p>
        </div>
        <div>
          <p className="text-xl font-semibold">Apellido</p>
          <p>{user.lastname}</p>
        </div>
        <div>
          <p className="text-xl font-semibold">Correo</p>
          <p>{user.email}</p>
        </div>
        <div>
          <p className="text-xl font-semibold">Rol</p>
          <p>{user.role}</p>
        </div>
        <div>
          <p className="text-xl font-semibold">Género</p>
          <p>{user.gender}</p>
        </div>
        <div>
          <p className="text-xl font-semibold">Carrera</p>
          <p>{user.career}</p>
        </div>
        <div>
          <p className="text-xl font-semibold">Facultad</p>
          <p>{user.faculty}</p>
        </div>
        <div>
          <p className="text-xl font-semibold">Código</p>
          <p>{user.code}</p>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
