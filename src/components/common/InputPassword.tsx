import { Input, InputProps } from "@mui/joy";
import { RiEyeLine, RiEyeOffLine } from "@remixicon/react";
import { forwardRef, memo, useState } from "react";

export const InputPassword = memo(
  forwardRef<HTMLInputElement, InputProps>(({ ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <Input
        ref={ref}
        type={showPassword ? "text" : "password"}
        size="lg"
        endDecorator={
          showPassword ? (
            <RiEyeLine onClick={() => setShowPassword(!showPassword)} />
          ) : (
            <RiEyeOffLine onClick={() => setShowPassword(!showPassword)} />
          )
        }
        {...props}
      />
    );
  })
);
