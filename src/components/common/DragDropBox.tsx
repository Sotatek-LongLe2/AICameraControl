import { Box, BoxProps, Typography } from "@mui/joy";
import {
  InputHTMLAttributes,
  PropsWithChildren,
  useCallback,
  useRef,
  useState,
} from "react";
import { combineSx } from "src/shared/utils";
import { colors } from "src/styles/colors";

interface DragDropBoxProps extends BoxProps {
  onFileUpload: (files: File[]) => void;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
  disabled?: boolean;
  imageUrl?: string;
  accept?: string[];
}

export const DragDropBox: React.FC<PropsWithChildren<DragDropBoxProps>> = ({
  onFileUpload,
  children,
  inputProps,
  disabled,
  imageUrl,
  accept = [".pdf", "image/*"],
  ...props
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const files = Array.from(e.dataTransfer.files);
      const validFile = files.some(
        (file) =>
          file.type !== "application/pdf" || !file.type.startsWith("image/")
      );

      if (validFile) {
        onFileUpload(files);
      } else {
        alert("Please upload a PDF or image file.");
      }
    },
    [onFileUpload]
  );

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files as FileList);
    const validFile = files.some(
      (file) =>
        file.type !== "application/pdf" || !file.type.startsWith("image/")
    );
    if (validFile) {
      onFileUpload(files);
    } else {
      alert("Please upload a PDF or image file.");
    }

    inputProps?.onChange?.(e);

    e.target.value = ""; // clear input when upload file executed
  };

  return (
    <Box
      sx={combineSx(
        {
          border: "none",
          background: `linear-gradient(90deg, ${
            isDragging ? colors["primary-main"] : "#FFFFFF"
          } 50%, transparent 50%) repeat-x,
                       linear-gradient(90deg, ${
                         isDragging ? colors["primary-main"] : "#FFFFFF"
                       } 50%, transparent 50%) repeat-x,
                       linear-gradient(0deg, ${
                         isDragging ? colors["primary-main"] : "#FFFFFF"
                       } 50%, transparent 50%) repeat-y,
                       linear-gradient(0deg, ${
                         isDragging ? colors["primary-main"] : "#FFFFFF"
                       } 50%, transparent 50%) repeat-y`,
          backgroundSize: "15px 1px, 15px 1px, 1px 15px, 1px 15px",
          backgroundPosition: "0 0, 0 100%, 0 0, 100% 0",
          borderRadius: "6px",
          padding: "24px",
          textAlign: "center",
          backgroundColor: isDragging
            ? "rgba(0, 170, 255, 0.1)"
            : "transparent",
          transition: "all 0.3s ease",
          cursor: disabled ? "inherit" : "pointer",
          opacity: disabled ? 0.7 : 1,
          ...(imageUrl && {
            backgroundImage: `url('${imageUrl}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }),
        },
        props.sx
      )}
      {...(!disabled && {
        onClick: handleClick,
        onDragEnter: handleDragEnter,
        onDragLeave: handleDragLeave,
        onDragOver: handleDragOver,
        onDrop: handleDrop,
      })}
    >
      <input
        type="file"
        multiple
        accept={accept.join(",")}
        {...inputProps}
        ref={fileInputRef}
        onChange={handleFileInputChange}
        style={{ display: "none", ...inputProps?.style }}
        disabled={disabled}
      />
      {isDragging ? (
        <Typography level="body1" sx={{ pointerEvents: "none" }}>
          Drop your file here
        </Typography>
      ) : (
        <>{children}</>
      )}
    </Box>
  );
};
