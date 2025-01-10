import { Textarea, TextareaProps } from "@mui/joy";
import { forwardRef, memo } from "react";

export interface AppTextAreaProps extends TextareaProps {
  rows?: number;
}

export const AppTextArea = memo(
  forwardRef<HTMLDivElement, AppTextAreaProps>(
    ({ minRows, maxRows, rows, ...props }, ref) => {
      return (
        <Textarea
          minRows={minRows ?? rows}
          maxRows={maxRows ?? rows}
          {...props}
          ref={ref}
        />
      );
    }
  )
);
