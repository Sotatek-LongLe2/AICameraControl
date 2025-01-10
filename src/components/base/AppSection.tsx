import { Box, Typography } from "@mui/joy";
import { SxProps } from "@mui/joy/styles/types";
import React, { PropsWithChildren } from "react";
import { combineSx } from "src/shared/utils";

interface IProps {
  title: string;
  sectionStyle?: SxProps;
  titleStyle?: SxProps;
}

const AppSection: React.FC<PropsWithChildren<IProps>> = ({
  title,
  sectionStyle,
  titleStyle,
  children,
}) => {
  return (
    <Box sx={combineSx({ mb: 16, ...sectionStyle })}>
      <Typography level="h5" sx={combineSx({ mb: 16, ...titleStyle })}>
        {title}
      </Typography>
      {children}
    </Box>
  );
};

export default AppSection;
