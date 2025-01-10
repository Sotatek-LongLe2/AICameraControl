import { Box, Typography } from "@mui/joy";
import { IToastCustom } from "./toast";

type ToastCustomProps = Omit<IToastCustom, "icon"> & {
  icon?: React.ReactNode;
};

export const ToastCustom = ({
  description,
  icon: Icon,
  title,
}: ToastCustomProps) => {
  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        {Icon && (
          <Box
            sx={{
              maxWidth: 40,
              maxHeight: 40,
              marginRight: 12,
              borderRadius: "50%",
              display: "flex",
            }}
          >
            {Icon}
          </Box>
        )}

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {title && (
            <Typography
              level="alert-title"
              sx={(theme) => ({ color: theme.color["text-primary"] })}
            >
              {title}
            </Typography>
          )}
          {description && (
            <Typography
              level="caption"
              sx={(theme) => ({ color: theme.color["text-secondary"] })}
            >
              {description}
            </Typography>
          )}
        </Box>
      </Box>
    </>
  );
};
