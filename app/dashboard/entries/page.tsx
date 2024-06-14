"use client";

import React, { useEffect, useState } from "react";

import { Chip } from "@nextui-org/chip";
import { Entry } from "@/utils/interfaces/entry";
import EntryView from "@/components/entries/entry-view";
import { Spinner } from "@nextui-org/spinner";
import { getEntries } from "@/app/actions/entries/getEntries";
import { useSearchParams } from "next/navigation";

const EntriesPage = () => {
  const [entries, setEntries] = useState<Entry[] | null>(null);

  useEffect(() => {
    (async () => {
      const response = await getEntries();

      console.log(response);

      setEntries(response);
    })();
  }, []);

  const searchParams = useSearchParams();
  const success = searchParams.get("success");

  return entries ? (
    <div>
      <h2 className="mx-5 my-10 font-bold text-4xl ">Posts Recientes</h2>

      {success && (
        <Chip color="success" className="mt-10" variant="flat">
          Post creado con exito.
        </Chip>
      )}

      {entries.map((entry) => (
        <EntryView key={entry._id} entry={entry} />
      ))}
    </div>
  ) : (
    <div className="flex w-full h-screen items-center justify-center">
      <Spinner />
    </div>
  );
};

export default EntriesPage;
