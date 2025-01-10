import { LinkProps, Typography, TypographyProps } from "@mui/joy";

import { Link } from "@mui/joy";
import { RiExternalLinkLine } from "@remixicon/react";
import { forwardRef, memo } from "react";

interface AppLinkProps extends LinkProps {
  textProps?: TypographyProps;
}

export const AppLink = memo(
  forwardRef(
    (
      { children, textProps, ...props }: AppLinkProps,
      ref: React.Ref<HTMLAnchorElement>
    ) => {
      return (
        <Link
          ref={ref}
          {...props}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
            ...props.sx,
          }}
        >
          <Typography level="h5" {...textProps}>
            {children}
          </Typography>
          <RiExternalLinkLine style={{ flexShrink: 0 }} />
        </Link>
      );
    }
  )
);

AppLink.displayName = "AppLink";
