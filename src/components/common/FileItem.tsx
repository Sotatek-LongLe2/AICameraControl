import { Box, Button, Typography } from "@mui/joy";
import { RiDraggable, RiExternalLinkLine } from "@remixicon/react";
import { memo, useCallback } from "react";
import { colors } from "src/styles/colors";

export type TFileItem = File | { fullPath: string; filePath: string };

interface FileItemProps {
  onRemove?: (file: TFileItem) => void;
  file?: TFileItem;
  draggable?: boolean;
}
export const FileItem = memo(({ onRemove, file, draggable }: FileItemProps) => {
  const handleOpenDocument = useCallback(() => {
    if (!file) return;
    if ("fullPath" in file) {
      window.open(file.fullPath, "_blank");
      return;
    }

    const imageUrl = URL.createObjectURL(file);

    window.open(imageUrl, "_blank");

    URL.revokeObjectURL(imageUrl);
  }, [file]);

  if (!file) return null;

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
      {draggable && (
        <Box height="42px" display="flex" alignItems="center">
          <RiDraggable />
        </Box>
      )}

      <Box
        sx={(theme) => ({
          color: theme.color["primary-main"],
          display: "flex",
          alignItems: "center",
          gap: 4,
        })}
      >
        <Typography
          level="h5"
          sx={(theme) => ({
            color: theme.color["primary-main"],
          })}
        >
          {"name" in file ? file.name : file.filePath}
        </Typography>
        <RiExternalLinkLine
          size={18}
          color={colors["primary-main"]}
          style={{ cursor: "pointer" }}
          onClick={handleOpenDocument}
        />
      </Box>
      <Button
        variant="outlined"
        color="error-main"
        size="md"
        onClick={() => {
          onRemove?.(file);
        }}
      >
        Remove
      </Button>
    </Box>
  );
});
