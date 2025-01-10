import { Typography, TypographyProps } from "@mui/joy";

export const MessageError = ({ children, ...props }: TypographyProps) => {
  return (
    <Typography
      color="danger"
      sx={{
        fontSize: 13,
        lineHeight: "13px",
        marginTop: 4,
        // marginLeft: 16,
      }}
      {...props}
    >
      {children}
    </Typography>
  );
};
