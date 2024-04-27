import { PostComment } from "@/utils/interfaces/comment";
import React from "react";
import { User } from "@nextui-org/user";

interface CommentElementProps {
  comment: PostComment;
}

const CommentElement: React.FC<CommentElementProps> = ({ comment }) => {
  const date = new Date(comment.createdAt);
  const formattedDate = new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);

  return (
    <div className="p-3">
      <User
        name={`${comment.user.name} ${comment.user.lastname} - ${comment.user.career} (${comment.user.faculty})`}
        description={<span className="text-slate-500">{formattedDate}</span>}
      />

      <div className="my-1">
        <p>{comment.content}</p>
      </div>
    </div>
  );
};

export default CommentElement;
