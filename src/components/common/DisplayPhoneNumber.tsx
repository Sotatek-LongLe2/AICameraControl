import { TypographyProps, Box, Typography } from "@mui/joy";
import { useState, useRef, useEffect, memo } from "react";
import ReactPhoneInput from "react-phone-input-2";

interface DisplayPhoneNumberProps extends Omit<TypographyProps, "children"> {
  value?: string;
}

export const DisplayPhoneNumber = memo(
  ({ value, ...props }: DisplayPhoneNumberProps) => {
    const [formatValue, setFormatValue] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      setTimeout(() => {
        setFormatValue(inputRef.current?.value ?? "");
      });
    }, [value]);

    return (
      <Box>
        <Typography level="input-text" {...props}>
          {formatValue}
        </Typography>
        <ReactPhoneInput
          inputProps={{
            ref: inputRef,
          }}
          value={value}
          containerStyle={{
            display: "none",
          }}
        />
      </Box>
    );
  }
);
