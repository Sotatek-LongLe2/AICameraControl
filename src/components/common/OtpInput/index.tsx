import { styled } from "@mui/joy";
import React, { forwardRef, memo, useEffect, useRef } from "react";
import PinField from "react-pin-field";
import { colors } from "src/styles/colors";

interface OtpInputProps {
  length: number;
  onOtpChange: (value: string) => void;
  onComplete: (value: string) => void;
}

const Container = styled("div")(({ theme }) => ({
  display: "flex",
  gap: "16px",
  [theme.breakpoints.down("laptop")]: {
    gap: "12px",
  },
}));

const StyledInput = styled(PinField)(() => ({
  width: "47.33px",
  height: "48px",
  borderRadius: "6px",
  backgroundColor: "transparent",
  caretColor: colors["primary-main"],
  fontSize: "15px",
  lineHeight: "24px",
  textAlign: "center",
  outline: "red",
  color: colors["text-primary"],
  fontWeight: 400,
  border: `1px solid ${colors["input-border"]}`,
  "&:focus": {
    border: `1px solid grey`,
  },
}));

const OtpInput = memo(
  forwardRef<HTMLInputElement[] | null, OtpInputProps>(
    ({ length, onOtpChange, onComplete }, ref): React.ReactElement => {
      const inputRef = useRef<HTMLInputElement[]>([]);
      const handleFocus = (index: number): void => {
        inputRef.current.forEach((input) => {
          input.style.border = "";
        });
        inputRef.current[
          index
        ].style.border = `1px solid ${colors["primary-main"]}`;
      };

      useEffect(() => {
        let otp = "";
        inputRef.current.forEach((input) => {
          otp += input.value;
        });
        if (otp.length === 0) {
          inputRef.current[0].focus();
        }
      }, []);

      return (
        <Container>
          <StyledInput
            ref={(refI) => {
              if (ref && typeof ref === "function") {
                ref(refI);
              }
              inputRef.current = refI ? Array.from(refI) : [];
              inputRef.current.forEach((input, index) => {
                input.addEventListener("focus", () => handleFocus(index));
              });
            }}
            validate="0123456789"
            inputMode="numeric"
            length={length}
            onComplete={onComplete}
            onChange={onOtpChange}
            className="pin-input"
            autoFocus
          />
        </Container>
      );
    }
  )
);

export default OtpInput;
