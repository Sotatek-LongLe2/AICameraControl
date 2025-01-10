import { Box, Chip, Divider, Typography } from "@mui/joy";
import { RiMoreLine } from "@remixicon/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { SecondarySideEnum } from "src/constants/enumBE";
import { PAGES_ADMIN } from "src/constants/router";
import { colors } from "src/styles/colors";

type CardIOIInteractionProps = {
  data: IOIInteraction[];
};

export type IOIInteraction = {
  id: number;
  side: number;
  firstName: string;
  lastName: string;
  companyName: string;
  total: string;
};

export const CardIOIInteraction = ({ data }: CardIOIInteractionProps) => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        backgroundColor: colors["paper"],
        padding: 20,
        width: "100%",
        height: 320,
        borderRadius: "6px",
      }}
    >
      <Box>
        <Typography level="h5">IOI Interactions</Typography>
      </Box>
      <Box
        sx={{
          mt: 20,
          height: "252px",
          position: "relative",
        }}
      >
        {data?.map((ioiInteraction, index) => (
          <React.Fragment key={index}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                height: 50,
              }}
            >
              <Box display={"flex"} gap={8} alignItems={"center"}>
                <Box width={"55px"}>
                  <Chip
                    color={
                      ioiInteraction.side === SecondarySideEnum.BUY
                        ? "primary"
                        : "danger"
                    }
                  >
                    {ioiInteraction.side === SecondarySideEnum.BUY
                      ? "BUY"
                      : "SELL"}
                  </Chip>
                </Box>
                <Typography level="h5" variant="text-ellipsis" maxWidth={390}>
                  {ioiInteraction.companyName}{" "}
                  {ioiInteraction.firstName || ioiInteraction.lastName
                    ? `- ${ioiInteraction.firstName} ${ioiInteraction.lastName}`
                    : ""}
                </Typography>
              </Box>
              <Typography
                level="body1"
                sx={{
                  textAlign: "end",
                  flex: 1,
                }}
              >
                {ioiInteraction.total || ""}
              </Typography>
            </Box>
            {index < data?.length - 1 && <Divider />}
          </React.Fragment>
        ))}

        {data.length > 0 && (
          <>
            <Box
              onClick={() => {
                navigate(PAGES_ADMIN.SECONDARY.INDEX);
              }}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                position: "absolute",
                right: 0,
                left: 0,
                bottom: 18,
              }}
            >
              <RiMoreLine />
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};
