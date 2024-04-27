import { IoHeart, IoHeartOutline } from "react-icons/io5";
import React, { useEffect, useState } from "react";

import { Button } from "@nextui-org/button";
import { motion } from "framer-motion";

interface LikeButtonProps {
  onPressed: () => Promise<void>;
  isLiked?: boolean;
}

const LikeButton: React.FC<LikeButtonProps> = ({
  onPressed,
  isLiked = false,
}) => {
  const [likeStatus, setLikeStatus] = useState(isLiked);

  useEffect(() => {
    setLikeStatus(isLiked);
  }, [isLiked]);

  const handleClick = async () => {
    try {
      await onPressed();
      setLikeStatus(!likeStatus);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <motion.div
      whileTap={{ scale: 1.3 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }} // Example transition, you can customize it
    >
      <Button isIconOnly variant="light" onClick={handleClick} size="md">
        {likeStatus ? (
          <IoHeart size={20} className="text-red-400" />
        ) : (
          <IoHeartOutline size={20} />
        )}
      </Button>
    </motion.div>
  );
};

export default LikeButton;
