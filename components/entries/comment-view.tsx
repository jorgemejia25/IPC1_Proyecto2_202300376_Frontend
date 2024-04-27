import React, { useEffect, useState } from "react";

import CommentBar from "./comment-bar";
import CommentElement from "./comment-element";
import { PostComment } from "@/utils/interfaces/comment";
import { createComment } from "@/app/actions/entries/createComment";
import { getComments } from "@/app/actions/entries/getComments";

interface CommentViewProps {
  postId: string;
}

const CommentView: React.FC<CommentViewProps> = ({ postId }) => {
  const [comments, setComments] = useState<PostComment[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    (async () => {
      const comments = await getComments(postId);

      setComments(comments);
    })();
  }, [postId]); // Empty dependency array

  const handleCommentButtonClick = async (text: string) => {
    // Create comment
    const response = await createComment(postId, text);

    if (response.success) {
      const comments = await getComments(postId);

      setComments(comments);

      setError(false);
    } else {
      setError(true);
    }
  };

  return (
    <section className="p-3">
      <div>
        <p className="text-slate-500 font-semibold">Comentarios</p>
        <div className="py-2">
          {comments.map((comment) => (
            <CommentElement key={comment._id} comment={comment} />
          ))}
        </div>
        {error && (
          <p className="text-red-500 text-sm m-2">
            Ocurrió un error al crear el comentario
          </p>
        )}

        <CommentBar onButtonClick={handleCommentButtonClick} />
      </div>
    </section>
  );
};

export default CommentView;
