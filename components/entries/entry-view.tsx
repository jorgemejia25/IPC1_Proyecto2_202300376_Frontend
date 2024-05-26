import React, { useEffect, useState } from "react";

import CommentButton from "./comment-button";
import CommentView from "./comment-view";
import { Entry } from "@/utils/interfaces/entry";
import Image from "next/image";
import LikeButton from "./like-button";
import { User } from "@nextui-org/user";
import { isEntryLikes } from "@/app/actions/entries/isEntryLiked";
import { likeEntry } from "@/app/actions/entries/likeEntry";
import useComments from "@/hooks/useComments";
import useLikes from "@/hooks/useLikes";

interface EntryProps {
  entry: Entry;
  hideButtons?: boolean;
}

const EntryView: React.FC<EntryProps> = ({
  entry,
  hideButtons: showButtons,
}) => {
  const date = new Date(entry.createdAt);

  const formattedDate = new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);

  const { like, likes, onLikeClick } = useLikes(entry, isEntryLikes, likeEntry);

  const { comments, newComments } = useComments(entry);

  const [commentView, setCommentView] = useState(false);

  return (
    <article className="flex p-5 flex-col ">
      <div>
        <User
          name={
            entry.user && !entry.anonymous
              ? `${entry.user.name} ${entry.user.lastname} - ${entry.user.career} (${entry.user.faculty})`
              : "Estudiante anónimo"
          }
          description={formattedDate}
        />
      </div>
      <div className="my-1">
        <p>{entry.description}</p>
      </div>

      {entry.image && (
        <div className="my-4 rounded-lg">
          <Image
            src={entry.image}
            alt="Post image"
            className="rounded-lg min-w-full"
            width={400}
            height={400}
          />
        </div>
      )}

      <div className="flex gap-3">
        <div>
          <p className="font-medium">
            <span className="font-bold">{likes}</span> Likes
          </p>
        </div>
        <div>
          <p className="font-medium">
            <span className="font-bold">{comments}</span> Comments
          </p>
        </div>
        <div className="px-4">
          <div className="text-slate-400">Categoría: {entry.category}</div>
        </div>
      </div>
      <div className="flex gap-3 my-2">
        <LikeButton onPressed={onLikeClick} isLiked={like} />
        <CommentButton
          onPressed={() => {
            setCommentView(!commentView);
          }}
        />
      </div>
      {commentView && <CommentView postId={entry._id} />}
    </article>
  );
};

export default EntryView;
