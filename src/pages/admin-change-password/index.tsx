import { Box, Button, Typography } from "@mui/joy";
import { colors } from "src/styles/colors";
import { FormChangePassword } from "./FormChangePassword";

export const UpdatePasswordPage = () => {
  return (
    <Box
      sx={{
        padding: "20px",
        background: colors.paper,
      }}
    >
      <Typography level="h4" sx={{ marginBottom: "24px" }}>
        Update Password
      </Typography>
      <FormChangePassword>
        <FormChangePassword.ButtonControl>
          <Button
            variant="outlined"
            color="astra-pink"
            onClick={() => window.history.back()}
            sx={{
              flex: 1,
            }}
          >
            Cancel
          </Button>
          <Button
            sx={{
              flex: 1,
            }}
            type="submit"
          >
            Update Password
          </Button>
        </FormChangePassword.ButtonControl>
      </FormChangePassword>
    </Box>
  );
};
