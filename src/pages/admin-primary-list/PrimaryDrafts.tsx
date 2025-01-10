import { Box, Button, Typography } from "@mui/joy";
import { RiArrowRightLine } from "@remixicon/react";
import { generatePath } from "react-router-dom";
import { AppLogo } from "src/components/base/AppLogo";
import TextWithTooltip from "src/components/common/TextWithTooltip";
import { PAGES_ADMIN } from "src/constants/router";
import { IAdminPrimaryItem } from "src/services/AdminPrimaryService.types";
import { colors } from "src/styles/colors";

interface PrimaryDraftsProps {
  data: IAdminPrimaryItem[];
}
export const PrimaryDrafts = ({ data }: PrimaryDraftsProps) => {
  return (
    <Box borderTop={`1px solid ${colors.divider}`}>
      {data.map((draft, index) => (
        <Box
          minHeight="50px"
          key={index}
          padding="5px 12px"
          display="flex"
          alignItems="center"
          gap="8px"
        >
          <AppLogo
            src={draft.logoUrl ?? ""}
            size={40}
            sx={{
              objectPosition: "center",
            }}
          />
          <TextWithTooltip
            text={
              <Typography level="h5" sx={{ color: colors["text-primary"] }}>
                {draft.company}
              </Typography>
            }
            tooltip={draft.company}
          />
          <Typography
            level="body1"
            fontWeight="500"
            sx={{ color: colors["text-primary"] }}
          >
            Draft
          </Typography>
          <Button
            variant="outlined"
            sx={{ border: "none", padding: 0 }}
            endDecorator={<RiArrowRightLine />}
            onClick={() =>
              window.navigate(
                generatePath(PAGES_ADMIN.PRIMARY.EDIT, {
                  id: (draft.id ?? "").toString(),
                })
              )
            }
          >
            <Typography level="h5" variant="text-ellipsis" color="primary-main">
              Continue Editing
            </Typography>
          </Button>
        </Box>
      ))}
    </Box>
  );
};
