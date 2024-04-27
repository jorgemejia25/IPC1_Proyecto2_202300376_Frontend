import { useEffect, useState } from "react";

import { Entry } from "@/utils/interfaces/entry";

const useComments = (post: Entry) => {
  const [comments, setComments] = useState(post.postComments.length);

  const newComments = () => {
    setComments(comments + 1);
  };

  useEffect(() => {
    setComments(post.postComments.length);
  }, [post]);

  return { comments, newComments };
};

export default useComments;
