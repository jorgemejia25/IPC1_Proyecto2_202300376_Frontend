import React, { useState } from "react";

import { Button } from "@nextui-org/button";
import { Textarea } from "@nextui-org/input";

type CommentBarProps = {
  onButtonClick: (text: string) => Promise<void>;
};

const CommentBar: React.FC<CommentBarProps> = ({ onButtonClick }) => {
  const [commentText, setCommentText] = useState("");

  const handleButtonClick = async () => {
    await onButtonClick(commentText);

    setCommentText("");
  };

  return (
    <div className="flex flex-col">
      <Textarea
        placeholder="Escribe un comentario"
        className="w-full"
        variant="bordered"
        aria-label="comment"
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
      />

      <div className="flex justify-end mt-4">
        <Button color="primary" radius="full" onClick={handleButtonClick}>
          Enviar
        </Button>
      </div>
    </div>
  );
};

export default CommentBar;
