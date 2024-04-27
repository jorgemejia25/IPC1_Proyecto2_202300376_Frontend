"use client";

import React, { useEffect, useState } from "react";

import { Entry } from "@/utils/interfaces/entry";
import EntryView from "@/components/entries/entry-view";
import { Spinner } from "@nextui-org/spinner";
import { getEntry } from "@/app/actions/admin/getEntry";

const EntryPage = ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const [entry, setEntry] = useState<Entry>();

  useEffect(() => {
    (async () => {
      const response = await getEntry(params.id);

      setEntry(response);
    })();
  }, [params.id]);

  return (
    <div>
      {entry ? (
        <EntryView entry={entry} />
      ) : (
        <div className="flex w-full items-center justify-center">
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default EntryPage;
