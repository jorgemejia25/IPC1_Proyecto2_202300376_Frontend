import { useEffect, useState } from "react";

import { Entry } from "@/utils/interfaces/entry";
import { LikeEntryResponse } from "@/app/actions/entries/likeEntry";

const useLikes = (
  entry: Entry,
  isEntryLiked: (entry: Entry) => Promise<boolean>,
  likePost: (entryId: string) => Promise<LikeEntryResponse>
) => {
  const [like, setLike] = useState(false);
  const [likes, setLikes] = useState(entry.likes.length);

  useEffect(() => {
    const fetchLike = async () => {
      const isLikedResponse = await isEntryLiked(entry);

      setLike(isLikedResponse);
    };

    fetchLike();
  }, [entry, isEntryLiked]);

  const onLikeClick = async () => {
    const likeResponse = await likePost(entry._id);

    setLikes(likeResponse.state ? likes + 1 : likes - 1);

    if (likeResponse) {
      setLike(!like);
    }
  };

  return { like, likes, onLikeClick };
};

export default useLikes;
