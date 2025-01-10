import { Box, Divider, Typography } from "@mui/joy";
import { RiMoreLine } from "@remixicon/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { AppLogo } from "src/components/base/AppLogo";
import { PAGES_ADMIN } from "src/constants/router";
import { number2USD } from "src/helpers/formatNumber";
import { colors } from "src/styles/colors";
import TextWithTooltip from "../TextWithTooltip";

type CardPrimaryDemandProps = {
  data: PrimaryDemand[];
};

export type PrimaryDemand = {
  id: number;
  name: string;
  userId: number;
  primaryId: number;
  demand: string;
  firstName: string;
  lastName: string;
  createdAt: string;
  logoUrl: string;
};

export const CardPrimaryDemand = ({ data }: CardPrimaryDemandProps) => {
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
        <Typography level="h5">Primary demands</Typography>
      </Box>
      <Box
        sx={{
          mt: 20,
          height: "252px",
          position: "relative",
        }}
      >
        {data?.map((primaryDemand, index) => (
          <React.Fragment key={index}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                height: 50,
              }}
            >
              <Box
                display={"flex"}
                gap={4}
                alignItems={"center"}
                width={"130px"}
              >
                <AppLogo src={primaryDemand.logoUrl} size={40} />
                <TextWithTooltip
                  text={
                    <Typography level="h5" variant="text-ellipsis">
                      {primaryDemand.name}
                    </Typography>
                  }
                  tooltip={primaryDemand.name}
                />
              </Box>
              <Typography
                level="body1"
                sx={{
                  width: "211px",
                  paddingLeft: 12,
                }}
              >
                {primaryDemand.firstName} {primaryDemand.lastName}
              </Typography>
              <Typography
                level="body1"
                sx={{
                  textAlign: "end",
                  flex: 1,
                }}
              >
                ${number2USD(primaryDemand.demand)}
              </Typography>
            </Box>
            {index < data?.length - 1 && <Divider />}
          </React.Fragment>
        ))}

        {data?.length > 0 && (
          <>
            <Box
              onClick={() => {
                navigate(PAGES_ADMIN.PRIMARY.INDEX);
              }}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                position: "absolute",
                bottom: 18,
                right: 0,
                left: 0,
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
