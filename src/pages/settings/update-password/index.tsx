import { Box, Button, Typography } from "@mui/joy";
import { FormChangePassword } from "src/pages/admin-change-password/FormChangePassword";
import { useMedia } from "src/shared/hooks/useMedia";

export const UpdatePassword = () => {
  const { isDesktop } = useMedia();
  return (
    <Box>
      <Typography
        level={isDesktop ? "h4" : "h5"}
        sx={{ marginBottom: "24px" }}
        color="text-primary"
      >
        Update Password
      </Typography>
      <FormChangePassword>
        <FormChangePassword.ButtonControl
          sx={{
            justifyContent: "center",
          }}
        >
          <Button type="submit">Update</Button>
        </FormChangePassword.ButtonControl>
      </FormChangePassword>
    </Box>
  );
};
