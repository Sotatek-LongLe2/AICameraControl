import { Input } from "@mui/joy";
import { RiCalendarLine } from "@remixicon/react";
import { ForwardedRef, forwardRef, memo } from "react";
import DatePicker, { DatePickerProps } from "react-datepicker";
import { DateFormat } from "src/constants/enum";

export type AppDatePickerProps = DatePickerProps & {
  inputRef?: ForwardedRef<HTMLInputElement>;
};
export const AppDatePicker = memo(
  forwardRef<DatePicker, AppDatePickerProps>(({ inputRef, ...props }, ref) => {
    return (
      <DatePicker
        ref={ref}
        popperPlacement="top"
        dateFormat={DateFormat["dd/MM/yyyy"]}
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
        customInput={
          <Input
            slotProps={{
              input: {
                ref: inputRef,
                autoComplete: "off",
              },
            }}
            endDecorator={<RiCalendarLine size={16} />}
          />
        }
        {...props}
      />
    );
  })
);
