import { RiSearchLine } from "@remixicon/react";
import { AppInput, AppInputProps } from "./AppInput";
import { forwardRef, memo } from "react";

export const AppSearchBox = memo(
  forwardRef<HTMLDivElement, AppInputProps>(({ sx, ...props }, ref) => {
    return (
      <AppInput
        ref={ref}
        startDecorator={<RiSearchLine size={16} />}
        sx={{
          "& .MuiInput-startDecorator": {
            width: "16px",
            margin: "0 10px 0 0 !important",
          },
          ...sx,
        }}
        {...props}
      />
    );
  })
);
