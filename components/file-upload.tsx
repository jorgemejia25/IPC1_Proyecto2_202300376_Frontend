import React, { useRef, useState } from "react";

import { Button } from "@nextui-org/button";

interface FileInputProps {
  id: string;
  name: string;
  className?: string;
  buttonText?: string;
  fileTypes?: string;
  onFileChange?: (file: File) => void;
  color?:
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "warning"
    | "default";
}

const FileInput: React.FC<FileInputProps> = ({
  id,
  name,
  className,
  buttonText,
  fileTypes,
  color,
  onFileChange,
}) => {
  const fileInput = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files!.length > 0) {
      const file = event.target.files![0];
      setFileName(file.name);
      if (onFileChange) {
        onFileChange(file);
      }
    }
  };

  const handleButtonClick = () => {
    fileInput.current!.click();
  };

  return (
    <div className={className}>
      <input
        ref={fileInput}
        type="file"
        id={id}
        name={name}
        style={{ display: "none" }}
        accept={fileTypes || "*"}
        onChange={handleFileChange}
      />
      <Button
        color={color || "primary"}
        className="w-full mt-4"
        variant="flat"
        size="lg"
        onClick={handleButtonClick}
      >
        {fileName || buttonText || "Seleccionar imágen"}
      </Button>
    </div>
  );
};

export default FileInput;
