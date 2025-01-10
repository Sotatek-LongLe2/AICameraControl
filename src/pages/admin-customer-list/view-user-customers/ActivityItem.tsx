import { Box, Chip, Typography } from "@mui/joy";
import { AppLogo } from "src/components/base/AppLogo";
import TextWithTooltip from "src/components/common/TextWithTooltip";
import { SecondarySideEnum } from "src/constants/enumBE";
import { formatTimeAgo } from "src/helpers/formatTime";
import { IItemTimeline } from "src/services/AdminUsersCustomersService.type";
import { colors } from "src/styles/colors";

type ActivityItemProps = {
  data?: IItemTimeline;
};

const ActivityItem = ({ data }: ActivityItemProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        gap: "13px",
        mt: 7,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "12px",
          width: "18px",
        }}
      >
        <Box
          sx={{
            marginTop: "6px",
            backgroundColor:
              data?.color === "blue"
                ? colors["primary-main"]
                : data?.color === "pink"
                ? colors["astra-pink"]
                : data?.color === "orange"
                ? colors["astra-accent-color"]
                : colors["text-primary"],
            width: "12px",
            height: "12px",
            borderRadius: "50%",
          }}
        />
        <Box
          sx={{
            width: "2px",
            height: "78px",
            backgroundColor: colors["divider"],
          }}
        />
      </Box>
      <Box sx={{ flex: 1 }} maxWidth={"calc(100% - 25px)"}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography level="body1-500" color="text-primary">
            {data?.title}
          </Typography>
          <Typography
            level="caption"
            sx={{
              color: colors["text-disabled"],
            }}
          >
            {data?.createdAt ? formatTimeAgo(data?.createdAt) : ""}
          </Typography>
        </Box>
        <Box mt={7}>
          <Typography level="body1" color="text-secondary">
            {data?.text}
          </Typography>
          {data?.source === 0 && data?.action !== "ACCESS_PRIMARY_LIST" && (
            <Box
              sx={{ display: "flex", alignItems: "center", gap: "12px", mt: 8 }}
            >
              <AppLogo src={data?.companyLogo} size={38} />
              <Typography level="h5" color="text-primary">
                {data?.companyName}
              </Typography>
            </Box>
          )}
          {data?.source === 1 && data?.action !== "FILTER_SECONDARY_LIST" && (
            <Box
              sx={{ display: "flex", alignItems: "center", gap: "8px", mt: 10 }}
              maxWidth={"100%"}
            >
              {data?.side !== undefined && (
                <Chip
                  variant="soft"
                  color="primary"
                  sx={(theme) => ({
                    background:
                      data?.side === SecondarySideEnum.BUY
                        ? theme.color["primary-main"]
                        : theme.color["astra-pink"],
                    textTransform: "uppercase",
                  })}
                >
                  {data?.side === SecondarySideEnum.BUY ? "BUY" : "SELL"}
                </Chip>
              )}

              <TextWithTooltip
                text={
                  <Typography level="h5" color="text-primary">
                    {data?.companyName}{" "}
                    {data?.customerName && `- ${data?.customerName}`}
                  </Typography>
                }
                tooltip={`${data?.companyName}${" "} ${
                  data?.customerName && `- ${data?.customerName}`
                }`}
              />
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ActivityItem;
