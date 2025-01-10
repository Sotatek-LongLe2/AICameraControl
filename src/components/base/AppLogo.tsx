import { Box, BoxProps } from "@mui/joy";
import { useEffect, useState } from "react";

type AppLogoProps = {
  size?: number;
} & BoxProps<"img">;

export const AppLogo = ({ size, ...props }: AppLogoProps) => {
  const [hasError, setHasError] = useState(true);

  useEffect(() => {
    if (props.src) {
      setHasError(false);
    }
  }, [props.src]);

  if (hasError) {
    return (
      <Box
        component={"img"}
        src="/image/logo-default.png"
        sx={{
          flexShrink: 0,
          width: size,
          height: size,
          ...props.sx,
        }}
      />
    );
  }

  return (
    <Box
      component={"img"}
      {...props}
      src={props.src ? props.src : "undefined"}
      sx={{
        flexShrink: 0,
        width: size,
        height: size,
        objectFit: "cover",
        ...props.sx,
      }}
      onLoad={() => {
        setHasError(false);
      }}
      onError={() => {
        setHasError(true);
      }}
    />
  );
};
