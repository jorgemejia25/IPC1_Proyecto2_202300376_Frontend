"use client";

import React, { useEffect, useState } from "react";

import { Entry } from "@/utils/interfaces/entry";
import EntryView from "@/components/entries/entry-view";
import { Spinner } from "@nextui-org/spinner";
import { getTrendingEntries } from "../actions/entries/getTrendingEntries";

const TrendingsPage = () => {
  const [entries, setEntries] = useState<Entry[] | null>(null);

  useEffect(() => {
    (async () => {
      const response = await getTrendingEntries();

      setEntries(response);
    })();
  }, []);

  return entries ? (
    <div>
      <h2 className="mx-5 my-10 font-bold text-4xl ">Tendencias Semanales</h2>

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

export default TrendingsPage;
