import React, { useState } from "react";

import { Button } from "@nextui-org/button";
import { IoChatbubbleOutline } from "react-icons/io5";
import { motion } from "framer-motion";

interface CommentButtonProps {
  onPressed: () => void;
}

const CommentButton: React.FC<CommentButtonProps> = ({ onPressed }) => {
  const handleClick = () => {
    onPressed();
  };

  return (
    <motion.div
      whileTap={{ scale: 1.3 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }} // Example transition, you can customize it
    >
      <Button isIconOnly variant="light" onClick={handleClick} size="md">
        <IoChatbubbleOutline size={20} />
      </Button>
    </motion.div>
  );
};

export default CommentButton;
